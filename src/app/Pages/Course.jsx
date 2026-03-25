"use client";

import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { enrollCourse } from "@/redux/courseSlice";

import {
  Star, Clock, BarChart, ChevronLeft, ChevronRight,
  PlayCircle, CheckCircle, X, ShoppingCart,
} from "lucide-react";

import { IoMenuSharp } from "react-icons/io5";
import CoursePlayer    from "./CoursePlayer";
import CourseInfoPanel from "./CourseInfoPanel";

// enroll success modal
function EnrollSuccessModal({ course, onStart, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Enrolled!</h2>
        <p className="text-gray-500 text-sm mt-2">
          You're now enrolled in <span className="font-semibold text-gray-800">{course?.title}</span>.
        </p>
        <button
          onClick={onStart}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-5 h-5" /> Start Learning
        </button>
        <button onClick={onClose} className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition">
          Maybe later
        </button>
      </div>
    </div>
  );
}

// cart toast
function CartToast({ course, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 flex items-center gap-4 max-w-xs">
      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
        <ShoppingCart className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">Added to Cart</p>
        <p className="text-xs text-gray-400 truncate">{course?.title}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Main Course Page 
export default function Course() {
  const dispatch = useDispatch();
  const router   = useRouter();
  const courses  = useSelector((state) => state.courses.courses);

  const [currentPage,    setCurrentPage]    = useState(1);
  const [showFilters,    setShowFilters]    = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [playingCourse,  setPlayingCourse]  = useState(null);
  const [cartCourse,     setCartCourse]     = useState(null);
  const [cartItems,      setCartItems]      = useState([]);

  // Filter state
  const [selCategories, setSelCategories] = useState([]);
  const [selPrice,      setSelPrice]      = useState([]);
  const [selRatings,    setSelRatings]    = useState([]);
  const [selLevels,     setSelLevels]     = useState([]);

  const toggle = (setter, list, value) =>
    setter(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);

  const anyFilter = selCategories.length || selPrice.length || selRatings.length || selLevels.length;

  const filtered = courses.filter((c) => {
    if (selCategories.length && !selCategories.includes(c.category)) return false;
    if (selPrice.includes("free") && !selPrice.includes("paid") && Number(c.price) !== 0) return false;
    if (selPrice.includes("paid") && !selPrice.includes("free") && Number(c.price) === 0) return false;
    if (selRatings.length && (c.rating || 4.5) < Math.min(...selRatings.map(Number))) return false;
    if (selLevels.length && !selLevels.includes(c.level)) return false;
    return true;
  });

  const coursesPerPage = 3;
  const currentCourses = filtered.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);
  const totalPages     = Math.ceil(filtered.length / coursesPerPage);

  const handleToggle = (setter, list, value) => { toggle(setter, list, value); setCurrentPage(1); };

  //  Enroll — dispatch to Redux + save to localStorage + notify dashboard
  const handleEnroll = (course) => {
    dispatch(enrollCourse(course));

    // Immediately save to per-user localStorage so Dashboard picks it up
    const user = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
    if (user.email) {
      const key     = `enrolledCourses_${user.email}`;
      const saved   = JSON.parse(localStorage.getItem(key) || "[]");
      const already = saved.find((c) => c.id === course.id);
      if (!already) {
        saved.push({
          id:           course.id,
          title:        course.title,
          instructor:   course.instructor,
          image:        course.image,
          hours:        course.hours,
          level:        course.level,
          progress:     0,
          lastAccessed: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(saved));
      }
      
      window.dispatchEvent(new StorageEvent("storage", { key }));
    }

    setSelectedCourse(null);
    setEnrolledCourse(course);
  };

  const handleAddToCart = (course) => {
    setCartItems((prev) => prev.find((c) => c.id === course.id) ? prev : [...prev, course]);
    setCartCourse(course);
    setSelectedCourse(null);
    setTimeout(() => setCartCourse(null), 3500);
  };

  if (playingCourse) {
    return <CoursePlayer course={playingCourse} onBack={() => setPlayingCourse(null)} />;
  }

  const FiltersUI = () => (
    <div className="space-y-8">
      {[
        { label: "CATEGORY", list: selCategories, setter: setSelCategories, options: ["Web Development", "UI/UX Design", "Mobile Dev", "Data Science"] },
        { label: "LEVEL",    list: selLevels,     setter: setSelLevels,     options: ["Beginner", "Intermediate", "Expert"] },
      ].map(({ label, list, setter, options }) => (
        <div key={label}>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">{label}</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            {options.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <input type="checkbox" checked={list.includes(item)}
                  onChange={() => handleToggle(setter, list, item)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">PRICE</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          {["Paid", "Free"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <input type="checkbox" checked={selPrice.includes(item.toLowerCase())}
                onChange={() => handleToggle(setSelPrice, selPrice, item.toLowerCase())}
                className="w-4 h-4 accent-blue-600 cursor-pointer" />
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
              <input type="checkbox" checked={selRatings.includes(rating)}
                onChange={() => handleToggle(setSelRatings, selRatings, rating)}
                className="w-4 h-4 accent-blue-600 cursor-pointer" />
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{rating} & Up
              </span>
            </li>
          ))}
        </ul>
      </div>

      {anyFilter && (
        <button onClick={() => { setSelCategories([]); setSelPrice([]); setSelRatings([]); setSelLevels([]); setCurrentPage(1); }}
          className="text-sm text-blue-600 hover:underline font-medium">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Enroll Modal */}
      {enrolledCourse && (
        <EnrollSuccessModal
          course={enrolledCourse}
          onStart={() => { setPlayingCourse(enrolledCourse); setEnrolledCourse(null); }}
          onClose={() => setEnrolledCourse(null)}
        />
      )}

      {/* Cart Toast */}
      {cartCourse && <CartToast course={cartCourse} onClose={() => setCartCourse(null)} />}

      {/* Course Info Panel */}
      {selectedCourse && (
        <CourseInfoPanel
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={() => handleEnroll(selectedCourse)}
          onAddToCart={() => handleAddToCart(selectedCourse)}
        />
      )}

      <section className="bg-gray-50 min-h-screen pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

          {/* Cart indicator */}
          {cartItems.length > 0 && (
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-2.5 w-fit shadow-sm">
              <ShoppingCart className="w-4 h-4 text-indigo-600" />
              <span><span className="font-semibold text-indigo-600">{cartItems.length}</span> item{cartItems.length > 1 ? "s" : ""} in cart</span>
            </div>
          )}

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow-sm">
              <IoMenuSharp className="w-4 h-4" />
              <span className="text-sm">Filters</span>
              {anyFilter ? (
                <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-1.5">
                  {selCategories.length + selPrice.length + selRatings.length + selLevels.length}
                </span>
              ) : null}
            </button>
          </div>

          {/* Mobile Filters Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-black/40 flex">
              <div className="w-72 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
                </div>
                <FiltersUI />
              </div>
              <div className="flex-1" onClick={() => setShowFilters(false)} />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="hidden lg:block lg:w-72"><FiltersUI /></div>

            <div className="flex-1 space-y-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
              </p>

              {filtered.length === 0 && (
                <div className="text-center py-24 text-gray-400">
                  <p className="text-lg font-medium">No courses match your filters</p>
                  <p className="text-sm mt-1">Try adjusting or clearing your filters</p>
                </div>
              )}

              {currentCourses.map((course) => (
                <div key={course.id} onClick={() => setSelectedCourse(course)}
                  className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition cursor-pointer hover:border-blue-200 border border-transparent">
                  <div className="md:w-64 w-full rounded-xl overflow-hidden">
                    <Image src={course.image || "/Featured1.png"} alt={course.title}
                      width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-4">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">{course.title}</h3>
                        <span className="text-blue-600 font-bold text-xl shrink-0">${Number(course.price).toFixed(2)}</span>
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
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{course.rating || 4.5}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.hours} hrs</span>
                      <span className="flex items-center gap-1"><BarChart className="w-4 h-4" />{course.level}</span>
                    </div>
                  </div>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="w-9 h-9 border rounded-md disabled:opacity-40 hover:bg-gray-100">
                    <ChevronLeft className="w-4 h-4 mx-auto" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 border rounded-md ${currentPage === p ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"}`}>
                      {p}
                    </button>
                  ))}
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="w-9 h-9 border rounded-md disabled:opacity-40 hover:bg-gray-100">
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
