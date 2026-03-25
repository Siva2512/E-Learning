"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import { clearEnrolledCourses } from "@/redux/courseSlice";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiAlertCircle } from "react-icons/fi";
import Snowfall from "react-snowfall";

export default function Login({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const router   = useRouter();

  const [loading,      setLoading]      = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData,     setFormData]     = useState({ email: "", password: "", role: "student" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      //  Check against allUsers array that supports multiple accounts
      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

      const matched = allUsers.find(
        (u) =>
          u.email    === formData.email    &&
          u.password === formData.password &&
          u.role     === formData.role
      );

      if (!matched) {
        // Fallback: check single "user" key (older signups)
        const singleUser = JSON.parse(localStorage.getItem("user") || "null");
        if (
          !singleUser ||
          singleUser.email    !== formData.email    ||
          singleUser.password !== formData.password ||
          singleUser.role     !== formData.role
        ) {
          setErrorMessage("Invalid email, password, or role. Please check and try again.");
          setLoading(false);
          return;
        }
        // migrate old user into allUsers
        allUsers.push(singleUser);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
      }

      const user = matched || JSON.parse(localStorage.getItem("user"));

      dispatch(login(user));

      // Set current active user
      localStorage.setItem("user", JSON.stringify(user));

      // Log student activity
      if (user.role === "student") {
        const existing = JSON.parse(localStorage.getItem("studentActivity") || "[]");
        const entry = {
          name:   user.name,
          email:  user.email,
          action: "Logged in",
          date:   new Date().toLocaleDateString([], { month: "short", day: "numeric" }),
          time:   new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        localStorage.setItem("studentActivity", JSON.stringify([entry, ...existing].slice(0, 20)));
      }

      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/Student");
      }

      onClose();
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />

          <div className="p-8">
            <button onClick={onClose} className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 text-xl transition">✕</button>

            <div className="text-center mb-7">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUser className="text-indigo-600 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
              <p className="text-gray-400 text-sm mt-1">Login to access your account</p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl flex gap-2">
                <FiAlertCircle className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-gray-600 text-sm font-medium">Email</label>
                <div className="relative mt-1.5">
                  <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition" />
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">Password</label>
                <div className="relative mt-1.5">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                  <input type="password" name="password" required value={formData.password} onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition" />
                </div>
              </div>

              {/* Role selector */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Login as</label>
                <div className="flex gap-2 mt-1.5">
                  {[
                    { label: "Student", value: "student" },
                    { label: "Admin",   value: "admin"   },
                  ].map(({ label, value }) => (
                    <button key={value} type="button"
                      onClick={() => setFormData({ ...formData, role: value })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                        formData.role === value
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-2.5 rounded-xl text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition text-sm mt-2 shadow-sm">
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
