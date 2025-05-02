import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ewastelocator";
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecretkey"; // Fallback if missing

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

console.log("MongoDB URI:", MONGODB_URI);
console.log("JWT_SECRET Loaded:", !!JWT_SECRET); // Debugging

export { connectDB, JWT_SECRET };
