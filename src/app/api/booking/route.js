import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Prediction from '@/models/Prediction';
import { sendBookingConfirmationEmail } from '@/lib/emailService';

// POST handler for creating new bookings
export async function POST(request) {
  console.log('Booking API route called with POST method');
  
  try {
    // Connect to the database
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully');
    
    // Parse the request body
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully:', body);
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    // Validate that all required fields are present
    const requiredFields = [
      'fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode',
      'preferredDate', 'preferredTime', 'itemDetails', 'specificRequirements'
    ];
    
    const missingFields = [];
    for (const field of requiredFields) {
      if (!body[field]) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields', 
          missingFields 
        },
        { status: 400 }
      );
    }
    
    console.log('All required fields present, creating booking record...');
    
    // Extract prediction data from the request body if available
    const predictionData = body.predictionData || null;
    delete body.predictionData; // Remove it from the main body to avoid duplicates
    
    // Create the booking data with predictionData properly formatted for the schema
    const bookingData = {
      ...body,
      predictionData: predictionData ? {
        deviceName: predictionData.deviceName,
        predictedValue: predictionData.predictedValue,
        deviceCategory: predictionData.deviceCategory,
        deviceCondition: predictionData.deviceCondition,
        originalPrice: predictionData.originalPrice,
        predictionConfidence: predictionData.predictionConfidence || 0.85
      } : {}
    };
    
    // Create a new booking record
    const booking = await Booking.create(bookingData);
    console.log('Booking created successfully with ID:', booking._id);
    
    // If we have prediction data, save it to the Predictions collection as well
    if (predictionData) {
      try {
        // Create or update prediction record in the Predictions collection
        await Prediction.findOneAndUpdate(
          { 
            deviceName: predictionData.deviceName,
            userEmail: body.email 
          },
          {
            ...predictionData,
            userEmail: body.email
          },
          { upsert: true, new: true }
        );
        console.log('Prediction data saved/updated');
      } catch (predictionError) {
        console.error('Error saving prediction data:', predictionError);
        // Don't fail the whole process if this part fails
      }
    }
    
    // Send confirmation email
    try {
      console.log('Sending confirmation email...');
      const emailResult = await sendBookingConfirmationEmail(body, predictionData || {});
      
      if (emailResult.success) {
        console.log('Confirmation email sent successfully');
        // Update the booking record to mark email as sent
        await Booking.findByIdAndUpdate(booking._id, { emailSent: true });
      } else {
        console.error('Failed to send confirmation email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the whole process if email sending fails
    }
    
    // Return success response with the created booking
    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking created successfully', 
        data: booking,
        emailSent: booking.emailSent
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    
    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      
      console.error('Validation errors:', validationErrors);
      
      return NextResponse.json(
        { success: false, error: 'Validation failed', validationErrors },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { success: false, error: 'Failed to create booking', message: error.message },
      { status: 500 }
    );
  }
}

// GET handler for retrieving bookings
export async function GET(request) {
  console.log('Booking API route called with GET method');
  
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB successfully');
    
    // Get all bookings
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    console.log(`Retrieved ${bookings.length} bookings`);
    
    // Return success response with the bookings
    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    
    // Handle errors
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve bookings', message: error.message },
      { status: 500 }
    );
  }
} 