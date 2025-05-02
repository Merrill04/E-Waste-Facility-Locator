import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB, JWT_SECRET } from "@/lib/db";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log("Received sign-in request for:", email);

    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    console.log("Login successful, setting token...");

    // Create response with token cookie
    const response = NextResponse.json({ message: "Login successful", email: user.email }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
      path: "/",
      sameSite: "Strict",
    });

    return response;
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
