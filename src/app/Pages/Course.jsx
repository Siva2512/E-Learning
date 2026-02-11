import Image from "next/image";
import { Star, Clock, BarChart, ChevronLeft, ChevronRight } from "lucide-react";

export default function Course() {
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development: Full-Stack Mastery",
      instructor: "John Doe",
      price: 89,
      rating: 4.8,
      reviews: "1,240",
      hours: 42,
      level: "Intermediate",
      image: "/Featured1.png",
      desc: "Master the latest web technologies including React, Node.js, and MongoDB in this comprehensive course for professionals.",
    },
    {
      id: 2,
      title: "Data Visualization for Web Apps",
      instructor: "Sarah Smith",
      price: 124,
      rating: 4.9,
      reviews: "850",
      hours: 28,
      level: "Advanced",
      image: "/Featured2.png",
      desc: "Learn to build interactive dashboards and complex charts using D3.js and modern JavaScript frameworks.",
    },
    {
      id: 3,
      title: "Responsive Design Principles",
      instructor: "Michael Chen",
      price: 45,
      rating: 4.7,
      reviews: "920",
      hours: 15,
      level: "Beginner",
      image: "/Featured3.png",
      desc: "A fundamental guide to creating layouts that look great on any device, from mobile to ultra-wide desktops.",
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Showing results for <span className="text-blue-600">"Web Development"</span>
          </h1>
          <p className="text-gray-500 mt-2">2,450 courses found for your search</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          <div className="lg:w-72">

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">CATEGORY</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Web Development (1,240)",
                  "UI/UX Design (450)",
                  "Mobile Dev (320)",
                  "Data Science (210)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={i === 0} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">PRICE</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {["Paid (1,800)", "Free (650)"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="checkbox" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">RATING</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {["4.0", "3.0"].map((rating, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {rating} & Up
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 ">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide">LEVEL</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Beginner (800)",
                  "Intermediate (1,100)",
                  "Expert (550)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="checkbox" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition"
              >
                <div className="md:w-64 w-full rounded-xl overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between gap-4">
                      <h3 className="text-xl font-semibold text-gray-900 leading-snug hover:text-blue-600">
                        {course.title}
                      </h3>
                      <span className="text-blue-600 font-bold text-xl">
                        ${course.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mt-2">{course.desc}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-8 rounded-full bg-gray-300" />
                      <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-3 pt-4 border-t border-gray-200">
                    <span className="flex items-center gap-1">
                      <Star  className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {course.rating} ({course.reviews} reviews)
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.hours} total hours
                    </span>

                    <span className="flex items-center gap-1">
                      <BarChart className="w-4 h-4" />
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center gap-2 pt-6">
              <button className="w-9 h-9 flex items-center justify-center rounded-md border text-gray-600 bg-white  border-gray-300 hover:border-blue-600 hover:text-blue-600">
                <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3, "...", 12].map((p, i) => (
            <button
            key={i}
            className={`w-9 h-9 flex items-center justify-center rounded-md border text-sm transition ${
            p === 1
            ? "bg-blue-600 text-black border-blue-600"
            : "border-gray-300 text-black hover:border-blue-600 hover:text-blue-600 dark:border-gray-600  dark:hover:border-blue-400"
            }`}
            >
              {p}
              </button>

            ))}
            <button className="w-9 h-9 flex items-center justify-center rounded-md border text-gray-600 bg-white border-gray-300 hover:border-blue-600 hover:text-blue-600">
              <ChevronRight className="w-4 h-4" />
              </button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
