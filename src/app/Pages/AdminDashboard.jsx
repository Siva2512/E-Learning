"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCourse, updateCourse } from "../../redux/courseSlice";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import { Pencil, Trash2, X, Check, Lock } from "lucide-react";
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
  { name: "React",      value: 28 },
  { name: "JavaScript", value: 22 },
  { name: "Python",     value: 20 },
  { name: "AI",         value: 18 },
  { name: "Data",       value: 12 },
];
const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.fill }}>{p.name}: <span className="font-bold">{p.value}</span></p>
      ))}
    </div>
  );
};

// ── Edit Modal ─────────────────────────────────────────────────────────────────
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
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave({ ...course, ...form })}
            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm ─────────────────────────────────────────────────────────────
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

// ── Main Admin Dashboard ───────────────────────────────────────────────────────
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router   = useRouter();
  const courses  = useSelector((state) => state.courses.courses);

  const [user,           setUser]           = useState({});
  const [editCourse,     setEditCourse]     = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  const loadData = () => {
    const stored   = JSON.parse(localStorage.getItem("user")            || "{}");
    const activity = JSON.parse(localStorage.getItem("studentActivity") || "[]");
    setUser(stored);
    setRecentActivity(activity);
  };

  useEffect(() => {
    loadData();
    // ✅ Re-read activity whenever tab gets focus (new student logged in another tab)
    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  // ✅ Admin-only guard
  if (user.role && user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-sm">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-red-500 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-400 text-sm mt-2">Only admins can access this dashboard.</p>
          <button onClick={() => router.push("/")}
            className="mt-5 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleSave   = (updated) => { dispatch(updateCourse(updated)); setEditCourse(null); };
  const handleDelete = () => { 
  if (!deletingCourse || !deletingCourse.id) return; // ✅ FIX

  dispatch(deleteCourse(deletingCourse.id)); 
  setDeletingCourse(null); 
};

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  return (
    <>
      {editCourse     && <EditModal     course={editCourse}     onClose={() => setEditCourse(null)}     onSave={handleSave}      />}
      {deletingCourse && <DeleteConfirm course={deletingCourse} onClose={() => setDeletingCourse(null)} onConfirm={handleDelete} />}

      <div className="w-full min-h-screen flex flex-col">

          {/* Top bar */}
          <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-400 text-xs mt-0.5">Manage courses and monitor student engagement</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden sm:block">{user.name || "Admin"}</span>
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                {initials}
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-6 space-y-5 w-full">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Courses Published", value: courses.length, change: "Total in catalog",   color: "bg-indigo-50 border-indigo-100", icon: "📚", accent: "text-indigo-600" },
                { label: "Total Students",    value: "142",          change: "+12 this week",       color: "bg-sky-50 border-sky-100",       icon: "👥", accent: "text-sky-600"    },
                { label: "Total Views",       value: "2,841",        change: "+66 today",           color: "bg-emerald-50 border-emerald-100", icon: "👁️", accent: "text-emerald-600" },
                { label: "Avg. Completion",   value: "61%",          change: "+4% this month",      color: "bg-amber-50 border-amber-100",   icon: "🎯", accent: "text-amber-600"  },
              ].map((card, i) => (
                <div key={i} className={`${card.color} border rounded-2xl p-5`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{card.label}</p>
                      <p className={`text-3xl font-bold mt-1 ${card.accent}`}>{card.value}</p>
                      <p className="text-xs text-gray-400 mt-1">{card.change}</p>
                    </div>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts — NO border prop on recharts elements */}
            <div className="grid lg:grid-cols-3 gap-5">

              {/* Bar Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-800">Monthly Views & Students</h2>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">Last 6 months</span>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={monthlyViews} barGap={4} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                    <Bar dataKey="views"    fill="#4f46e5" radius={[6,6,0,0]} name="Views"    />
                    <Bar dataKey="students" fill="#a5b4fc" radius={[6,6,0,0]} name="Students" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-semibold text-gray-800 mb-5">Category Split</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" outerRadius={75} innerRadius={42} paddingAngle={3} strokeWidth={0}>
                      {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="none" />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3 space-y-1.5">
                  {categoryData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                        <span className="text-gray-500">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-700">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* My Courses Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">All Courses</h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{courses.length} total</span>
                  <button onClick={() => router.push("/AddCourse")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition">
                    + Add Course
                  </button>
                </div>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="font-medium">No courses yet.</p>
                  <button onClick={() => router.push("/admin/AddCourse")} className="mt-2 text-indigo-600 text-sm hover:underline">
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
                              : <span className="text-gray-700">${Number(c.price).toFixed(2)}</span>}
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
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-800">Recent Student Activity</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Live log of student signups and logins</p>
                </div>
                {recentActivity.length > 0 && (
                  <button
                    onClick={() => { localStorage.removeItem("studentActivity"); setRecentActivity([]); }}
                    className="text-xs text-red-400 hover:text-red-600 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="p-5">
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-2xl mb-2">📭</p>
                    <p className="text-sm text-gray-400">No student activity yet.</p>
                    <p className="text-xs text-gray-300 mt-1">Activity appears here when students sign up or log in.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {recentActivity.slice(0, 10).map((item, i) => (
                      <div key={i} className="flex gap-3 items-center py-3 first:pt-0 last:pb-0">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {(item.name || item.student || "S").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0,2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-gray-800 truncate">{item.name || "Student"}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${
                              item.action === "Signed up"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              {item.action || "Logged in"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">{item.email}</p>
                          <p className="text-xs text-gray-300 mt-0.5">{item.date ? `${item.date} · ` : ""}{item.time}</p>
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
