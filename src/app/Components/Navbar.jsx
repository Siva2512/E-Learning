"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { GiStarShuriken } from "react-icons/gi";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-3 flex items-center gap-10">
      
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GiStarShuriken className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            EduMaster
          </span>
        </div>

        {/* Nav links → only large screens */}
        <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <a className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors" href="#">Courses</a>
          <a className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors" href="#">Instructors</a>
          <a className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors" href="#">Pricing</a>
          <a className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors" href="#">About</a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          
          {/* Search → md and above */}
          <div className="hidden md:flex items-center h-10 px-4 pl-2 rounded-r-lg bg-gray-100 border border-gray-200">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent outline-none ml-3 text-sm w-40 placeholder:text-gray-400"
            />
          </div>

          {/* Sign Up */}
          <button className="px-4 h-9 md:h-10 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition whitespace-nowrap">
  Sign Up
</button>

<button className="px-4 h-9 md:h-10 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300 transition whitespace-nowrap">
  Log In
</button>

        </div>

      </div>
    </nav>
  );
}
