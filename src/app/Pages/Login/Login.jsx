"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiAlertCircle } from "react-icons/fi";
import Snowfall from "react-snowfall";

export default function Login({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setErrorMessage("");

  try {

    const userData = {
      name: formData.email.split("@")[0], // create username
      email: formData.email,
      role: formData.role,
    };

    dispatch(login(userData));

    // Save user with name
    localStorage.setItem("user", JSON.stringify(userData));

    if (formData.role === "teacher") {
      router.push("/Teacher");
    } else {
      router.push("/Student");
    }

    onClose();

  } catch (error) {
    setErrorMessage("Login failed. Please check credentials.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Snowfall color="white" snowflakeCount={900} />

      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">

        <div
          className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 text-xl"
          >
            ✕
          </button>

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
            <p className="text-gray-400 mt-2">Login to access your account</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2">
              <FiAlertCircle className="text-red-400 mt-1" />
              <p className="text-red-300 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <div className="relative mt-1">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-gray-300 text-sm">Login as</label>
              <div className="relative mt-1">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-3 rounded-lg text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}