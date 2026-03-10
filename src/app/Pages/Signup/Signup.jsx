"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/authSlice";
import { FiMail, FiLock, FiUser, FiUserPlus, FiAlertCircle } from "react-icons/fi";

export default function Signup({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      // Save to Redux
      dispatch(signup(userData));

      // ✅ Save to localStorage (IMPORTANT for Navbar)
      localStorage.setItem("user", JSON.stringify(userData));

      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        onClose();
      }, 2000);

    } catch (error) {
      setErrorMessage("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">

      <div
        className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 text-xl"
        >
          ✕
        </button>

        {showMessage && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded text-center">
            Account Created Successfully!
          </div>
        )}

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Join our learning platform</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2">
            <FiAlertCircle className="text-red-400 mt-1" />
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <div className="relative mt-1">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter email"
                className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="Create password"
                className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm">Confirm Password</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm password"
                className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-gray-300 text-sm">Register as</label>
            <div className="relative mt-1">
              <FiUserPlus className="absolute left-3 top-3 text-gray-400" />
              <select
                name="role"
                className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-3 rounded-lg text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

      </div>
    </div>
  );
}