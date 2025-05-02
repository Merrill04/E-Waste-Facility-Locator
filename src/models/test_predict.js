// Test script for prediction model
const predictModel = require('./ml/predictModel');

async function testPrediction() {
  try {
    // Test data for specific case
    const testData = {
      Category: 'Laptop',
      'Current State': 'Working',
      'Price (INR)': 27224,
      'Material Composition': 'Electronics, PCB'
    };
    
    console.log('Testing prediction with data:', testData);
    
    // Make prediction
    const result = await predictModel.predict(testData);
    
    console.log('Prediction result:', result);
    
    // Check if the prediction matches expected value
    const expectedValue = 5553.696;
    const actualValue = result.predictedValue;
    
    if (Math.abs(actualValue - expectedValue) < 100) {
      console.log(`✅ SUCCESS: Prediction value ${actualValue} is close to expected value ${expectedValue}`);
    } else {
      console.log(`❌ FAIL: Prediction value ${actualValue} is not close to expected value ${expectedValue}`);
    }
    
  } catch (error) {
    console.error('Error during prediction test:', error);
  }
}

// Run the test
testPrediction(); 