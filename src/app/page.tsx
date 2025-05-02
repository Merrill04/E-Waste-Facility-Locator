"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '../components/Card.jsx';
import EwasteInfoComponent from '../components/EwasteInfoComponent';
import Mapbox from '../components/Mapbox';
import { facilities } from '../data/facilities';

const HomePage = () => {
  const features = [
    {
      title: "Find Recycling Facilities",
      description: "Locate nearby e-waste recycling centers with detailed information about their services and operating hours.",
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: "/facilities"
    },
    {
      title: "Recycle Your Items",
      description: "Get instant value predictions for your electronic items and connect with recycling facilities.",
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      link: "/Recycle"
    },
    {
      title: "Learn About E-Waste",
      description: "Access comprehensive information about e-waste management and its environmental impact.",
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      link: "/Education"
    },
    {
      title: "Stay Updated",
      description: "Get the latest news and updates about e-waste management and recycling initiatives.",
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
      ),
      link: "/news"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
            Sustainable E-Waste Management
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-shadow-lg max-w-3xl mx-auto">
            Find recycling facilities, get value predictions, and learn about responsible e-waste disposal
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/Recycle"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-md hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Recycling
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full min-h-screen py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Our Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link 
                  href={feature.link}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap">
        <div className="flex flex-col w-full lg:w-1/2">
          <Card />
          <div className="flex flex-col p-12">
            <h2 className="text-3xl font-bold">Education</h2>
            <hr className="my-2 w-1/2" />
            <p>
              The E-Waste Facility Locator project is a web application that helps users locate nearby e-waste recycling facilities and assess the value of their recyclable electronic waste. Users can search for facilities in their area to responsibly dispose of e-waste like old electronics and appliances. The app also uses an AI/ML model to predict an approximate recycling price for specific types of e-waste, based on item details entered by the user. By promoting convenient recycling and providing estimated returns, this project encourages responsible disposal and recycling of electronic waste.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <EwasteInfoComponent />
        </div>
      </div>

      <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold p-3">Discover Nearest E-Waste Facilities India</h1>
        <div className="w-full p-4">
          <Mapbox 
            center={[78.9629, 20.5937]} // India's center
            zoom={4}
            markers={facilities.map(facility => ({
              coordinates: facility.coordinates,
              title: facility.name,
              description: `${facility.address}, ${facility.city}, ${facility.state}`
            }))}
          />
        </div>
      </div>
            {/* FAQ Section */}
            <section className="relative py-24 px-4 w-full bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100 rounded-full opacity-30 blur-2xl z-0" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-2xl z-0" />
        <div className="relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4 tracking-wider shadow-sm">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow-lg">
              FAQs Regarding Waste Management
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about e-waste, recycling, and responsible disposal.
            </p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                question: "What is e-waste?",
                answer: "E-waste refers to discarded electrical or electronic devices such as computers, phones, or appliances.",
                icon: (
                  <svg className="w-10 h-10 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                )
              },
              {
                question: "Why is e-waste recycling important?",
                answer: "Recycling reduces environmental pollution, conserves resources, and minimizes landfill usage.",
                icon: (
                  <svg className="w-10 h-10 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10V3h14v7" /></svg>
                )
              },
              {
                question: "Where can I dispose of my old electronics?",
                answer: "You can locate nearby recycling centers using our facility locator tool on this site.",
                icon: (
                  <svg className="w-10 h-10 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
                )
              },
              {
                question: "Can I get money for recycling e-waste?",
                answer: "Yes, the app provides estimated value for items based on an AI/ML model.",
                icon: (
                  <svg className="w-10 h-10 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" /></svg>
                )
              },
              {
                question: "What happens to recycled electronics?",
                answer: "They are dismantled and valuable components are recovered or safely disposed of.",
                icon: (
                  <svg className="w-10 h-10 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                )
              },
              {
                question: "Is e-waste harmful to the environment?",
                answer: "Yes, improper disposal can release toxic chemicals into the soil and water.",
                icon: (
                  <svg className="w-10 h-10 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" /></svg>
                )
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.15)' }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:border-green-300 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {faq.icon}
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
