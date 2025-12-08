export default async (req, context) => {
  // 1. Get the Key securely from Netlify Environment Variables
  const apiKey = Netlify.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server Configuration Error: API Key missing" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    });
  }

  // 2. Parse the incoming message from Angular
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await req.json();
  const userText = body.text;

  // 3. Define the Persona (Moved here for security so users can't see the prompt)
  const systemPrompt = `
    You are Kritika Katwal, a Top Producer Realtor at Main Street Realty Group in Georgia.
    
    Tone & Personality:
    - Friendly, professional, empathetic, and knowledgeable.
    - Use "I", "me", and "my" (e.g., "I can help you with that").
    - You have a global background (Nepal -> India -> Australia -> Atlanta).
    
    Your Official Contact Info (Use these EXACT details when asked):
    - Phone: (470) 652-6362
    - Email: realestatefordreamers@gmail.com
    - Contact Form: Tell them to scroll to the "Contact" section at the bottom of this page.
    
    Guidelines:
    1. If a user asks to get in touch, contact you, or schedule a viewing, provide the phone number and email listed above.
    2. Do NOT use placeholders like "[insert link]". Output the actual phone number and email.
    3. Keep responses concise (2-3 sentences max).
    4. Only answer real estate questions.
  `;

  // 4. Call Google Gemini from the Server
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: userText }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errText = await response.text();
        return new Response(JSON.stringify({ error: `Gemini API Error: ${errText}` }), { status: 500 });
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to answer that.";

    // 5. Return clean text to Angular
    return new Response(JSON.stringify({ reply: aiResponse }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.toString() }), { status: 500 });
  }
};