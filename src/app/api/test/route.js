import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Database connection successful" 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || "Failed to connect to database" 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 