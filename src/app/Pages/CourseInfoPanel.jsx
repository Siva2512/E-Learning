"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Star, PlayCircle, CheckCircle, ChevronDown, X,
} from "lucide-react";
import {
  FaRegClock, FaGlobe, FaAward, FaInfinity,
  FaHeadphonesAlt, FaDownload, FaLaptop,
} from "react-icons/fa";

// ── Accepts onEnroll + onAddToCart props ──────────────────────────
export default function CourseInfoPanel({ course, onClose, onEnroll, onAddToCart }) {
  const [openSection, setOpenSection] = useState(0);
  if (!course) return null;

  const price     = Number(course.price) || 0;
  const origPrice = Number(course.originalPrice) || 0;
  const discount  = origPrice > 0 ? Math.round((1 - price / origPrice) * 100) : 0;

  const curriculum = course.curriculum || [
    { title: "Introduction & Setup",   meta: "5 lessons · 1h 00m", lessons: [{ name: "Course Overview", time: "05:00" }, { name: "Environment Setup", time: "12:00" }] },
    { title: "Core Concepts",          meta: "8 lessons · 2h 30m", lessons: [] },
    { title: "Advanced Topics",        meta: "10 lessons · 3h 00m", lessons: [] },
    { title: "Projects & Practice",    meta: "6 lessons · 2h 00m", lessons: [] },
    { title: "Final Capstone Project", meta: "4 lessons · 1h 30m", lessons: [] },
  ];

  const learns = course.learns || [
    "Core fundamentals & best practices",
    "Real-world project experience",
    "Industry-standard tools & workflows",
    "Problem-solving techniques",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInPanel { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}} />
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl z-10"
        style={{ animation: "slideInPanel 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-white px-8 pt-10 pb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">BESTSELLER</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{course.rating || 4.5} (1,240 ratings)</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm">{course.desc || course.description}</p>
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {(course.instructor || "I").charAt(0)}
              </div>
              <div className="text-sm">
                <p className="text-gray-500">Instructor</p>
                <p className="font-bold text-gray-900">{course.instructor || "Instructor"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaRegClock className="text-gray-400 w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-500">Duration</p>
                <p className="font-bold text-gray-900">{course.hours || "—"} hrs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaGlobe className="text-gray-400 w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-500">Language</p>
                <p className="font-bold text-gray-900">English (US)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-[#f5f6f7] py-6">
          <div className="px-8 grid lg:grid-cols-3 gap-10">

            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Description</h2>
                <div className="text-gray-600 leading-relaxed space-y-4 text-sm">
                  <p>{course.fullDescription || course.desc || "This course is designed to take you from beginner to professional level."}</p>
                  <p>{course.fullDescription2 || "By the end, you will have the confidence to apply these skills in any professional setting."}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">What you'll learn</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {learns.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Curriculum</h2>
                <div className="space-y-3">
                  {curriculum.map((section, i) => (
                    <div key={i} className="bg-white rounded-xl">
                      <button
                        onClick={() => setOpenSection(openSection === i ? -1 : i)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{section.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{section.meta}</p>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openSection === i ? "rotate-180" : ""}`} />
                      </button>
                      {openSection === i && section.lessons.length > 0 && (
                        <ul className="px-4 pb-4 space-y-3 text-sm text-gray-600">
                          {section.lessons.map((lesson, idx) => (
                            <li key={idx} className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <PlayCircle className="w-4 h-4" />{lesson.name}
                              </span>
                              <span className="text-xs text-gray-500">{lesson.time}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="bg-white rounded-2xl shadow p-5 h-fit">
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src={course.image || "/Featured1.png"}
                  alt={course.title}
                  width={400} height={250}
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-4">
                {price === 0 ? (
                  <p className="text-2xl font-bold text-green-600">Free</p>
                ) : (
                  <div className="flex items-end gap-3">
                    <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
                    {origPrice > 0 && <p className="text-gray-400 line-through text-lg">${origPrice.toFixed(2)}</p>}
                    {discount > 0 && <p className="text-green-600 font-semibold text-sm">{discount}% OFF</p>}
                  </div>
                )}

                {/* ✅ Wired enroll button */}
                <button
                  onClick={onEnroll}
                  className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                >
                  {price === 0 ? "Enroll for Free" : "Enroll Now"}
                </button>

                {/* ✅ Wired add to cart button */}
                <button
                  onClick={onAddToCart}
                  className="w-full mt-3 bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">WHAT'S INCLUDED:</h4>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-center gap-3"><FaAward        className="text-gray-600 w-4 h-4" />Certificate of completion</li>
                  <li className="flex items-center gap-3"><FaInfinity     className="text-gray-600 w-4 h-4" />Lifetime access</li>
                  <li className="flex items-center gap-3"><FaHeadphonesAlt className="text-gray-600 w-4 h-4" />24/7 Premium support</li>
                  <li className="flex items-center gap-3"><FaDownload     className="text-gray-600 w-4 h-4" />15+ Downloadable resources</li>
                  <li className="flex items-center gap-3"><FaLaptop       className="text-gray-600 w-4 h-4" />Access on mobile and TV</li>
                </ul>
                <div className="border-t border-[#e0e0e0] mt-6 pt-4 text-center">
                  <p className="text-xs text-gray-500">30-Day Money-Back Guarantee</p>
                  <p className="text-sm text-blue-600 font-medium mt-1">Refer a friend & get 10% off</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
