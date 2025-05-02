"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const email = Cookies.get("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userEmail");
    localStorage.removeItem("token");
    setUserEmail(null);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">E-Waste Locator</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-bold text-gray-600 px-3 py-2 rounded-md hover:bg-green-200 hover:text-green-600 transition-all duration-300">
              Home
            </Link>
            <Link href="/facilities" className="font-bold text-gray-600 px-3 py-2 rounded-md hover:bg-green-200 hover:text-green-600 transition-all duration-300">
              Find Facilities
            </Link>
            <Link href="/Education" className="font-bold text-gray-600 px-3 py-2 rounded-md hover:bg-green-200 hover:text-green-600 transition-all duration-300">
              Education
            </Link>
            <Link href="/Recycle" className="font-bold text-gray-600 px-3 py-2 rounded-md hover:bg-green-200 hover:text-green-600 transition-all duration-300">
              Recycle
            </Link>
            <Link href="/news" className="font-bold text-gray-600 px-3 py-2 rounded-md hover:bg-green-200 hover:text-green-600 transition-all duration-300">
              News
            </Link>

            {/* Conditional Rendering for Authentication */}
            {userEmail ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {userEmail}</span>
                <button
                  className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                className="px-3 py-2 text-gray-600 hover:text-green-600 transition-colors"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-green-600">
              Home
            </Link>
            <Link href="/facilities" className="block px-3 py-2 text-gray-600 hover:text-green-600">
              Find Facilities
            </Link>
            <Link href="/education" className="block px-3 py-2 text-gray-600 hover:text-green-600">
              Education
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-green-600">
              About
            </Link>

            {/* Conditional Rendering for Authentication in Mobile Menu */}
            {userEmail ? (
              <button className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-800" onClick={handleLogout}>
                Sign Out
              </button>
            ) : (
              <button className="block w-full text-left px-3 py-2 text-gray-600 hover:text-green-600" onClick={() => router.push("/signup")}>
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
