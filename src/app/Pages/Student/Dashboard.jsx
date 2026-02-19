"use client";

import Image from "next/image";
import { BookOpen, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
  const today = new Date();

  const deadlines = [
    {
      title: "Final Project Submission",
      course: "Data Science Fundamentals",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    },
    {
      title: "Mid-term Quiz",
      course: "Advanced Web Development",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 50),
    },
  ];

  const getDaysLeft = (date) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = date - startOfToday;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex bg-gray-100 px-4 md:px-6 w-full">
  
      <main className="flex flex-col lg:flex-row gap-6 py-6">

        {/* LEFT */}
        <section className="flex-1 flex flex-col gap-6">

          {/* Welcome */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 rounded-2xl">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, Alex! 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                You have 2 assignments due this week. Keep it up!
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                <BookOpen className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-lg font-bold">12</p>
                  <p className="text-xs text-gray-500">IN PROGRESS</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                <CheckCircle className="text-green-600 w-5 h-5" />
                <div>
                  <p className="text-lg font-bold">24</p>
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

            <div className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start shadow-sm">
              <Image
                src="/Featured1.png"
                alt="course"
                width={170}
                height={120}
                className="rounded-xl object-cover w-full md:w-[200px] lg:w-[170px] h-[140px] md:h-[120px]"
              />

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2 min-w-0">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md font-medium whitespace-nowrap shrink-0">
                    ADVANCED WEB DEVELOPMENT
                  </span>
                  <span className="text-xs text-gray-400 sm:whitespace-nowrap">
                    Last accessed: 2 hours ago
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900">
                  Module 4: Mastering Tailwind CSS Grid and Flexbox
                </h3>

                <div className="flex justify-between mt-3 text-xs text-gray-500">
                  <span>Course Progress</span>
                  <span className="font-medium text-gray-700">65%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-indigo-600 h-2 rounded-full w-[65%]" />
                </div>

                <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow">
                  Resume Lesson
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white rounded-2xl p-5">
            <div className="flex justify-between mb-4">
              <p className="font-semibold text-gray-900">Weekly Activity</p>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                This Week
              </span>
            </div>

            <div className="h-40 flex flex-col justify-end">
              <div className="grid grid-cols-7 text-[10px] text-gray-400 px-4 pb-3">
                <span>MON</span><span>TUE</span><span>WED</span>
                <span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="w-full lg:w-[350px] flex flex-col gap-6">

          {/* Upcoming Deadlines */}
          <div className="rounded-2xl py-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">Upcoming Deadlines</p>
              <p className="text-xs text-blue-600 cursor-pointer">View all</p>
            </div>

            {deadlines.map((item, i) => {
              const daysLeft = getDaysLeft(item.date);
              const month = item.date.toLocaleString("en-US", { month: "short" }).toUpperCase();
              const day = item.date.getDate();

              return (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
                >
                  <div
                    className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold shrink-0 ${
                      daysLeft <= 3 ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    <span>{month}</span>
                    <span className="text-base leading-none">{day}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate">{item.course}</p>

                    <div
                      className={`flex items-center gap-1 text-xs mt-1 ${
                        daysLeft <= 2 ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      <Clock className="w-3 h-3 shrink-0" />
                      <span className="whitespace-nowrap">{daysLeft} days left</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended */}
          <div className=" space-y-4">
            <p className="font-semibold text-gray-900">Recommended for You</p>
            <div className="bg-white rounded-2xl p-5 space-y-4">
            {[
              { title: "UI/UX Design Masterclass", author: "Sarah Smith • 4.9 ★", price: "$49.00", img: "/Featured1.png" },
              { title: "Business Strategy 101", author: "Michael Chen • 4.7 ★", price: "$35.00", img: "/Featured2.png" },
            ].map((course, i) => (
              <div key={i} className="flex items-center gap-3">
                <Image src={course.img} alt="course" width={48} height={48} className="rounded-lg object-cover" />

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.author}</p>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-semibold text-gray-900">{course.price}</p>
                    <button className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 text-xs">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

        </aside>
      </main>
    </div>
  );
}
