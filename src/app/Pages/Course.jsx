"use client";

import Image from "next/image";
import { Star, Clock, BarChart, ChevronLeft, ChevronRight } from "lucide-react";
import { IoMenuSharp } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Course() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // 👉 Get courses from Redux store
  const courses = useSelector((state) => state.courses.courses);

  const coursesPerPage = 3;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const Filters = () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">CATEGORY</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["Web Development", "UI/UX Design", "Mobile Dev", "Data Science"].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <input type="checkbox" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">PRICE</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["Paid", "Free"].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <input type="checkbox" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">RATING</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["4.0", "3.0"].map((rating, i) => (
            <li key={i} className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {rating} & Up
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">LEVEL</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["Beginner", "Intermediate", "Expert"].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <input type="checkbox" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 min-h-screen py-17">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow-sm"
          >
            <IoMenuSharp className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 flex">
            <div className="w-72 bg-white p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <IoMenuSharp className="rotate-90" />
                </button>
              </div>
              <Filters />
            </div>
            <div className="flex-1" onClick={() => setShowFilters(false)} />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Desktop Filters */}
          <div className="hidden lg:block lg:w-72">
            <Filters />
          </div>

          {/* Course List */}
          <div className="flex-1 space-y-6">

            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition"
              >
                <div className="md:w-64 w-full rounded-xl overflow-hidden">
                  <Image
                    src={course.image || "/Featured1.png"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between gap-4">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        {course.title}
                      </h3>

                      <span className="text-blue-600 font-bold text-xl">
                        ${Number(course.price).toFixed(2)}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mt-2">{course.desc}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-8 rounded-full bg-gray-300" />
                      <span className="text-sm text-gray-600">
                        {course.instructor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-3 pt-4 border-t">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {course.rating || 4.5}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.hours} hrs
                    </span>

                    <span className="flex items-center gap-1">
                      <BarChart className="w-4 h-4" />
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-6">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="w-9 h-9 border rounded-md disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4 mx-auto" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-9 h-9 border rounded-md ${
                    currentPage === p ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="w-9 h-9 border rounded-md disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4 mx-auto" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}