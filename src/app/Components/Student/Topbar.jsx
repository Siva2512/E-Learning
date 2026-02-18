"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <nav className="bg-white px-6 md:px-6 py-3 flex items-center justify-between shadow-sm">
      <h1 className="text-lg font-semibold text-gray-900">Student Dashboard</h1>

      <div className="flex items-center gap-4">
  
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-40"
          />
        </div>
      </div>
    </nav>
  );
}
