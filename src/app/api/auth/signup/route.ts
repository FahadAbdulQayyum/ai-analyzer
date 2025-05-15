import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '@/utils/models/User';
import { connectToDatabase } from '@/utils/db';

// Handle POST requests
export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const body = await request.json();
    const { username, email, password } = body;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    // const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}