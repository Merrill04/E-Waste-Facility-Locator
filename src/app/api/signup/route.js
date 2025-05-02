import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { email, phone, password } = await req.json();

    // Connect to database
    await connectDB();

    // Check if email or phone is already registered
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ email, phone, password: hashedPassword });

    console.log("✅ User created:", newUser.email);

    return NextResponse.json(
      { message: "User created successfully", email: newUser.email },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
