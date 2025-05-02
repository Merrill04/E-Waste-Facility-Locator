"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';

const BookingRecyclingPage = () => {
  // Get prediction data from URL params
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    preferredDate: '',
    preferredTime: '09:00 AM - 10:00 AM',
    itemDetails: '',
    specificRequirements: ''
  });
  
  // Store prediction data separately
  const [predictionData, setPredictionData] = useState(null);

  // Initialize from URL parameters if available
  useEffect(() => {
    // Try to get prediction data from URL parameters
    const deviceName = searchParams.get('deviceName');
    const predictedValue = searchParams.get('predictedValue');
    const deviceCategory = searchParams.get('deviceCategory');
    const deviceCondition = searchParams.get('deviceCondition');
    const originalPrice = searchParams.get('originalPrice');
    
    // If we have prediction data, store it
    if (deviceName && predictedValue) {
      const prediction = {
        deviceName,
        predictedValue: parseFloat(predictedValue),
        deviceCategory: deviceCategory || '',
        deviceCondition: deviceCondition || '',
        originalPrice: originalPrice ? parseFloat(originalPrice) : 0
      };
      
      setPredictionData(prediction);
      
      // Pre-fill the item details field if we have prediction data
      setFormData(prev => ({
        ...prev,
        itemDetails: `${deviceName} (${deviceCategory || 'Electronic Device'}) - Condition: ${deviceCondition || 'Used'}`
      }));
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Prepare submission data including prediction data if available
    const submissionData = {
      ...formData,
      predictionData: predictionData || null
    };

    // Log the form data for debugging
    console.log('Form data being submitted:', submissionData);

    try {
      // Call the booking API with the correct endpoint path
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      // Log the raw response for debugging
      console.log('Response status:', response.status, response.statusText);
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText || response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Booking submitted successfully:', result);
      
      // Set success state
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitError(error.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Book Your Recycling Pickup</h1>
          <p className="text-center text-gray-600 mb-12">Schedule a convenient time for us to collect your e-waste items</p>
          
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center"
            >
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Booking Successful!</h2>
              <p className="text-gray-700 mb-6">Your recycling pickup has been scheduled. We'll send you a confirmation email with the details.</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Return to Home
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-lg p-8 border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4 md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your phone number"
                  />
                </div>
                
                {/* Pickup Address */}
                <div className="space-y-4 md:col-span-2 mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Pickup Address</h2>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Street address"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="City"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="State"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="PIN Code"
                  />
                </div>
                
                {/* Scheduling Information */}
                <div className="space-y-4 md:col-span-2 mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Pickup Schedule</h2>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Time Slot</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  >
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                
                {/* Item Details */}
                <div className="space-y-4 md:col-span-2 mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Item Details</h2>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Items to be Picked Up</label>
                  <textarea
                    name="itemDetails"
                    value={formData.itemDetails}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Please list the items you want to recycle (e.g., 1 laptop, 2 mobile phones, etc.)"
                  ></textarea>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
                  <textarea
                    name="specificRequirements"
                    value={formData.specificRequirements}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Any specific requirements or notes for the pickup"
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="md:col-span-2 mt-6">
                  {submitError && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
                      {submitError}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-4 rounded-md text-white font-medium transition-colors ${
                      isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Book Recycling Pickup'
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingRecyclingPage; 