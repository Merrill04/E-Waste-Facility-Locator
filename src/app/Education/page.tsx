"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from 'next/image';
import GeminiChat from '@/components/GeminiChat';

interface Image {
  url: string;
  title: string;
  description: string;
}

interface QAContainerProps {
  question: string;
  answer: string;
  index: number;
}

// Image slider data
const sliderImages: Image[] = [
  {
    url: '/assets/education/slide1.jpeg',
    title: 'Understanding E-Waste',
    description: 'Learn about the impact of electronic waste on our environment'
  },
  {
    url: '/assets/education/slide2.jpg',
    title: 'Recycling Process',
    description: 'Discover how electronic devices are properly recycled'
  },
  {
    url: '/assets/education/slide3.jpg',
    title: 'Environmental Impact',
    description: 'See how e-waste affects our planet and ecosystems'
  },
  {
    url: '/assets/education/slide4.jpeg',
    title: 'Sustainable Solutions',
    description: 'Explore sustainable ways to handle electronic waste'
  },
  {
    url: '/assets/education/slide5.jpg',
    title: 'Future of Recycling',
    description: 'Look into the future of e-waste recycling technology'
  }
];

// Q&A Data
const qaData = [
  {
    question: "What is e-waste recycling?",
    answer: "E-waste recycling is the process of collecting, dismantling, and safely disposing of electronic waste to recover valuable materials like metals and plastics while reducing environmental harm."
  },
  {
    question: "Why is e-waste recycling important?",
    answer: "It prevents toxic substances like lead and mercury from polluting the environment, conserves natural resources, and reduces electronic waste in landfills."
  },
  {
    question: "Which electronic items can be recycled?",
    answer: "Devices like mobile phones, laptops, computers, printers, televisions, and batteries can be recycled to recover useful materials."
  },
  {
    question: "How does improper e-waste disposal harm the environment?",
    answer: "When e-waste is dumped in landfills or burned, toxic chemicals leach into soil and water or release harmful gases into the air, causing pollution."
  },
  {
    question: "Where can I recycle my e-waste?",
    answer: "You can drop off e-waste at authorized recycling centers, e-waste collection drives, or return old electronics to manufacturers with take-back programs."
  },
  {
    question: "What happens to recycled e-waste?",
    answer: "Recycled e-waste is dismantled, valuable materials are extracted and reused, and hazardous components are safely disposed of to minimize environmental impact."
  }
];

const ImageSlider = ({ images }: { images: Image[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              {images[currentIndex].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-white/90"
            >
              {images[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full backdrop-blur-sm hover:bg-white/40 transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full backdrop-blur-sm hover:bg-white/40 transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const QAContainer = ({ question, answer, index }: QAContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-colors duration-200"
      >
        <h3 className="text-xl font-bold text-gray-800">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="bg-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-5 bg-white"
          >
            <div className="prose prose-lg max-w-none">
              {answer.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Facts about e-waste
const facts = [
  { 
    icon: "📱", 
    title: "50 Million Tons", 
    description: "Of e-waste is generated worldwide each year" 
  },
  { 
    icon: "♻️", 
    title: "Only 20%", 
    description: "Of global e-waste is formally recycled" 
  },
  { 
    icon: "💰", 
    title: "$62.5 Billion", 
    description: "Annual value of raw materials in e-waste" 
  },
  { 
    icon: "🔋", 
    title: "Up to 60 Elements", 
    description: "Can be found in various electronic products" 
  }
];

const EducationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(30)].map((_, i) => (
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
        
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-24 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-white bg-opacity-20 text-white font-medium text-sm mb-6 backdrop-blur-sm"
          >
            UNDERSTANDING E-WASTE
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            E-Waste <span className="text-green-200">Education</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white text-opacity-90 max-w-3xl text-xl leading-relaxed font-light mb-10"
          >
            Learn about the environmental impact of electronic waste and discover responsible ways to dispose of your outdated devices.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#facts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white text-green-700 px-6 py-3 rounded-full font-medium hover:bg-green-50 transition-colors duration-300 inline-flex items-center"
            >
              Quick Facts
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>
            <motion.a
              href="#faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300 inline-flex items-center"
            >
              Common Questions
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Image Slider Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Educational Resources</h2>
              <p className="text-lg text-gray-600 max-w-2xl">Explore our visual guides to learn more about e-waste management and its impact on our planet.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="#chat" className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                Have questions? Ask our AI assistant
                <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <ImageSlider images={sliderImages} />
          </motion.div>
        </section>

        {/* Facts Section */}
        <section id="facts" className="mb-24">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4"
            >
              DID YOU KNOW?
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6 text-gray-800"
            >
              E-Waste Facts & Figures
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Learn some surprising facts about electronic waste and its impact on our world.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{fact.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{fact.title}</h3>
                <p className="text-gray-600">{fact.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-24">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6 text-gray-800"
            >
              Common Questions About E-Waste
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Find answers to frequently asked questions about electronic waste and recycling.
            </motion.p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {qaData.map((qa, index) => (
              <QAContainer
                key={index}
                question={qa.question}
                answer={qa.answer}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Chat Section */}
        <section id="chat" className="mb-24">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4"
            >
              AI ASSISTANT
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6 text-gray-800"
            >
              Ask Our E-Waste Expert
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Have a specific question about e-waste? Our AI-powered assistant is here to help!
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-1 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl overflow-hidden">
                <GeminiChat />
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Call to Action */}
        <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/30 rounded-full blur-xl"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/30 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center">
            <div className="mb-8 md:mb-0 md:mr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Recycle Your E-Waste?</h2>
              <p className="text-white/90 text-lg max-w-xl">
                Take action today! Find nearby recycling facilities or get an estimate for your recyclable electronics.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/facilities" 
                className="bg-white text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-50 transition-colors duration-300"
              >
                Find Facilities
              </a>
              <a 
                href="/Recycle" 
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300"
              >
                Recycle Now
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />      
    </div>
  );
};

export default EducationPage; 