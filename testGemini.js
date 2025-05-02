const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDu2i4zfoCWhUItgS4mK6BBAKaBN1-i8yQ`;

const testPrompt = {
  contents: [
    {
      parts: [{ text: "What is the capital of France?" }],
      role: "user"
    }
  ]
};

async function testGemini() {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPrompt)
    });

    const data = await response.json();

    if (data.candidates) {
      console.log("✅ Gemini Response:", data.candidates[0].content.parts[0].text);
    } else {
      console.error("❌ Error from Gemini:", data);
    }
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
  }
}

testGemini();
