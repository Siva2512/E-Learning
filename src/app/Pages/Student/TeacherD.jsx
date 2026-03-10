"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const articleData = [
  { name: "Jan", views: 29 },
  { name: "Feb", views: 1 },
  { name: "Mar", views: 33 },
  { name: "Apr", views: 3 },
];

const categoryData = [
  { name: "React", value: 20 },
  { name: "JavaScript", value: 20 },
  { name: "Python", value: 20 },
  { name: "AI", value: 20 },
  { name: "Data", value: 20 },
];

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function TeacherDashboard() {

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10 pt-24">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <p className="text-gray-400">
          Welcome back! Here's your analytics overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h3 className="text-gray-400">Articles Created</h3>
          <p className="text-3xl font-bold">5</p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h3 className="text-gray-400">Total Students</h3>
          <p className="text-3xl font-bold">5</p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h3 className="text-gray-400">Total Views</h3>
          <p className="text-3xl font-bold">66</p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h3 className="text-gray-400">Avg Reading Time</h3>
          <p className="text-3xl font-bold">8 min</p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Bar Chart */}
        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Articles vs Views</h2>

          <BarChart width={400} height={300} data={articleData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="views" fill="#6366f1" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Category Distribution</h2>

          <PieChart width={400} height={300}>
            <Pie
              data={categoryData}
              dataKey="value"
              outerRadius={120}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>

        </div>

      </div>

    </div>
  );
}