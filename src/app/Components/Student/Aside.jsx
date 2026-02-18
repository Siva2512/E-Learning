"use client";

import Image from "next/image";
import { FaHome, FaBook, FaClipboardList, FaEnvelope, FaCog } from "react-icons/fa";
import { GiStarShuriken } from "react-icons/gi";

export default function Aside() {
  return (
    <aside className="hidden md:flex w-64 bg-white p-5 flex-col justify-between ">

      {/* Top */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <GiStarShuriken className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">EduMaster</h2>
        </div>

        <nav className="space-y-2 text-sm">
          <div className="flex items-center gap-3 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg font-medium">
            <FaHome /> Dashboard
          </div>

          <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FaBook /> My Courses
          </div>

          <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FaClipboardList /> Assignments
          </div>

          <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FaEnvelope /> Messages
          </div>

          <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FaCog /> Settings
          </div>
        </nav>
      </div>

      
      <div className="flex items-center gap-3 pt-4 ">
        <Image
          src="/Featured2.png"
          alt="Alex Johnson"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium">Alex Johnson</p>
          <p className="text-xs text-gray-500">Premium Member</p>
        </div>
      </div>
    </aside>
  );
}
