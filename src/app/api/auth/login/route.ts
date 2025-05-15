import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '@/utils/models/User';
import { cookies } from "next/headers";
import { connectToDatabase } from '@/utils/db';

// Handle POST requests
export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Set HttpOnly cookie
    cookies().set({
      name: "httpToken",
      value: token, // Store the actual token in the cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day expiration
    });

    // Send token in response
    return NextResponse.json({ token, userId: user._id, userName: user.username }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}









// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';
// import User from '@/utils/models/User';
// import { cookies } from "next/headers";

// // Connect to MongoDB
// export const connectToDatabase = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     return;
//   }
//   await mongoose.connect(process.env.DATABASE_URL as string);
// };

// // Handle POST requests
// export async function POST(request: Request) {
//   try {
//     // Parse the JSON body
//     const body = await request.json();
//     const { email, password } = body;

//     // Validate required fields
//     if (!email || !password) {
//       return NextResponse.json(
//         { message: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     // Connect to MongoDB
//     await connectToDatabase();

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 400 });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

//     // Set HttpOnly cookie
//     cookies().set({
//       name: "httpToken",
//       value: "true",
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: 60 * 60 * 24, // 1 day expiration
//     });

//     // Send token in response
//     return NextResponse.json({ token, userId: user._id, userName: user.username }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
//   }
// }

// // Handle unsupported methods
// export async function GET() {
//   return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
// }