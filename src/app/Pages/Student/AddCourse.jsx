"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addCourse } from "../../../redux/courseSlice";
import { BookOpen, User, DollarSign, Clock, BarChart2, ImageIcon, AlignLeft, ChevronRight, CheckCircle } from "lucide-react";

const LEVELS = ["Beginner", "Intermediate", "Expert"];

const fields = [
  { name: "title",      label: "Course Title",    placeholder: "e.g. Advanced React Patterns",   icon: BookOpen,   type: "text",   half: false },
  { name: "instructor", label: "Instructor Name", placeholder: "e.g. John Doe",                  icon: User,       type: "text",   half: true  },
  { name: "price",      label: "Price (USD)",     placeholder: "e.g. 49",                        icon: DollarSign, type: "number", half: true  },
  { name: "hours",      label: "Total Hours",     placeholder: "e.g. 24",                        icon: Clock,      type: "number", half: true  },
  { name: "image",      label: "Image URL",       placeholder: "https://example.com/image.png",  icon: ImageIcon,  type: "text",   half: false },
];

export default function AddCourse() {
  const router   = useRouter();
  const dispatch = useDispatch();

  // ✅ Teacher-only guard
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};
  if (user.role !== "teacher") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-500 mt-2 text-sm">Only teachers can add courses.</p>
          <button onClick={() => router.back()} className="mt-5 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const [course, setCourse] = useState({
    title: "", instructor: "", price: "",
    hours: "", level: "", image: "", desc: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!course.title.trim())      e.title      = "Course title is required";
    if (!course.instructor.trim()) e.instructor = "Instructor name is required";
    if (!course.price)             e.price      = "Price is required";
    if (!course.hours)             e.hours      = "Duration is required";
    if (!course.level)             e.level      = "Please select a level";
    if (!course.desc.trim())       e.desc       = "Description is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    dispatch(addCourse({ id: Date.now(), rating: 4.5, reviews: "0", ...course }));
    setSubmitted(true);
    setTimeout(() => router.push("/CourseDetails"), 1800);
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Course Published!</h2>
          <p className="text-gray-500 mt-2 text-sm">Redirecting to course listing…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb + Header */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">Add New Course</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create a Course</h1>
          <p className="text-gray-500 mt-1.5 text-sm">Fill in the details below to publish your course to students.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Input fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ name, label, placeholder, icon: Icon, type, half }) => (
                <div key={name} className={half ? "" : "sm:col-span-2"}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={course[name]}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none transition
                        ${errors[name]
                          ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        }`}
                    />
                  </div>
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}
            </div>

            {/* Level toggle buttons */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                <BarChart2 className="w-4 h-4 text-gray-400" /> Difficulty Level
              </label>
              <div className="flex gap-3">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => { setCourse({ ...course, level: lvl }); if (errors.level) setErrors({ ...errors, level: "" }); }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition
                      ${course.level === lvl
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                      }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <AlignLeft className="w-4 h-4 text-gray-400" /> Description
              </label>
              <textarea
                name="desc"
                rows={4}
                placeholder="What will students learn? What makes this course special?"
                value={course.desc}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition resize-none
                  ${errors.desc
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
              />
              {errors.desc && <p className="text-red-500 text-xs mt-1">{errors.desc}</p>}
            </div>

            {/* Live preview strip */}
            {course.title && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-sm truncate">{course.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {course.instructor && `By ${course.instructor}`}
                    {course.level      && ` · ${course.level}`}
                    {course.price      && ` · $${course.price}`}
                    {course.hours      && ` · ${course.hours} hrs`}
                  </p>
                </div>
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full shrink-0">Preview</span>
              </div>
            )}

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-gray-500 hover:text-gray-800 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm flex items-center gap-2"
              >
                Publish Course <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}