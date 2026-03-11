"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Star, Clock, BarChart, ChevronLeft, ChevronRight, PlayCircle, CheckCircle, ChevronDown, X } from "lucide-react";
import { IoMenuSharp } from "react-icons/io5";
import { FaRegClock, FaGlobe, FaAward, FaInfinity, FaHeadphonesAlt, FaDownload, FaLaptop } from "react-icons/fa";

// CourseInfo Slide Panel 
function CourseInfoPanel({ course, onClose }) {
  const [openSection, setOpenSection] = useState(0);
  if (!course) return null;

  const price     = Number(course.price) || 0;
  const origPrice = Number(course.originalPrice) || 0;
  const discount  = origPrice > 0 ? Math.round((1 - price / origPrice) * 100) : 0;

  const curriculum = course.curriculum || [
    { title: "Introduction & Setup",        meta: "5 lessons • 1h 00m", lessons: [{ name: "Course Overview", time: "05:00" }, { name: "Environment Setup", time: "12:00" }] },
    { title: "Core Concepts",               meta: "8 lessons • 2h 30m", lessons: [] },
    { title: "Advanced Topics",             meta: "10 lessons • 3h 00m", lessons: [] },
    { title: "Projects & Practice",         meta: "6 lessons • 2h 00m", lessons: [] },
    { title: "Final Capstone Project",      meta: "4 lessons • 1h 30m", lessons: [] },
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
        @keyframes slideInPanel {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl z-10"
        style={{ animation: "slideInPanel 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        
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

        
        <div className="bg-[#f5f6f7] py-6">
          <div className="px-8 grid lg:grid-cols-3 gap-10">

            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Description</h2>
                <div className="text-gray-600 leading-relaxed space-y-4">
                  <p>{course.fullDescription || course.desc || "This course is designed to take you from beginner to professional level. You will work on real-world projects and gain the skills needed to succeed in the industry."}</p>
                  <p>{course.fullDescription2 || "By the end of this course, you will have the confidence and competence to apply these skills in any professional setting."}</p>
                </div>
              </div>

              {/* What you'll learn */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">What you'll learn</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {learns.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curriculum */}
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
                          <p className="font-medium text-gray-900">{section.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{section.meta}</p>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openSection === i ? "rotate-180" : ""}`} />
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
                  src={course.image || "/Featured1.png"}
                  alt={course.title}
                  width={400}
                  height={250}
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
                <button className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                  {price === 0 ? "Enroll for Free" : "Enroll Now"}
                </button>
                <button className="w-full mt-3 bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                  Add to Cart
                </button>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">WHAT'S INCLUDED:</h4>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-center gap-3"><FaAward    className="text-gray-600 w-4 h-4" />Certificate of completion</li>
                  <li className="flex items-center gap-3"><FaInfinity  className="text-gray-600 w-4 h-4" />Lifetime access to course materials</li>
                  <li className="flex items-center gap-3"><FaHeadphonesAlt className="text-gray-600 w-4 h-4" />24/7 Premium support</li>
                  <li className="flex items-center gap-3"><FaDownload  className="text-gray-600 w-4 h-4" />15+ Downloadable resources</li>
                  <li className="flex items-center gap-3"><FaLaptop   className="text-gray-600 w-4 h-4" />Access on mobile and TV</li>
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

// Main Course Page
export default function Course() {
  const [currentPage, setCurrentPage]   = useState(1);
  const [showFilters, setShowFilters]   = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Filter state
  const [selCategories, setSelCategories] = useState([]);
  const [selPrice,      setSelPrice]      = useState([]);
  const [selRatings,    setSelRatings]    = useState([]);
  const [selLevels,     setSelLevels]     = useState([]);

  // Get courses from Redux
  const courses = useSelector((state) => state.courses.courses);

  const toggle = (setter, list, value) =>
    setter(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);

  const anyFilter = selCategories.length || selPrice.length || selRatings.length || selLevels.length;

  // Apply filters
  const filtered = courses.filter((c) => {
    if (selCategories.length && !selCategories.includes(c.category)) return false;
    if (selPrice.includes("free") && !selPrice.includes("paid") && Number(c.price) !== 0) return false;
    if (selPrice.includes("paid") && !selPrice.includes("free") && Number(c.price) === 0) return false;
    if (selRatings.length && (c.rating || 4.5) < Math.min(...selRatings.map(Number))) return false;
    if (selLevels.length && !selLevels.includes(c.level)) return false;
    return true;
  });

  // Pagination on filtered results
  const coursesPerPage    = 3;
  const indexOfLast       = currentPage * coursesPerPage;
  const indexOfFirst      = indexOfLast - coursesPerPage;
  const currentCourses    = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages        = Math.ceil(filtered.length / coursesPerPage);

  // Reset to page 1 when filters change
  const handleToggle = (setter, list, value) => {
    toggle(setter, list, value);
    setCurrentPage(1);
  };

  //  Filters UI (reused for desktop + mobile)
  const FiltersUI = () => (
    <div className="space-y-8">

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">CATEGORY</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["Web Development", "UI/UX Design", "Mobile Dev", "Data Science"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selCategories.includes(item)}
                onChange={() => handleToggle(setSelCategories, selCategories, item)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">PRICE</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["Paid", "Free"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selPrice.includes(item.toLowerCase())}
                onChange={() => handleToggle(setSelPrice, selPrice, item.toLowerCase())}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">RATING</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["4.0", "3.0"].map((rating) => (
            <li key={rating} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selRatings.includes(rating)}
                onChange={() => handleToggle(setSelRatings, selRatings, rating)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
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
          {["Beginner", "Intermediate", "Expert"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selLevels.includes(item)}
                onChange={() => handleToggle(setSelLevels, selLevels, item)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {anyFilter ? (
        <button
          onClick={() => { setSelCategories([]); setSelPrice([]); setSelRatings([]); setSelLevels([]); setCurrentPage(1); }}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Clear all filters
        </button>
      ) : null}

    </div>
  );

  return (
    <>
      {/* CourseInfo Panel */}
      {selectedCourse && (
        <CourseInfoPanel
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      <section className="bg-gray-50 min-h-screen pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow-sm"
            >
              <IoMenuSharp className="w-4 h-4" />
              <span className="text-sm">Filters</span>
              {anyFilter ? <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-1.5">{Number(selCategories.length) + Number(selPrice.length) + Number(selRatings.length) + Number(selLevels.length)}</span> : null}
            </button>
          </div>

          {/* Mobile Filters Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-black/40 flex">
              <div className="w-72 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FiltersUI />
              </div>
              <div className="flex-1" onClick={() => setShowFilters(false)} />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-10">

            {/* Desktop Filters */}
            <div className="hidden lg:block lg:w-72">
              <FiltersUI />
            </div>

            {/* Course List */}
            <div className="flex-1 space-y-6">

              {/* Result count */}
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
              </p>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="text-center py-24 text-gray-400">
                  <p className="text-lg font-medium">No courses match your filters</p>
                  <p className="text-sm mt-1">Try adjusting or clearing your filters</p>
                </div>
              )}

              {/* Course Cards */}
              {currentCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition cursor-pointer hover:border-blue-200 border border-transparent"
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
                        <span className="text-blue-600 font-bold text-xl shrink-0">
                          ${Number(course.price).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm mt-2">{course.desc || course.description}</p>

                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                          {(course.instructor || "I").charAt(0)}
                        </div>
                        <span className="text-sm text-gray-600">{course.instructor}</span>
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
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="w-9 h-9 border rounded-md disabled:opacity-40 hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4 mx-auto" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 border rounded-md ${currentPage === p ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"}`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="w-9 h-9 border rounded-md disabled:opacity-40 hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}