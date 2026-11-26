export default async (req, context) => {
  // 1. Get the Key securely
  const apiKey = Netlify.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY is missing in Netlify Environment Variables.");
    return new Response(JSON.stringify({ reply: "System Error: AI Configuration missing. Please check server logs." }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    });
  }

  // 2. Parse Message
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const MAX_TEXT = 1000;
  const MAX_HISTORY = 10;
  const userText = typeof body.text === "string" ? body.text.trim().slice(0, MAX_TEXT) : "";
  if (!userText) {
    return new Response(JSON.stringify({ reply: "Please type a question and I'll do my best to help!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Previous turns, oldest first. Gemini needs the conversation to start with a
  // user turn and alternate roles, so leading bot messages (the greeting) are
  // dropped and consecutive same-role messages are merged.
  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY) : [];
  const contents = [];
  for (const turn of [...history, { role: "user", text: userText }]) {
    const role = turn?.role === "model" ? "model" : "user";
    const text = typeof turn?.text === "string" ? turn.text.slice(0, MAX_TEXT) : "";
    if (!text || (contents.length === 0 && role === "model")) continue;
    const last = contents[contents.length - 1];
    if (last && last.role === role) {
      last.parts[0].text += "\n" + text;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }

  // 3. Define Persona (keep contact details in sync with src/app/core/config/realtor-data.ts)
  const systemPrompt = `
    You are Kritika Katwal, a Top Producer Realtor at Main Street Realty Group in Georgia.

    Tone & Personality:
    - Friendly, professional, empathetic, and knowledgeable.
    - Use "I", "me", and "my".
    - You have a global background (Nepal -> India -> Australia -> Atlanta).

    Contact Info (Provide ONLY if asked):
    - Phone: (470) 652-6362
    - Email: realestatefordreamers@gmail.com

    Guidelines:
    1. Keep responses concise (2-3 sentences max).
    2. Only answer real estate questions.
    3. If the visitor wants to buy, sell, or book a showing, invite them to share their details in the contact form on the website.
  `;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

  const payload = {
    contents,
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  // 4. Retry Logic (Exponential Backoff)
  const maxRetries = 3; // Reduced to 3 to fail faster if it's a hard error
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Success!
      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to answer that.";
        
        return new Response(JSON.stringify({ reply: aiResponse }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      // Handle Errors
      const errText = await response.text();
      console.error(`Attempt ${attempt + 1} Failed. Status: ${response.status}. Google says: ${errText}`);

      // If Rate Limit (429), wait and retry
      if (response.status === 429) {
        attempt++;
        const waitTime = attempt * 2000; // Wait 2s, 4s, 6s
        console.log(`Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue; 
      }

      // If key is invalid (400) or unauthorized (403), DO NOT RETRY. Fail immediately.
      if (response.status === 400 || response.status === 403) {
        return new Response(JSON.stringify({ reply: "I'm having a configuration issue. Please contact support." }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      // Other errors, retry
      attempt++;

    } catch (error) {
      console.error("Network Error:", error);
      attempt++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // 5. Final Failure Response
  return new Response(JSON.stringify({ 
    reply: "I'm currently overwhelmed with requests. Please try again in 1 minute." 
  }), {
    headers: { "Content-Type": "application/json" }
  });
};