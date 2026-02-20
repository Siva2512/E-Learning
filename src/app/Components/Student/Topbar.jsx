"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  const titles = {
    "/Student": "Student Dashboard",
    "/Student/StudentCourse": "My Courses",
    "/Student/Assignments": "Assignments",
    "/Student/Messages": "Messages",
    "/Student/Settings": "Settings",
  };

  const pageTitle = titles[pathname] || "Student Dashboard";

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 px-6 py-3
      flex items-center justify-between"
    >
      <h1 className="text-lg font-semibold text-gray-900">
        {pageTitle}
      </h1>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

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
