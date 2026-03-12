"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiCamera, FiShield, FiBell, FiAlertCircle } from "react-icons/fi";

export default function Settings() {
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [avatar, setAvatar]     = useState(null);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  // ✅ Load user data from localStorage (set during signup/login)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setFormData((prev) => ({
      ...prev,
      name:  user.name  || "",
      email: user.email || "",
    }));
    if (user.avatar) setAvatar(user.avatar);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // ✅ Handle avatar image upload (convert to base64 for localStorage)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ Read existing user, merge updated fields, save back
    const existing = JSON.parse(localStorage.getItem("user") || "{}");
    const updated  = {
      ...existing,
      name:   formData.name,
      email:  formData.email,
      avatar: avatar || existing.avatar,
      ...(formData.password ? { password: formData.password } : {}),
    };
    localStorage.setItem("user", JSON.stringify(updated));

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};
  const initials = formData.name ? formData.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U";

  // ✅ Block teachers — this page is for students only
  if (user.role === "teacher") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-sm">
          <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShield className="text-indigo-500 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Teacher Account</h2>
          <p className="text-gray-400 text-sm mt-2">
            Settings for teacher accounts are managed from the Teacher Dashboard.
          </p>
          <a href="/Teacher" className="inline-block mt-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-purple-600 transition">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile",  label: "Profile",   icon: FiUser    },
    { id: "security", label: "Security",  icon: FiShield  },
    // { id: "notifications", label: "Notifications", icon: FiBell },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage your account preferences</p>
        </div>

        {/* Profile Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-indigo-600">{initials}</span>
              )}
            </div>
            <button
              onClick={() => fileRef.current.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-700 transition"
            >
              <FiCamera className="text-white w-3.5 h-3.5" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          <div>
            <p className="font-semibold text-gray-900 text-lg">{formData.name || "Your Name"}</p>
            <p className="text-gray-400 text-sm">{formData.email || "your@email.com"}</p>
            <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
              user.role === "teacher"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-blue-100 text-blue-700"
            }`}>
              {user.role || "student"}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* ── Profile Tab ── */}
          {activeTab === "profile" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-semibold text-gray-800 text-base mb-4">Personal Information</h3>

              {saved && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 shrink-0" />
                  <p className="text-green-700 text-sm font-medium">Changes saved successfully!</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                  <FiAlertCircle className="text-red-500 shrink-0" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Full Name</label>
                <div className="relative mt-1.5">
                  <FiUser className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Email Address</label>
                <div className="relative mt-1.5">
                  <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>



              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-7 py-2.5 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition text-sm shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* ── Security Tab ── */}
          {activeTab === "security" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-semibold text-gray-800 text-base mb-4">Change Password</h3>

              {saved && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 shrink-0" />
                  <p className="text-green-700 text-sm font-medium">Password updated!</p>
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                  <FiAlertCircle className="text-red-500 shrink-0" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="text-gray-600 text-sm font-medium">New Password</label>
                <div className="relative mt-1.5">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">Confirm New Password</label>
                <div className="relative mt-1.5">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-7 py-2.5 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition text-sm shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}

          {/* ── Notifications Tab ──
          {activeTab === "notifications" && (
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-800 text-base mb-4">Notification Preferences</h3>
              {[
                { label: "Course Updates",        desc: "Get notified when a course you enrolled in is updated" },
                { label: "New Messages",           desc: "Receive notifications for new messages"              },
                { label: "Promotional Emails",     desc: "Deals, discounts and platform announcements"         },
                { label: "Assignment Reminders",   desc: "Reminders for upcoming deadlines"                    },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
          )} */}

        </div>
      </div>
    </div>
  );
}