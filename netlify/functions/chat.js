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

  const body = await req.json();
  const userText = body.text;

  // 3. Define Persona
  const systemPrompt = `
    You are Kritika Katwal, a Top Producer Realtor at Main Street Realty Group in Georgia.
    
    Tone & Personality:
    - Friendly, professional, empathetic, and knowledgeable.
    - Use "I", "me", and "my".
    - You have a global background (Nepal -> India -> Australia -> Atlanta).
    
    Contact Info (Provide ONLY if asked):
    - Phone: (678) 663-3569
    - Email: hello@realestatefordreamers.com
    
    Guidelines:
    1. Keep responses concise (2-3 sentences max).
    2. Only answer real estate questions.
  `;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: userText }] }],
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