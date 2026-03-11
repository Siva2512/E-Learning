"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function StudentCourse() {
  const [activeTab, setActiveTab] = useState("all");

  // Pull courses from Redux (same store where AddCourse dispatches to)
  const reduxCourses = useSelector((state) => state.courses.courses);

  // Map Redux courses to the shape this component needs
  const courses = reduxCourses.map((course) => ({
    id:       course.id,
    title:    course.title,
    category: course.category || "General",
    progress: course.progress  || 0,
    image:    course.image     || "/Featured1.png",
    status:   course.progress === 100 ? "completed" : "continue",
  }));

  const inProgressCount = courses.filter((c) => c.status !== "completed").length;
  const completedCount  = courses.filter((c) => c.status === "completed").length;

  const filteredCourses =
    activeTab === "all"       ? courses :
    activeTab === "completed" ? courses.filter((c) => c.status === "completed") :
                                courses.filter((c) => c.status !== "completed");

  return (
    <div className="space-y-6 p-6">

      
      {courses.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Enrolled", value: courses.length,  color: "text-blue-600",  bg: "bg-blue-50"  },
            { label: "In Progress",    value: inProgressCount, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Completed",      value: completedCount,  color: "text-green-600", bg: "bg-green-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs and Course Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex gap-8 border-b border-gray-200">
          {["all", "inprogress", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium relative ${
                activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "all" ? "All Courses" : tab === "inprogress" ? "In Progress" : "Completed"}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
              }`}>
                {tab === "all" ? courses.length : tab === "completed" ? completedCount : inProgressCount}
              </span>
              {activeTab === tab && (
                <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-blue-600 rounded" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">Sort by:</span>
          <button className="bg-gray-100 px-4 py-2 rounded-xl text-gray-700 font-medium hover:bg-gray-200">
            Recent Activity
          </button>
        </div>
      </div>

     
      {courses.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">📚</div>
          <p className="font-semibold text-gray-700 text-lg">No courses enrolled yet</p>
          <p className="text-sm text-gray-400 mt-1">Browse the catalog and enroll in your first course.</p>
          <Link href="/CourseDetails">
            <button className="mt-5 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
              Browse Courses
            </button>
          </Link>
        </div>
      )}

      
      {courses.length > 0 && filteredCourses.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="font-medium">No courses in this category yet.</p>
        </div>
      )}

      {/* Cards Grid */}
      {filteredCourses.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-40 w-full">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                  {course.category}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{course.title}</h3>

                <div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{course.status === "completed" ? "Completed" : "Progress"}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        course.status === "completed" ? "bg-green-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <button className={`w-full py-2 rounded-lg text-sm font-medium transition ${
                  course.status === "completed"
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}>
                  {course.status === "completed" ? "View Certificate" : "Continue Learning →"}
                </button>
              </div>
            </div>
          ))}

          {/* Discover Card */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 hover:border-blue-300 transition">
            <Link href="/CourseDetails">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3 hover:bg-blue-100 transition cursor-pointer">
                <span className="text-2xl text-blue-600 leading-none">+</span>
              </div>
            </Link>
            <h3 className="font-semibold text-gray-800">Discover New Skills</h3>
            <p className="text-sm text-gray-500 mt-1 mb-3">Explore our catalog of 500+ premium courses.</p>
            <Link href="/CourseDetails">
              <button className="text-blue-600 font-medium text-sm hover:underline">Browse Course Catalog</button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}