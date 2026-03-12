"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart2,
  PlusCircle,
  MessageSquare,
  Settings,
  LogOut,
  GraduationCap,
  X,
  Menu,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Courses", icon: BookOpen },
  { label: "Students", icon: Users },
  { label: "Analytics", icon: BarChart2 },
  { label: "Add Course", icon: PlusCircle },
  { label: "Messages", icon: MessageSquare },
  { label: "Settings", icon: Settings },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "A";

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <GraduationCap className="text-white w-4 h-4" />
          </div>

          <span className="font-bold text-gray-900 text-lg">
            AdminBoard
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">

        {navItems.map(({ label, icon: Icon }) => {
          const active = activeItem === label;

          return (
            <button
              key={label}
              onClick={() => setActiveItem(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  active ? "text-indigo-600" : "text-gray-400"
                }`}
              />

              {label}

              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="px-4 py-4 border-t border-gray-100 mt-auto">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {user.name || "Admin"}
            </p>

            <p className="text-xs text-gray-400 truncate">
              {user.email || ""}
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-100"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 shadow-sm fixed top-0 left-0">
        <SidebarContent />
      </aside>
    </>
  );
}