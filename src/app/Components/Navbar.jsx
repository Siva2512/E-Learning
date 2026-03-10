"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { GiStarShuriken } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import LoginModal from "../Pages/Login/Login";
import SignupModal from "../Pages/Signup/Signup";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  // Check login from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Search function
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(`/CourseDetails?search=${search}`);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  // Get username
  const getUserName = () => {
    if (!user) return "";
    if (user.name) return user.name;
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

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

          {/* Nav Links */}
          {user && (
            <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">

              <Link href="/Student" className="text-sm hover:text-blue-600">
                Dashboard
              </Link>

              <Link href="/CourseDetails" className="text-sm hover:text-blue-600">
                Courses
              </Link>

              <Link href="/Pricing" className="text-sm hover:text-blue-600">
                Pricing
              </Link>

              <a href="#about" className="text-sm hover:text-blue-600">
                About
              </a>

            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3 ml-auto">

            {/* Search */}
            {user && (
              <div className="hidden md:flex items-center h-10 px-4 pl-2 rounded-lg bg-gray-100 border border-gray-200">

                <Search size={18} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                  className="bg-transparent outline-none ml-3 text-sm w-40"
                />

              </div>
            )}

            {/* Before Login */}
            {!user && (
              <>
                <button
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true);
                  }}
                  className="px-4 h-9 md:h-10 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition"
                >
                  Register
                </button>

                <button
                  onClick={() => {
                    setIsSignupOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="px-4 h-9 md:h-10 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300 transition"
                >
                  Login
                </button>
              </>
            )}

            {/* After Login */}
            {user && (
              <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">

                {/* Profile Circle */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold">
                  {getUserName().charAt(0).toUpperCase()}
                </div>

                {/* User Name */}
                <span className="text-sm font-medium">
                  {getUserName()}
                </span>

                {/* Logout */}
                <FiLogOut
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                />

              </div>
            )}

            {/* Mobile Menu */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold">Menu</span>

          <button onClick={() => setIsMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {user && (
          <div className="flex flex-col gap-5 p-6 text-gray-700 font-medium">

            <Link href="/Student" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>

            <Link href="/CourseDetails" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>

            <Link href="/Pricing" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>

            <button
              onClick={handleLogout}
              className="text-left text-red-500"
            >
              Logout
            </button>

          </div>
        )}
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Modals */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

    </>
  );
}