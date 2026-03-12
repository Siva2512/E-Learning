"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/authSlice";
import { FiMail, FiLock, FiUser, FiUserPlus, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import Snowfall from "react-snowfall";

export default function Signup({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [loading,      setLoading]      = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage,  setShowMessage]  = useState(false);
  const [formData,     setFormData]     = useState({
    name: "", email: "", password: "", confirmPassword: "", role: "student",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        name:     formData.name,
        email:    formData.email,
        password: formData.password,
        role:     formData.role,        
      };

      dispatch(signup(userData));
      localStorage.setItem("user", JSON.stringify(userData));

      setShowMessage(true);
      setTimeout(() => { setShowMessage(false); onClose(); }, 2000);
    } catch (error) {
      setErrorMessage("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none">
        <Snowfall color="#c7d2fe" snowflakeCount={120} />
      </div>

      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />

          <div className="p-8">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 text-xl transition"
            >
              ✕
            </button>

            {/* Success */}
            {showMessage && (
              <div className="mb-5 p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2">
                <FiCheckCircle className="text-green-500 shrink-0" />
                <p className="text-green-700 text-sm font-medium">Account Created Successfully!</p>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-7">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUserPlus className="text-indigo-600 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-400 text-sm mt-1">Join our learning platform</p>
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl flex gap-2">
                <FiAlertCircle className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Full Name</label>
                <div className="relative mt-1.5">
                  <FiUser className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text" name="name" required
                    placeholder="Enter your name" onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Email</label>
                <div className="relative mt-1.5">
                  <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="email" name="email" required
                    placeholder="Enter email" onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Password</label>
                <div className="relative mt-1.5">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="password" name="password" required
                    placeholder="Create password" onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Confirm Password</label>
                <div className="relative mt-1.5">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="password" name="confirmPassword" required
                    placeholder="Confirm password" onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>

             
              <div>
                <label className="text-gray-600 text-sm font-medium">Register as</label>
                <div className="flex gap-2 mt-1.5">
                  {[
                    { label: "Student", value: "student" },
                    { label: "Admin",   value: "admin"   },
                  ].map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: value })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                        formData.role === value
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-2.5 rounded-xl text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition text-sm mt-2 shadow-sm"
              >
                {loading ? "Creating account..." : "Register"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
