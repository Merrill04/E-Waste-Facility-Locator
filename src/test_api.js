// Test script for the prediction API route
const predictModel = require('./models/ml/predictModel');

// Import the route handler (not directly possible in Node.js, so we'll simulate it)
// This is a simplified version of the API route logic
async function simulateApiRoute(data) {
  try {
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
      return {
        predictedValue: data['Price (INR)'] ? Math.round(Number(data['Price (INR)']) * 0.1) : 1000,
        success: true,
        warning: 'Used fallback calculation due to missing fields'
      };
    }

    // Get prediction from the model
    const result = await predictModel.predict(data);
    console.log('Prediction result:', result);
    
    // Return the prediction
    return {
      predictedValue: Math.round(result.predictedValue || result.value),
      success: true
    };
  } catch (error) {
    console.error('API error:', error);
    
    // Use a fallback based on price
    const fallbackValue = data['Price (INR)'] ? Math.round(Number(data['Price (INR)']) * 0.2) : 2500;
    
    return { 
      predictedValue: fallbackValue,
      success: true,
      warning: `Prediction model error: ${error.message}`
    };
  }
}

// Run the test
async function testApiRoute() {
  console.log('Testing API route with the laptop test case...');
  
  // Our test case data
  const testData = {
    Category: 'Laptop',
    'Current State': 'Working',
    'Price (INR)': 27224,
    'Material Composition': 'Electronics, PCB'
  };
  
  const response = await simulateApiRoute(testData);
  console.log('API response:', response);
  
  // Check if result matches our expected value (rounded version)
  const expectedValue = Math.round(5553.696);
  if (response.predictedValue === expectedValue) {
    console.log(`✅ SUCCESS: API returns ${response.predictedValue}, which matches expected value ${expectedValue}`);
  } else {
    console.log(`❌ FAIL: API returns ${response.predictedValue}, which doesn't match expected value ${expectedValue}`);
  }
}

// Run the test
testApiRoute().catch(console.error); 