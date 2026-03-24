"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import { Star } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Featured() {
  const router  = useRouter();
  const courses = useSelector((state) => state.courses.courses);

  const [current,          setCurrent]          = useState(0);
  const [showLoginPrompt,  setShowLoginPrompt]  = useState(false);
  const [visible,          setVisible]          = useState(3);

  const total    = courses.length;
  const maxIndex = Math.max(0, total - visible);

  // ✅ Fix 1: update visible count based on screen width
  useEffect(() => {
    const update = () => {
      if      (window.innerWidth < 768)  setVisible(1); // mobile  → 1 card
      else if (window.innerWidth < 1024) setVisible(2); // tablet  → 2 cards
      else                               setVisible(3); // desktop → 3 cards
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ✅ Fix 2: auto-slide every 3s, respects current visible count
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  // ✅ Fix 3: reset current if resize makes it out of bounds
  useEffect(() => {
    if (current > maxIndex) setCurrent(0);
  }, [maxIndex, current]);

  const visibleCourses = courses.slice(current, current + visible);

  const handleEnroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const user = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
    if (!user) { setShowLoginPrompt(true); return; }
    router.push("/CourseDetails");
  };

  return (
    <>
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">🔒</div>
            <h2 className="text-xl font-bold text-gray-900">Login Required</h2>
            <p className="text-gray-500 text-sm mt-2">
              You need to be logged in to enroll in a course.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowLoginPrompt(false); router.push("/"); }}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Fix 4: px-4 on mobile, not px-20 */}
      <section className="bg-white py-16 max-w-7xl mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center  gap-12 lg:gap-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Featured Courses
              </h2>
              <p className="mt-2 text-gray-600">
                Hand-picked courses by our top-tier instructors.
              </p>
            </div>
            <Link href="/CourseDetails">
              <button className="flex items-center gap-2 text-blue-400 font-semibold cursor-pointer hover:underline">
                View all <FaArrowRight />
              </button>
            </Link>
          </div>

          {/* ✅ Fix 5: dynamic grid columns match visible count */}
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${visible}, minmax(0, 1fr))` }}
          >
            {visibleCourses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-100 flex flex-col rounded-2xl shadow-sm p-4 hover:shadow-md transition"
              >
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src={course.image || "/Featured1.png"}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-md shadow">
                    {course.level || course.category || "Course"}
                  </span>
                </div>

                <div className="mt-3 flex flex-col flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-500" />
                    <span className="font-semibold text-yellow-500">{course.rating}</span>
                    <span>({course.reviews} reviews)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold shrink-0">
                      {(course.instructor || "I").charAt(0)}
                    </div>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </div>

                  {/* Price + Enroll */}
                  <div className="border-t border-[#e0e0e0] mt-auto pt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      {Number(course.price) === 0
                        ? <span className="text-green-600">Free</span>
                        : `$${Number(course.price).toFixed(2)}`
                      }
                    </p>
                    <button
                      onClick={handleEnroll}
                      className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer transition"
                    >
                      Enroll Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          {total > visible && (
            <div className="flex justify-center gap-1.5 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
