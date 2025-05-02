import { NextResponse } from 'next/server';
const predictModel = require('@/models/ml/predictModel');

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received prediction request with data:', data);
    
    // Validate required fields
    const requiredFields = [
      'Category',
      'Current State',
      'Price (INR)'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      
      // Still try to make a prediction with default values for missing fields
      const completeData = { ...data };
      missingFields.forEach(field => {
        if (field === 'Category') {
          completeData[field] = 'Other';
        } else if (field === 'Current State') {
          completeData[field] = 'Working';
        } else if (field === 'Price (INR)') {
          completeData[field] = '10000'; // Default moderate price
        }
      });
      
      try {
        // Try prediction with completed data
        const result = await predictModel.predict(completeData);
        return NextResponse.json({
          predictedValue: Math.round(result.predictedValue || result.value), 
          success: true,
          warning: `Used default values for: ${missingFields.join(', ')}`
        });
      } catch (modelError) {
        // If that fails, return a fallback value
        console.error('Completed data prediction failed:', modelError);
        return NextResponse.json({
          predictedValue: data['Price (INR)'] ? Math.round(Number(data['Price (INR)']) * 0.1) : 1000,
          success: true,
          warning: 'Used fallback calculation due to missing fields'
        });
      }
    }

    // Validate numerical fields
    const numericalFields = [
      'Price (INR)'
    ];

    const invalidFields = numericalFields.filter(field => {
      const value = parseFloat(data[field]);
      return isNaN(value) || value < 0;
    });

    if (invalidFields.length > 0) {
      console.error(`Invalid numerical values for fields: ${invalidFields.join(', ')}`);
      
      // Fix invalid fields and proceed
      const fixedData = { ...data };
      invalidFields.forEach(field => {
        if (field === 'Price (INR)') {
          fixedData[field] = '10000'; // Default price
        }
      });
      
      try {
        // Try prediction with fixed data
        const result = await predictModel.predict(fixedData);
        return NextResponse.json({
          predictedValue: Math.round(result.predictedValue || result.value),
          success: true,
          warning: `Fixed invalid values for: ${invalidFields.join(', ')}`
        });
      } catch (modelError) {
        // If that fails, return a fallback value
        console.error('Fixed data prediction failed:', modelError);
        return NextResponse.json({
          predictedValue: 1500,
          success: true,
          warning: 'Used fallback value due to invalid fields'
        });
      }
    }
    
    try {
      // Get prediction from the model
      const result = await predictModel.predict(data);
      console.log('Prediction result:', result);
      
      // Return the prediction
      return NextResponse.json({
        predictedValue: Math.round(result.predictedValue || result.value),
        success: true
      });
    } catch (modelError) {
      console.error('Model error:', modelError);
      
      // Use a fallback based on price
      const fallbackValue = data['Price (INR)'] ? Math.round(Number(data['Price (INR)']) * 0.2) : 2500;
      
      return NextResponse.json({ 
        predictedValue: fallbackValue,
        success: true,
        warning: `Prediction model error: ${modelError.message}`
      });
    }
  } catch (error) {
    console.error('Error making prediction:', error);
    
    return NextResponse.json({
      predictedValue: 2000, // Default fallback value
      success: true,
      warning: 'Used default value due to server error'
    });
  }
} 