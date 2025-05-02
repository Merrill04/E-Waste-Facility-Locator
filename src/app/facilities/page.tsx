"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Mapbox from '../../components/Mapbox';
import { facilities } from '../../data/facilities';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FacilitiesPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const markers = facilities.map(facility => ({
    coordinates: facility.coordinates,
    title: facility.name,
    description: `${facility.address}, ${facility.city}, ${facility.state}`
  }));

  // Extract unique waste types
  const wasteTypes = ['All', ...Array.from(new Set(facilities.flatMap(facility => facility.types)))];

  // Filter facilities based on selected waste type
  const filteredFacilities = activeFilter === 'All'
    ? facilities
    : facilities.filter(facility => facility.types.includes(activeFilter));

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-50 rounded-bl-full opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50 rounded-tr-full opacity-50 -z-10"></div>
      <div className="absolute top-1/4 left-0 w-16 h-16 bg-green-100 rounded-full opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-green-100 rounded-full opacity-30 -z-10"></div>
      
      <Navbar />
      
      <div className="w-full bg-gradient-to-r from-green-600 to-green-700 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white" 
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-white bg-opacity-20 text-white font-medium text-sm mb-6 backdrop-blur-sm"
          >
            FIND NEARBY CENTERS
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight leading-tight"
          >
            E-Waste <span className="text-green-200">Recycling Centers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white text-opacity-90 max-w-3xl mx-auto text-xl leading-relaxed font-light"
          >
            Locate nearby e-waste recycling facilities across India and responsibly dispose of your electronic waste. Find the perfect center for your recycling needs.
          </motion.p>
        </div>
      </div>

      {/* Full-width map section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="w-full relative"
        style={{ height: "70vh" }}
      >
        <Mapbox 
          center={[78.9629, 20.5937]} // India's center
          zoom={4}
          markers={markers}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </motion.div>

      <main className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full relative">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{facilities.length}</h3>
            <p className="text-gray-600">Certified Recycling Centers</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{wasteTypes.length - 1}</h3>
            <p className="text-gray-600">Types of Waste Accepted</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">10K+</h3>
            <p className="text-gray-600">Monthly Visitors</p>
          </motion.div>
        </div>

        {/* Filter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Find The Perfect Recycling Center</h2>
            <p className="text-gray-500 mt-2 md:mt-0">Filter by waste type to find specialized centers</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {wasteTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(type)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === type
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Facilities grid */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-green-500 pl-4"
        >
          Available Recycling Facilities
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index % 3) }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
            >
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full"></div>
              
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {facility.name}
                </h2>
              </div>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 font-medium">
                    {facility.address}, <span className="text-gray-800">{facility.city}</span>, {facility.state}
                  </p>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-gray-600 font-medium">{facility.contact}</p>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 font-medium">{facility.operatingHours}</p>
                </div>
              </div>

              <div className="mb-8 relative">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Accepted Waste Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {facility.types.map((type, idx) => (
                    <span key={idx} className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-100">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link 
                  href={`/Recycle?facilityName=${encodeURIComponent(facility.name)}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <span>Book Recycling</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">No facilities found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">No facilities that accept {activeFilter} waste were found. Please try a different filter or view all available centers.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Show All Facilities
            </button>
          </motion.div>
        )}
        
        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-green-50 to-green-100 p-10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-green-200 rounded-full opacity-50"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-700 text-lg mb-8 max-w-3xl">
              If you're unable to find a suitable recycling center for your e-waste, try our recycling prediction tool to get an estimated value for your electronic items.
            </p>
            <Link
              href="/Recycle"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Try Our Recycling Tool
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default FacilitiesPage;