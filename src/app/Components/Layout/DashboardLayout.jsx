"use client";

import React, { useState } from "react";
import Topbar from "../Student/Topbar";
import Aside from "../Student/Aside";

export default function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Aside isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <Topbar setIsOpen={setIsOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}