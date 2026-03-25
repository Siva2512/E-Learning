"use client";

import Image from "next/image";
import CoursePlayer from "../CoursePlayer";
import { BookOpen, CheckCircle, Clock, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router          = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [userName,      setUserName]      = useState("");
  const [userRole,      setUserRole]      = useState("");
  const [playingCourse, setPlayingCourse] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (savedUser?.name) setUserName(savedUser.name);
    if (savedUser?.role) setUserRole(savedUser.role);

    //  Load only if student's enrolled courses
    const loadCourses = () => {
      if (savedUser?.email) {
        const key     = `enrolledCourses_${savedUser.email}`;
        const courses = JSON.parse(localStorage.getItem(key) || "[]");
        setEnrolledCourses(courses);
      }
    };

    loadCourses();

    //  Re-load instantly when a new course is enrolled from storage
    window.addEventListener("storage", loadCourses);
    return () => window.removeEventListener("storage", loadCourses);
  }, []);

  
  useEffect(() => {
    if (userRole === "admin") {
      router.push("/AdminPage");
    }
  }, [userRole]);

  const today = new Date();

  const deadlines = [
    {
      title:  "Final Project Submission",
      course: "Data Science Fundamentals",
      date:   new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    },
    {
      title:  "Mid-term Quiz",
      course: "Advanced Web Development",
      date:   new Date(today.getFullYear(), today.getMonth(), today.getDate() + 50),
    },
  ];

  const getDaysLeft = (date) => {
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.ceil((date - startOfToday) / (1000 * 60 * 60 * 24));
  };

  const getLastAccessed = (iso) => {
    if (!iso) return "Recently";
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60)    return "Just now";
    if (diff < 3600)  return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const inProgress = enrolledCourses.filter((c) => (c.progress || 0) < 100);
  const completed  = enrolledCourses.filter((c) => (c.progress || 0) === 100);

  // Show CoursePlayer fullscreen when a course is playing
  if (playingCourse) {
    return <CoursePlayer course={playingCourse} onBack={() => setPlayingCourse(null)} />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen p-4 sm:p-6">
      <main className="flex flex-col lg:flex-row w-full gap-6">

        {/* LEFT*/}
        <section className="flex-1 flex flex-col gap-6">

        
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4 rounded-2xl">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {/*  only show name for students */}
                Welcome back, {userRole === "student" ? userName : "Student"}! 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {inProgress.length > 0
                  ? `You have ${inProgress.length} course${inProgress.length > 1 ? "s" : ""} in progress. Keep it up!`
                  : "Enroll in a course to get started!"}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-3 rounded-xl shadow-sm">
                <BookOpen className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-lg font-bold text-gray-900">{inProgress.length}</p>
                  <p className="text-xs text-gray-500">IN PROGRESS</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-3 rounded-xl shadow-sm">
                <CheckCircle className="text-green-600 w-5 h-5" />
                <div>
                  <p className="text-lg font-bold text-gray-900">{completed.length}</p>
                  <p className="text-xs text-gray-500">COMPLETED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="text-4xl mb-3">📚</div>
                <p className="font-semibold text-gray-800">No courses enrolled yet</p>
                <p className="text-sm text-gray-400 mt-1">Browse and enroll in a course to start learning.</p>
                <button
                  onClick={() => router.push("/CourseDetails")}
                  className="mt-4 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {enrolledCourses.map((course) => {
                  const progress = course.progress || 0;
                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start shadow-sm border border-gray-100 hover:border-indigo-200 transition"
                    >
                      <Image
                        src={course.image || "/Featured1.png"}
                        alt={course.title}
                        width={170}
                        height={120}
                        className="rounded-xl object-cover w-full md:w-[180px] h-[120px] shrink-0"
                      />
                      <div className="flex-1 w-full min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md font-medium w-fit uppercase tracking-wide">
                            {course.level || "Course"}
                          </span>
                          <span className="text-xs text-gray-400">
                            Last accessed: {getLastAccessed(course.lastAccessed)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          By {course.instructor} {course.hours ? `· ${course.hours} hrs` : ""}
                        </p>
                        <div className="flex justify-between mt-3 text-xs text-gray-500">
                          <span>Course Progress</span>
                          <span className="font-medium text-gray-700">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => setPlayingCourse(course)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow flex items-center gap-2 transition"
                          >
                            <PlayCircle className="w-4 h-4" />
                            {progress > 0 ? "Resume" : "Start"} Lesson
                          </button>
                          {progress === 100 && (
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Weekly Activity */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between mb-4">
              <p className="font-semibold text-gray-900">Weekly Activity</p>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">This Week</span>
            </div>
            <div className="h-32 flex items-end gap-2 px-2">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => {
                const heights = [40, 70, 50, 90, 60, 30, 45];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-indigo-200 rounded-t-md hover:bg-indigo-400 transition"
                      style={{ height: `${heights[i]}%` }}
                    />
                    <span className="text-[10px] text-gray-400">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6">

          {/* Upcoming Deadlines */}
          <div className="rounded-2xl py-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">Upcoming Deadlines</p>
              <p className="text-xs text-blue-600 cursor-pointer hover:underline">View all</p>
            </div>
            {deadlines.map((item, i) => {
              const daysLeft = getDaysLeft(item.date);
              const month    = item.date.toLocaleString("en-US", { month: "short" }).toUpperCase();
              const day      = item.date.getDate();
              return (
                <div key={i} className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                  <div className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold shrink-0 ${
                    daysLeft <= 3 ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
                  }`}>
                    <span>{month}</span>
                    <span className="text-base leading-none">{day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate">{item.course}</p>
                    <div className={`flex items-center gap-1 text-xs mt-1 ${daysLeft <= 2 ? "text-red-500" : "text-gray-500"}`}>
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{daysLeft} days left</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended */}
          <div className="space-y-4">
            <p className="font-semibold text-gray-900">Recommended for You</p>
            <div className="bg-white rounded-2xl p-5 space-y-4 shadow-sm border border-gray-100">
              {[
                { title: "UI/UX Design Masterclass", author: "Sarah Smith • 4.9 ★", price: "$49.00", img: "/Featured1.png" },
                { title: "Business Strategy 101",    author: "Michael Chen • 4.7 ★", price: "$35.00", img: "/Featured2.png" },
              ].map((course, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Image src={course.img} alt="course" width={48} height={48} className="rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                    <p className="text-xs text-gray-500">{course.author}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-semibold text-gray-900">{course.price}</p>
                      <button
                        onClick={() => router.push("/CourseDetails")}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 text-xs transition"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
