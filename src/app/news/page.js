'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar"; // Add Navbar import

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const API_KEY = '043466b2b1974a9dbe619a3855d47d7b';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=e-waste&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [API_KEY]);

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">E-Waste News</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={article.urlToImage || '/placeholder.jpg'}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage; // Ensure this line is at the end of the file