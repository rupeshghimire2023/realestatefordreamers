export default async (req, context) => {
  // 1. Get the Key securely
  const apiKey = Netlify.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server Configuration Error: API Key missing" }), { 
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

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: userText }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  // 4. Retry Logic (Exponential Backoff)
  const maxRetries = 3;
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

      // Handle Rate Limit (429) specifically
      if (response.status === 429) {
        console.warn(`Rate limit hit. Retrying attempt ${attempt + 1}...`);
        attempt++;
        // Wait 2s, 4s, 8s...
        const waitTime = Math.pow(2, attempt) * 1000; 
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue; // Retry loop
      }

      // Other Errors (400, 500) -> Don't retry, just fail
      const errText = await response.text();
      return new Response(JSON.stringify({ error: `Gemini API Error: ${errText}` }), { status: response.status });

    } catch (error) {
      console.error("Network Error:", error);
      // Retry on network glitches too
      attempt++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // 5. Final Failure Response
  return new Response(JSON.stringify({ 
    reply: "I'm currently receiving too many messages. Please try again in a minute." 
  }), {
    headers: { "Content-Type": "application/json" }
  });
};