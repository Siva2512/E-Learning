"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { deleteCourse, updateCourse } from "../../../redux/courseSlice";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const monthlyViews = [
  { name: "Jan", views: 29, students: 12 },
  { name: "Feb", views: 41, students: 18 },
  { name: "Mar", views: 33, students: 14 },
  { name: "Apr", views: 58, students: 24 },
  { name: "May", views: 72, students: 31 },
  { name: "Jun", views: 66, students: 28 },
];
const categoryData = [
  { name: "React", value: 28 }, { name: "JavaScript", value: 22 },
  { name: "Python", value: 20 }, { name: "AI", value: 18 }, { name: "Data", value: 12 },
];
const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];
const recentActivity = [
  { student: "Sneha Patel",  action: "Completed Module 9",   course: "Data Science",        time: "30 min ago" },
  { student: "Arjun Sharma", action: "Watched Lecture 12",   course: "React Fundamentals",  time: "2 hrs ago"  },
  { student: "Priya Nair",   action: "Submitted Assignment", course: "Python for AI",       time: "1 day ago"  },
  { student: "Karan Mehta",  action: "Started Module 5",     course: "JavaScript Advanced", time: "3 days ago" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
      ))}
    </div>
  );
};

function EditModal({ course, onClose, onSave }) {
  const [form, setForm] = useState({
    title: course.title || "", instructor: course.instructor || "",
    price: course.price || "", hours: course.hours || "",
    level: course.level || "", desc: course.desc || "", image: course.image || "",
  });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Edit Course</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "title",      label: "Title",      span: true  },
            { name: "instructor", label: "Instructor", span: false },
            { name: "price",      label: "Price ($)",  span: false },
            { name: "hours",      label: "Hours",      span: false },
            { name: "level",      label: "Level",      span: false },
            { name: "image",      label: "Image URL",  span: true  },
          ].map(({ name, label, span }) => (
            <div key={name} className={span ? "col-span-2" : ""}>
              <label className="text-xs text-gray-500 font-medium">{label}</label>
              <input name={name} value={form[name]} onChange={handleChange}
                className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
          ))}
          <div className="col-span-2">
            <label className="text-xs text-gray-500 font-medium">Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} rows={3}
              className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">Cancel</button>
          <button onClick={() => onSave({ ...course, ...form })}
            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({ course, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Delete Course?</h2>
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-medium text-gray-700">"{course.title}"</span> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router   = useRouter();
  const courses  = useSelector((state) => state.courses.courses);
  const user     = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};

  const [editCourse,     setEditCourse]     = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  const handleSave   = (updated) => { dispatch(updateCourse(updated)); setEditCourse(null); };
  const handleDelete = () => {
  if (!deletingCourse) return;
  dispatch(deleteCourse(deletingCourse.id));
  setDeletingCourse(null);
};

  return (
    <>
      {editCourse     && <EditModal      course={editCourse}     onClose={() => setEditCourse(null)}     onSave={handleSave}   />}
      {deletingCourse && <DeleteConfirm  course={deletingCourse} onClose={() => setDeletingCourse(null)} onConfirm={handleDelete} />}

      <div className="min-h-screen bg-gray-50 text-gray-800" style={{ fontFamily: "'Georgia', serif" }}>

        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg">AdminBoard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user.name || "Admin"}</span>
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
              {(user.name || "A").charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-500 mt-1 text-sm">Manage your courses and monitor student engagement</p>
            </div>
            <button onClick={() => router.push("/AddCourse")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
              + Add Course
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {[
              { label: "Courses Published", value: courses.length, change: "From your uploads",  color: "bg-indigo-50 border-indigo-200", icon: "📚", accent: "text-indigo-600" },
              { label: "Total Students",    value: "142",          change: "+12 this week",       color: "bg-sky-50 border-sky-200",       icon: "👥", accent: "text-sky-600"    },
              { label: "Total Views",       value: "2,841",        change: "+66 today",           color: "bg-emerald-50 border-emerald-200", icon: "👁️", accent: "text-emerald-600" },
              { label: "Avg. Completion",   value: "61%",          change: "+4% this month",      color: "bg-amber-50 border-amber-200",   icon: "🎯", accent: "text-amber-600"  },
            ].map((card, i) => (
              <div key={i} className={`${card.color} border rounded-xl p-5`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{card.label}</p>
                    <p className={`text-3xl font-bold mt-1 ${card.accent}`}>{card.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{card.change}</p>
                  </div>
                  <span className="text-2xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Monthly Views & Students</h2>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyViews} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="views"    fill="#4f46e5" radius={[4,4,0,0]} name="Views"    />
                  <Bar dataKey="students" fill="#bfdbfe" radius={[4,4,0,0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-5">Category Split</h2>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" outerRadius={75} innerRadius={40} paddingAngle={3}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-700">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── My Courses Table ── */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">My Courses</h2>
              <span className="text-xs text-gray-400">{courses.length} total</span>
            </div>

            {courses.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="font-medium">No courses published yet.</p>
                <button onClick={() => router.push("/Teacher/AddCourse")} className="mt-3 text-indigo-600 text-sm hover:underline font-medium">
                  + Add your first course
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                      <th className="text-left px-6 py-3">Course</th>
                      <th className="text-left px-6 py-3">Instructor</th>
                      <th className="text-left px-6 py-3">Level</th>
                      <th className="text-left px-6 py-3">Price</th>
                      <th className="text-left px-6 py-3">Hours</th>
                      <th className="text-left px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3">
                          <p className="font-medium text-gray-800 max-w-xs truncate">{c.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{c.desc}</p>
                        </td>
                        <td className="px-6 py-3 text-gray-500">{c.instructor || "—"}</td>
                        <td className="px-6 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            c.level === "Beginner"     ? "bg-green-100 text-green-700" :
                            c.level === "Intermediate" ? "bg-amber-100 text-amber-700" :
                            c.level === "Expert"       ? "bg-red-100 text-red-600"     :
                            "bg-gray-100 text-gray-500"
                          }`}>{c.level || "—"}</span>
                        </td>
                        <td className="px-6 py-3 font-medium">
                          {Number(c.price) === 0
                            ? <span className="text-green-600">Free</span>
                            : <span className="text-gray-700">${Number(c.price).toFixed(2)}</span>
                          }
                        </td>
                        <td className="px-6 py-3 text-gray-500">{c.hours ? `${c.hours} hrs` : "—"}</td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setEditCourse(c)}
                              className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition" title="Edit">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setDeletingCourse(c)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition" title="Delete">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Student Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="font-semibold text-gray-800">Recent Student Activity</h2>
                <p className="text-xs text-gray-400 mt-0.5">Students who recently logged in</p>
              </div>
              <div className="p-5">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">No student activity yet.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {recentActivity.slice(0, 8).map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {item.name ? item.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0,2) : "S"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{item.name || "Student"}</p>
                          <p className="text-xs text-gray-400">{item.email}</p>
                          <p className="text-xs text-indigo-400 mt-0.5">Logged in · {item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

        </div>
      </div>
    </>
  );
}