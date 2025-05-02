export async function POST(req: Request) {
    const { prompt } = await req.json();
  
    // Get API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: {
            message: "API key not configured. Please set the NEXT_PUBLIC_GEMINI_API_KEY environment variable."
          }
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Try the latest model first
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
  
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        
        // If the service is overloaded, return a friendly message
        if (errorData.error && errorData.error.message && 
            (errorData.error.message.includes("overloaded") || 
             errorData.error.message.includes("quota") ||
             errorData.error.message.includes("rate limit"))) {
          
          return new Response(
            JSON.stringify({
              candidates: [
                {
                  content: {
                    parts: [
                      { 
                        text: "I'm currently experiencing high demand. Please try asking your question again in a few moments, or try a different question about e-waste recycling." 
                      }
                    ]
                  }
                }
              ]
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        }
        
        return new Response(JSON.stringify(errorData), {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: {
            message: "Failed to connect to Gemini API"
          }
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}
  