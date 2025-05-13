import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/utils/models/User';
import Analytics from '@/utils/models/Analytic';
import { connectToDatabase } from '@/utils/db';
import { IRevenueData } from '@/components/Dashboard';

// Handle GET requests
export async function POST(request: Request) {
  try {
    // Parse the JSON body
    // const body = await request.json();
    // const { username} = body;

    // // Connect to MongoDB
    // await connectToDatabase();

    // // Find user by email
    // const user = await User.findOne({ username }).select('-password'); // Exclude password from the result
    // if (!user) {
    //   return NextResponse.json({ message: 'User not found' }, { status: 400 });
    // }

    // let analytics = await Analytics.findOne({ user_id: user._id.toString() });

    return NextResponse.json({ data: [{name: "Hey Fahad!"}] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// Handle unsupported methods
export async function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }