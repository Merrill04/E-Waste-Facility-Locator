"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';

const RecycleableItems = [
  {
    name: 'Mobile Phones',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>
    ),
    description:
      'Improper disposal of phones can release harmful toxins like lead and cadmium into the environment.'
  },
  {
    name: 'Laptops',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>
    ),
    description:
      'Old laptops contain hazardous materials, including mercury and lithium-ion batteries.'
  },
  {
    name: 'Chargers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="20" x2="20" y2="20"></line><line x1="9.53" y1="3" x2="15" y2="3"></line><line x1="12" y1="3" x2="12" y2="12"></line></svg>
    ),
    description:
      'Chargers contribute to plastic waste and may contain small amounts of lead.'
  },
  {
    name: 'Batteries',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="7" y1="22" x2="17" y2="22"></line></svg>
    ),
    description:
      'Batteries can leak toxic chemicals such as lead and acid, contaminating soil and water.'
  },
  {
    name: 'Computers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><polyline points="16 15 12 11 8 15"></polyline></svg>
    ),
    description:
      'Desktop computers and towers contain various hazardous materials that must be properly recycled.'
  },
  {
    name: 'Printers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
    ),
    description:
      'Printers often have toner cartridges and other components that can leach toxins if not recycled.'
  },
  {
    name: 'TVs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
    ),
    description:
      'Old TVs may contain lead, mercury, and other harmful substances that require specialized recycling.'
  },
  {
    name: 'Monitors',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
    ),
    description:
      'Computer monitors often have glass, metals, and plastics that should be responsibly recycled.'
  }
];

const categoryOptions = [
  'Tablet',
  'Phone',
  'Laptop',
  'Desktop',
  'Monitor',
  'Printer',
  'Other'
];

const currentStateOptions = [
  'Working',
  'Not Working',
  'Partially Working'
];

const ownershipTypeOptions = [
  'Firsthand',
  'Secondhand'
];

const materialCompositionOptions = [
  'Metals, Hazardous Substances',
  'Plastics, Mixed',
  'Glass, Display',
  'Mixed Components',
  'Plastics, Metals',
  'Electronics, PCB',
  'Glass, Electronics',
  'Metals, Electronics'
];

const RecycleForm = ({ onPredict, facilityName }) => {
  const [formData, setFormData] = useState({
    facilityName: facilityName || '',
    Category: '',
    'Model Name': '',
    'Model Type': '',
    'Age (years)': '',
    'Price (INR)': '',
    'Current State': '',
    'Depreciation Factor (%)': '',
    'Ownership Type': '',
    'Material Composition': '',
    'Environmental Impact Rating': '5',
    'Recycling Process Complexity': '5',
    imageUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [predictedValue, setPredictedValue] = useState(null);
  const fileInputRef = useRef(null);

  // Update formData when facilityName prop changes
  useEffect(() => {
    if (facilityName) {
      setFormData(prev => ({
        ...prev,
        facilityName: facilityName
      }));
    }
  }, [facilityName]);

  const validateForm = () => {
    const newErrors = {};
    
    // Only require essential fields, not all of them
    const requiredFields = ['Category', 'Current State', 'Material Composition'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Special validation for numeric fields - only validate if they have a value
    if (formData['Age (years)'] && isNaN(formData['Age (years)'])) {
      newErrors['Age (years)'] = 'Age must be a number';
    }
    if (formData['Price (INR)'] && isNaN(formData['Price (INR)'])) {
      newErrors['Price (INR)'] = 'Price must be a number';
    }
    if (formData['Depreciation Factor (%)'] && isNaN(formData['Depreciation Factor (%)'])) {
      newErrors['Depreciation Factor (%)'] = 'Depreciation factor must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        image: 'Please upload an image file'
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        image: 'Image size should be less than 5MB'
      }));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        imageUrl: data.imageUrl
      }));
      setErrors(prev => ({
        ...prev,
        image: ''
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({
        ...prev,
        image: 'Failed to upload image'
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");
    setPredictedValue(null);
    setSubmitResult(null);

    // Validate form before submission
    if (!validateForm()) {
      console.log("Form validation failed", errors);
      setSubmitResult({
        success: false,
        message: 'Please fill in all required fields'
      });
      return;
    }

    console.log("Form validated successfully");
    try {
      setIsSubmitting(true);
      const submissionData = { ...formData };
      console.log("Form data prepared for submission:", submissionData);

      // First, upload the image if one is selected
      if (fileInputRef.current?.files[0]) {
        console.log("Uploading image...");
        const imageFormData = new FormData();
        imageFormData.append('image', fileInputRef.current.files[0]);
        const imageResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        if (!imageResponse.ok) {
          console.error("Image upload failed with status:", imageResponse.status);
          throw new Error('Failed to upload image');
        }
        const imageData = await imageResponse.json();
        submissionData.imageUrl = imageData.imageUrl;
        setFormData(submissionData);
        console.log("Image uploaded successfully:", imageData.imageUrl);
      }

      // Save to database first
      let saveSuccess = false;
      let saveError = '';
      try {
        console.log("Submitting data to API...");
        const response = await fetch('/api/recycle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        });
        console.log("API response status:", response.status);
        const result = await response.json();
        console.log("API response data:", result);
        
        if (response.ok) {
          console.log("Form submitted successfully");
          setSubmitResult({
            success: true,
            message: 'Item submitted successfully!'
          });
          saveSuccess = true;
          // Form will be reset after prediction in the prediction success handler
        } else {
          console.error("Form submission failed:", result.error);
          setSubmitResult({
            success: false,
            message: result.error || 'Failed to submit item'
          });
          saveError = result.error || 'Failed to submit item';
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        setSubmitResult({
          success: false,
          message: error.message || 'An error occurred while submitting the form'
        });
        saveError = error.message || 'An error occurred while submitting the form';
      }

      // Only call prediction if save was successful
      if (saveSuccess) {
        console.log("Starting prediction with data:", submissionData);
        try {
          // Clone data to ensure it doesn't get reset before the modal is shown
          const predictionData = { ...submissionData };
          await onPredict(predictionData);
          console.log("Prediction completed successfully");
          
          // Delay form reset to ensure modal can use the data
          setTimeout(() => {
            setFormData({
              facilityName: facilityName || '',
              Category: '',
              'Model Name': '',
              'Model Type': '',
              'Age (years)': '',
              'Price (INR)': '',
              'Current State': '',
              'Depreciation Factor (%)': '',
              'Ownership Type': '',
              'Material Composition': '',
              'Environmental Impact Rating': '5',
              'Recycling Process Complexity': '5',
              imageUrl: ''
            });
            setErrors({});
            setImagePreview(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }, 5000); // Wait for 5 seconds to ensure modal is visible
        } catch (predictionError) {
          // Prediction is optional, so just log the error
          console.error('Prediction error:', predictionError);
        }
      }
    } finally {
      console.log("Form submission process completed");
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-12 border border-gray-100 mb-16"
      style={{ backdropFilter: 'blur(2px)' }}
    >
      <div className="mb-10 text-center">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight"
        >
          Submit Your Item for Recycling
        </motion.h3>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Fill in the details below to get your e-waste recycled responsibly.
        </p>
      </div>

      {/* Form submission result notification */}
      {submitResult && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          <div className="flex items-center">
            {submitResult.success ? (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p>{submitResult.message}</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Category */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Category</label>
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.Category ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          >
            <option value="">Select Category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.Category && <p className="mt-1 text-sm text-red-600">{errors.Category}</p>}
        </div>
        {/* Current State */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Current State</label>
          <select
            name="Current State"
            value={formData['Current State']}
            onChange={handleChange}
            className={`w-full p-3 border ${errors['Current State'] ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          >
            <option value="">Select State</option>
            {currentStateOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors['Current State'] && <p className="mt-1 text-sm text-red-600">{errors['Current State']}</p>}
        </div>
        {/* Material Composition */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Material Composition</label>
          <select
            name="Material Composition"
            value={formData['Material Composition']}
            onChange={handleChange}
            className={`w-full p-3 border ${errors['Material Composition'] ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          >
            <option value="">Select Composition</option>
            {materialCompositionOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors['Material Composition'] && <p className="mt-1 text-sm text-red-600">{errors['Material Composition']}</p>}
        </div>
        {/* Model Name */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Model Name</label>
          <input
            type="text"
            name="Model Name"
            value={formData['Model Name']}
            onChange={handleChange}
            className={`w-full p-3 border ${errors['Model Name'] ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          />
          {errors['Model Name'] && <p className="mt-1 text-sm text-red-600">{errors['Model Name']}</p>}
        </div>
        {/* Ownership Type */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Ownership Type</label>
          <select
            name="Ownership Type"
            value={formData['Ownership Type']}
            onChange={handleChange}
            className={`w-full p-3 border ${errors['Ownership Type'] ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          >
            <option value="">Select Type</option>
            {ownershipTypeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors['Ownership Type'] && <p className="mt-1 text-sm text-red-600">{errors['Ownership Type']}</p>}
        </div>
        {/* Depreciation Factor (%) */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Depreciation Factor (%)</label>
          <input
            type="number"
            name="Depreciation Factor (%)"
            value={formData['Depreciation Factor (%)']}
            onChange={handleChange}
            className={`w-full p-3 border ${errors['Depreciation Factor (%)'] ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          />
          {errors['Depreciation Factor (%)'] && <p className="mt-1 text-sm text-red-600">{errors['Depreciation Factor (%)']}</p>}
        </div>
        {/* Age (years) */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Age (years)</label>
          <input
            type="number"
            name="Age (years)"
            value={formData['Age (years)']}
            onChange={handleChange}
            className={`w-full p-3 border ${errors['Age (years)'] ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          />
          {errors['Age (years)'] && <p className="mt-1 text-sm text-red-600">{errors['Age (years)']}</p>}
        </div>
        {/* Price (INR) */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Price (INR)</label>
          <input
            type="number"
            name="Price (INR)"
            value={formData['Price (INR)']}
            onChange={handleChange}
            className={`w-full p-3 border ${errors['Price (INR)'] ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          />
          {errors['Price (INR)'] && <p className="mt-1 text-sm text-red-600">{errors['Price (INR)']}</p>}
        </div>
        {/* Image Upload */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">Image Upload</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className={`w-full p-3 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50`}
          />
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>
      </div>

      {imagePreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 flex justify-center"
        >
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-xs rounded-lg shadow-md"
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-green-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-green-700 transition-colors duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Submit for Recycling'}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

const RecyclableItemsPage = () => {
  const searchParams = useSearchParams();
  const facilityName = searchParams.get('facility') || 'E-Waste Recycling Center';
  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [predictionData, setPredictionData] = useState({
    deviceName: '',
    predictedValue: 0,
    itemType: '',
    itemState: '',
    itemPrice: 0
  });

  const handlePredict = async (data) => {
    // Reset previous prediction results
    setPredictionResult(null);
    setPredictionError(null);
    setIsPredicting(true);
    
    try {
      console.log('Sending prediction request with data:', data);
      
      // Call the prediction API
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      console.log('Prediction API response:', result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to get prediction');
      }
      
      // Extract the numeric prediction value
      const predictedNumericValue = typeof result.predictedValue === 'number' 
        ? result.predictedValue 
        : Number(result.predictedValue);
      
      // Set the prediction result
      setPredictionResult(predictedNumericValue);
      console.log('Setting prediction result:', predictedNumericValue);
      
      // Store all prediction data for use with booking
      setPredictionData({
        deviceName: data['Model Name'] || data.Category || 'Electronic Device',
        predictedValue: predictedNumericValue,
        itemType: data.Category || '',
        itemState: data['Current State'] || '',
        itemPrice: data['Price (INR)'] || 0,
        min_value: result.min_value,
        max_value: result.max_value,
        percentOfOriginal: result.percentOfOriginal,
        is_fallback: result.is_fallback,
        method: result.method,
        warning: result.warning
      });
      
      // Show the prediction modal
      setShowPredictionModal(true);
      console.log('Modal should be visible now');
    } catch (error) {
      console.error('Error making prediction:', error);
      setPredictionError(error.message || 'An error occurred during prediction');
      setShowPredictionModal(true);
    } finally {
      setIsPredicting(false);
    }
  };

  const closePredictionModal = () => {
    setShowPredictionModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Recyclable Items Section */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4"
            >
              RECYCLABLE ITEMS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Recycle Your E-Waste
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Discover the items you can recycle and learn about their environmental impact
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {RecycleableItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-300"
                    onClick={() => handlePredict({ item: item.name })}
                  >
                    Recycle Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full"
          >
            <RecycleForm onPredict={handlePredict} facilityName={facilityName} />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Prediction Modal */}
      {showPredictionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Recycling Value Prediction
                    </h3>
                    <div className="mt-2">
                      {predictionError ? (
                        <div className="text-red-600 mb-4">
                          <p>Error: {predictionError}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">
                            Estimated recycling value for your {predictionData.deviceName}:
                          </p>
                          <div className="flex items-center justify-center sm:justify-start">
                            <p className="text-3xl font-bold text-green-600">
                              ₹{predictionData.predictedValue.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="mt-4 border-t border-gray-200 pt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Item Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-gray-500">Item Type:</div>
                              <div className="font-medium">{predictionData.itemType || "Not specified"}</div>
                              
                              <div className="text-gray-500">Condition:</div>
                              <div className="font-medium">{predictionData.itemState || "Not specified"}</div>
                              
                              <div className="text-gray-500">Original Price:</div>
                              <div className="font-medium">₹{predictionData.itemPrice || "0"}</div>
                            </div>
                            
                            {predictionData.warning && (
                              <div className="mt-3 text-xs text-amber-600">
                                Note: {predictionData.warning}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <a
                  href={`/BookingRecycling?deviceName=${encodeURIComponent(predictionData.deviceName)}&predictedValue=${encodeURIComponent(predictionData.predictedValue)}&deviceCategory=${encodeURIComponent(predictionData.itemType)}&deviceCondition=${encodeURIComponent(predictionData.itemState)}&originalPrice=${encodeURIComponent(predictionData.itemPrice)}`}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Schedule Pickup
                </a>
                <button
                  type="button"
                  onClick={closePredictionModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default RecyclableItemsPage;
