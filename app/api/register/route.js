import connectDB from "@/database/connect";
import User from "@/database/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// adjust these imports to match your setup if needed

// use RELATIVE paths here

export async function POST(request) {
  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone: phone || "",
      password: hashed,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
