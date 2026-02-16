"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, PlayCircle, CheckCircle, ChevronDown } from "lucide-react";
import { FaRegClock, FaGlobe,FaAward, FaInfinity, FaHeadphonesAlt, FaDownload, FaLaptop  } from "react-icons/fa";


export default function CourseInfo() {
  const [openSection, setOpenSection] = useState(0);

  const curriculum = [
    {
      title: "Introduction to Modern Architecture",
      meta: "8 lessons • 1h 20m",
      lessons: [
        { name: "Setting up the Dev Environment", time: "12:45" },
        { name: "Monolith vs Microservices", time: "18:20" },
        { name: "Infrastructure Overview", time: "15:10" },
      ],
    },
    {
      title: "Deep Dive: Advanced React",
      meta: "12 lessons • 3h 15m",
      lessons: [],
    },
    {
      title: "Back-end Excellence with Node.js",
      meta: "10 lessons • 2h 45m",
      lessons: [],
    },
    {
      title: "Deployment & CI/CD Pipelines",
      meta: "9 lessons • 2h 10m",
      lessons: [],
    },
    {
      title: "Final Capstone Project",
      meta: "9 lessons • 3h 15m",
      lessons: [],
    },
  ];

  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-10 pb-2">

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
              BESTSELLER
            </span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>4.8 (1,240 ratings)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Advanced Web Development: Mastery Course
          </h1>

          <p className="text-gray-600 mt-3 max-w-3xl">
            Master modern frontend architectures, deep-dive into React
            performance, and build scalable backend systems with Node.js and
            TypeScript.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div className="flex items-center gap-3">
              <Image
                src="/Featured1.png"
                alt="John Doe"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-sm">
                <p className="text-gray-500">Instructor</p>
                <p className="font-medium text-gray-900">John Doe</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaRegClock className="text-gray-400 w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-900">October 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaGlobe className="text-gray-400 w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-500">Language</p>
                <p className="font-medium text-gray-900">English (US)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <div className="bg-[#f5f6f7] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 grid lg:grid-cols-3 gap-10">

          {/* Left Content */}
          <div className="lg:col-span-2 ">

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This comprehensive course is designed for web developers who want to bridge the gap
                between intermediate knowledge and professional-grade architectural mastery. We don't just
                teach syntax; we focus on the "why" behind the most successful software patterns used at scale
                today.
                <br />
                You will build a full-scale Enterprise Application from scratch, implementing features
                like real-time synchronization, advanced state management, and robust CI/CD pipelines.
                By the end of this journey, you'll be comfortable navigating complex codebases and leading technical decisions.
              </p>
            </div>


            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                What you'll learn
              </h3>

              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Advanced React Hooks & Performance",
                  "Microservices Architecture with Node.js",
                  "TypeScript for Large Applications",
                  "Database Design & Query Tuning",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Curriculum
              </h2>

              <div className="space-y-3">
                {curriculum.map((section, i) => (
                  <div key={i} className="bg-white rounded-xl">

                    <button
                      onClick={() => setOpenSection(openSection === i ? -1 : i)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{section.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{section.meta}</p>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 transition ${
                          openSection === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openSection === i && section.lessons.length > 0 && (
                      <ul className="px-4 pb-4 space-y-3 text-sm text-gray-600">
                        {section.lessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <PlayCircle className="w-4 h-4" />
                              {lesson.name}
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

          {/* Right Sidebar */}
          <div className="bg-white rounded-2xl shadow p-5 h-fit">
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/Featured1.png"
                alt="course"
                width={400}
                height={250}
                className="w-full"
              />
            </div>

            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">$89.00</p>

              <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                Enroll Now
              </button>

              <button className="w-full mt-3 border py-3 rounded-lg font-medium">
                Add to Cart
              </button>
            </div>

            
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
                WHAT'S INCLUDED:
              </h4>

              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-center gap-3">
                  <FaAward className="text-gray-600 w-4 h-4" />
                  Certificate of completion
                </li>

                <li className="flex items-center gap-3">
                  <FaInfinity className="text-gray-600 w-4 h-4" />
                  Lifetime access to course materials
                </li>

                <li className="flex items-center gap-3">
                  <FaHeadphonesAlt className="text-gray-600 w-4 h-4" />
                  24/7 Premium support
                </li>

                <li className="flex items-center gap-3">
                  <FaDownload className="text-gray-600 w-4 h-4" />
                  15+ Downloadable resources
                </li>

                <li className="flex items-center gap-3">
                  <FaLaptop className="text-gray-600 w-4 h-4" />
                  Access on mobile and TV
                </li>
              </ul>

              <div className="border-t mt-6 pt-4 text-center">
                <p className="text-xs text-gray-500">30-Day Money-Back Guarantee</p>
                <p className="text-sm text-blue-600 font-medium mt-1">
                  Refer a friend & get 10% off
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
