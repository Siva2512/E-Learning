"use client";

import { useState, useRef } from "react";
import {
  PlayCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronLeft,
  BookOpen,
  FileText,
  BarChart2,
  Award,
  Lock,
  Play,
  Menu,
  X,
} from "lucide-react";

// dummy data
const curriculum = [
  {
    title: "Introduction & Setup",
    lessons: [
      { id: 1, name: "Course Overview", time: "05:00", done: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 2, name: "Environment Setup", time: "12:00", done: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 3, name: "Your First Project", time: "08:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    title: "Core Concepts",
    lessons: [
      { id: 4, name: "Fundamentals Deep Dive", time: "18:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 5, name: "Practical Patterns", time: "22:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 6, name: "Common Mistakes", time: "14:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    title: "Advanced Topics",
    lessons: [
      { id: 7, name: "Performance & Scaling", time: "26:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 8, name: "Real-World Integration", time: "30:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    title: "Projects & Practice",
    lessons: [
      { id: 9, name: "Mini Project #1", time: "40:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 10, name: "Mini Project #2", time: "45:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    title: "Final Capstone",
    lessons: [
      { id: 11, name: "Capstone Walkthrough", time: "60:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 12, name: "Submission & Review", time: "15:00", done: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
];

const assignments = [
  { id: 1, title: "Setup & Environment Quiz", due: "Due in 2 days", status: "pending", points: 10 },
  { id: 2, title: "Build a Landing Page", due: "Due in 5 days", status: "pending", points: 30 },
  { id: 3, title: "Core Concepts Assessment", due: "Submitted", status: "submitted", points: 25 },
  { id: 4, title: "Performance Optimization Task", due: "Due in 8 days", status: "pending", points: 40 },
  { id: 5, title: "Final Capstone Project", due: "Due in 14 days", status: "locked", points: 100 },
];

const allLessons = curriculum.flatMap((s) => s.lessons);

export default function CoursePlayer({ course, onBack }) {
  const [activeLesson, setActiveLesson] = useState(allLessons[0]);
  const [activeTab, setActiveTab] = useState("video"); // video | assignments | progress
  const [openSections, setOpenSections] = useState([0]);
  const [completedIds, setCompletedIds] = useState(
    allLessons.filter((l) => l.done).map((l) => l.id)
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const videoRef = useRef(null);

  const toggleSection = (i) =>
    setOpenSections((prev) =>
      prev.includes(i)
        ? prev.filter((x) => x !== i)
        : [...prev, i]
    );

  const markDone = (id) =>
    setCompletedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );

  const progressPct = Math.round(
    (completedIds.length / allLessons.length) * 100
  );

  const courseTitle = course?.title || "Course Player";
  const instructor = course?.instructor || "Instructor";

  // Sidebar
  const CurriculumSidebar = () => (
    <div className="flex flex-col h-full bg-white border-l border-gray-100">
      <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <h3 className="font-semibold text-gray-900 text-sm">Course Content</h3>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3 border-b border-gray-100 shrink-0">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>{completedIds.length} / {allLessons.length} completed</span>
          <span className="font-semibold text-indigo-600">{progressPct}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {curriculum.map((section, i) => (
          <div key={i} className="border-b border-gray-50">
            <button
              onClick={() => toggleSection(i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{section.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{section.lessons.length} lessons</p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${
                  openSections.includes(i) ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSections.includes(i) && (
              <ul className="pb-2">
                {section.lessons.map((lesson) => {
                  const done = completedIds.includes(lesson.id);
                  const active = activeLesson?.id === lesson.id;

                  return (
                    <li
                      key={lesson.id}
                      onClick={() => {
                        setActiveLesson(lesson);
                        setActiveTab("video");
                        setSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition text-sm ${
                        active
                          ? "bg-indigo-50 border-r-2 border-indigo-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {done ? (
                        <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                      ) : (
                        <Play
                          className={`w-4 h-4 shrink-0 ${
                            active ? "text-indigo-600" : "text-gray-300"
                          }`}
                        />
                      )}

                      <span
                        className={`flex-1 truncate ${
                          active
                            ? "text-indigo-700 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {lesson.name}
                      </span>

                      <span className="text-xs text-gray-400 shrink-0">
                        {lesson.time}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col pt-18">

      {/* ── Top Nav ── */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4 sticky top-0 z-30 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{courseTitle}</p>
          <p className="text-xs text-gray-400 truncate">By {instructor}</p>
        </div>

        {/* Progress pill */}
        <div className="hidden sm:flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
          <div className="w-16 bg-indigo-200 rounded-full h-1.5">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-xs font-semibold text-indigo-600">{progressPct}%</span>
        </div>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">

          {/* Tabs */}
          <div className="bg-white border-b border-gray-100 px-4 sm:px-6 flex gap-1">
            {[
              { key: "video",       label: "Lesson",      icon: PlayCircle },
              { key: "assignments", label: "Assignments", icon: FileText   },
              { key: "progress",    label: "Progress",    icon: BarChart2  },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition ${
                  activeTab === key
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          {/* ── VIDEO TAB ── */}
          {activeTab === "video" && (
            <div className="p-4 sm:p-6 space-y-5">

              {/* Video player */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-video w-full shadow-lg">
                <video
                  ref={videoRef}
                  key={activeLesson?.id}
                  src={activeLesson?.videoUrl}
                  controls
                  className="w-full h-full"
                  onEnded={() => markDone(activeLesson?.id)}
                />
              </div>

              {/* Lesson info */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{activeLesson?.name}</h2>
                  <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{activeLesson?.time}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{courseTitle}</span>
                  </div>
                </div>
                <button
                  onClick={() => markDone(activeLesson?.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                    completedIds.includes(activeLesson?.id)
                      ? "bg-green-100 text-green-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {completedIds.includes(activeLesson?.id) ? "Completed" : "Mark Complete"}
                </button>
              </div>

              {/* Prev / Next */}
              <div className="flex gap-3 pt-2">
                {(() => {
                  const idx  = allLessons.findIndex((l) => l.id === activeLesson?.id);
                  const prev = allLessons[idx - 1];
                  const next = allLessons[idx + 1];
                  return (
                    <>
                      <button
                        disabled={!prev}
                        onClick={() => prev && setActiveLesson(prev)}
                        className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <button
                        disabled={!next}
                        onClick={() => { if (next) { markDone(activeLesson?.id); setActiveLesson(next); } }}
                        className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition flex items-center justify-center gap-2"
                      >
                        Next <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ── ASSIGNMENTS TAB ── */}
          {activeTab === "assignments" && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Assignments</h2>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                  {assignments.filter((a) => a.status === "submitted").length}/{assignments.length} submitted
                </span>
              </div>

              {assignments.map((a) => (
                <div
                  key={a.id}
                  className={`bg-white rounded-2xl p-5 border transition ${
                    a.status === "locked"
                      ? "border-gray-100 opacity-60"
                      : "border-gray-100 hover:border-indigo-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        a.status === "submitted" ? "bg-green-100"  :
                        a.status === "locked"    ? "bg-gray-100"   : "bg-indigo-50"
                      }`}>
                        {a.status === "submitted" ? <CheckCircle className="w-5 h-5 text-green-600" />  :
                         a.status === "locked"    ? <Lock         className="w-5 h-5 text-gray-400" />  :
                                                    <FileText     className="w-5 h-5 text-indigo-600" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{a.title}</p>
                        <p className={`text-xs mt-0.5 ${a.status === "submitted" ? "text-green-600" : "text-gray-400"}`}>
                          {a.due}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">{a.points} pts</p>
                      {a.status !== "locked" && a.status !== "submitted" && (
                        <button className="mt-2 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition font-medium">
                          Start
                        </button>
                      )}
                      {a.status === "submitted" && (
                        <span className="mt-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg font-medium">
                          Done ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PROGRESS TAB ── */}
          {activeTab === "progress" && (
            <div className="p-4 sm:p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900">Your Progress</h2>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Completed",   value: `${completedIds.length}`,          sub: "lessons",  color: "bg-indigo-50  text-indigo-600"  },
                  { label: "Remaining",   value: `${allLessons.length - completedIds.length}`, sub: "lessons", color: "bg-amber-50 text-amber-600" },
                  { label: "Progress",    value: `${progressPct}%`,                 sub: "overall",  color: "bg-green-50   text-green-600"   },
                  { label: "Assignments", value: `${assignments.filter((a) => a.status === "submitted").length}/${assignments.length}`, sub: "done", color: "bg-sky-50 text-sky-600" },
                ].map((s, i) => (
                  <div key={i} className={`${s.color} rounded-2xl p-4 border border-white`}>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs mt-0.5 opacity-70">{s.label} {s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Overall progress bar */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-semibold text-gray-800">Overall Completion</span>
                  <span className="font-bold text-indigo-600">{progressPct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                {progressPct === 100 && (
                  <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                    <Award className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800 text-sm">Course Completed! 🎉</p>
                      <p className="text-xs text-green-600 mt-0.5">Your certificate is ready to download.</p>
                    </div>
                    <button className="ml-auto bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-green-700 transition shrink-0">
                      Download
                    </button>
                  </div>
                )}
              </div>

              {/* Section breakdown */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
                <h3 className="font-semibold text-gray-800 text-sm">Section Breakdown</h3>
                {curriculum.map((section, i) => {
                  const done  = section.lessons.filter((l) => completedIds.includes(l.id)).length;
                  const total = section.lessons.length;
                  const pct   = Math.round((done / total) * 100);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{section.title}</span>
                        <span className="text-gray-400">{done}/{total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-indigo-400 h-1.5 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ── Desktop Curriculum Sidebar ── */}
        <div className="hidden lg:block w-80 shrink-0 border-l border-gray-100 overflow-y-auto">
          <CurriculumSidebar />
        </div>

        {/* ── Mobile Curriculum Drawer ── */}
        {sidebarOpen && (
          <>
            <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} />
            <div className="lg:hidden fixed top-0 right-0 h-full w-72 z-50 shadow-2xl overflow-y-auto">
              <CurriculumSidebar />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
