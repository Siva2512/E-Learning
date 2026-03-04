"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { GiStarShuriken } from "react-icons/gi";
import LoginModal from "../Pages/Login/Login";
import SignupModal from "../Pages/Signup/Signup";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-[#e0e0e0] bg-white/70 backdrop-blur-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-3 flex items-center gap-10">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GiStarShuriken className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              EduMaster
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            <a className="text-sm hover:text-blue-600">Courses</a>
            <a className="text-sm hover:text-blue-600">Instructors</a>
            <a className="text-sm hover:text-blue-600">Pricing</a>
            <a className="text-sm hover:text-blue-600">About</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">

            {/* Search */}
            <div className="hidden md:flex items-center h-10 px-4 pl-2 rounded-r-lg bg-gray-100 border border-gray-200">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent outline-none ml-3 text-sm w-40"
              />
            </div>

            {/* Sign Up Modal Button */}
            <button
              onClick={() => {
                setIsLoginOpen(false);
                setIsSignupOpen(true);
              }}
              className="px-4 h-9 md:h-10 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition"
            >
              Sign Up
            </button>

            {/* Log In Modal Button */}
            <button
              onClick={() => {
                setIsSignupOpen(false);
                setIsLoginOpen(true);
              }}
              className="px-4 h-9 md:h-10 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300 transition"
            >
              Log In
            </button>

          </div>
        </div>
      </nav>

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}