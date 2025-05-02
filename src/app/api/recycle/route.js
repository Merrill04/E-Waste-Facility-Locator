import { connectDB } from "@/lib/db";
import Item from "@/models/Item";

export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse request body
    const body = await request.json();
    
    console.log("Received form data:", body);

    // Create a new item mapping the form field names to database field names
    const newItem = await Item.create({
      facilityName: body.facilityName || "",
      category: body.Category || "",
      modelName: body['Model Name'] || "",
      modelType: body['Model Type'] || "",
      age: body['Age (years)'] ? Number(body['Age (years)']) : null,
      price: body['Price (INR)'] ? Number(body['Price (INR)']) : null,
      currentState: body['Current State'] || "",
      depreciationFactor: body['Depreciation Factor (%)'] ? Number(body['Depreciation Factor (%)']) : null,
      ownershipType: body['Ownership Type'] || "",
      materialComposition: body['Material Composition'] || "",
      environmentalImpactRating: body['Environmental Impact Rating'] ? String(body['Environmental Impact Rating']) : "",
      recyclingProcessComplexity: body['Recycling Process Complexity'] ? String(body['Recycling Process Complexity']) : "",
      imageUrl: body.imageUrl || ""
    });

    return new Response(JSON.stringify({ success: true, data: newItem }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/recycle:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
