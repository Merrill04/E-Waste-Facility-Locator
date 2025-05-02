// src/app/api/news.js
export async function GET(request) {
    const { searchParams } = request;
    const q = searchParams.get('q') || 'waste';
    const API_KEY = "0ea2bdb2e0714ed0a010339f866ae4b0";
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      return new Response(JSON.stringify({ error: 'Error fetching news' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }