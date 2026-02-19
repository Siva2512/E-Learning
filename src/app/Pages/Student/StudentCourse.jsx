"use client";

import Image from "next/image";

export default function StudentCourse() {
  const courses = [
    {
      id: 1,
      title: "Mastering Tailwind CSS Grid and Flexbox",
      category: "Web Development",
      progress: 65,
      image: "/Featured1.png",
      status: "continue",
    },
    {
      id: 2,
      title: "Modern Interface Design with Figma",
      category: "UI/UX Design",
      progress: 32,
      image: "/Featured2.png",
      status: "continue",
    },
    {
      id: 3,
      title: "Advanced Strategic Business Management",
      category: "Business",
      progress: 88,
      image: "/Featured3.png",
      status: "continue",
    },
    {
      id: 4,
      title: "Python for Data Science Fundamentals",
      category: "Programming",
      progress: 100,
      image: "/Featured4.png",
      status: "completed",
    },
    {
      id: 5,
      title: "Digital Marketing & SEO Mastery",
      category: "Marketing",
      progress: 12,
      image: "/Featured5.png",
      status: "continue",
    },
  ];

  return (
    <div className="p-6">
      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative h-40 w-full">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                {course.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">
                {course.title}
              </h3>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {course.status === "completed" ? "Completed" : "Progress"}
                  </span>
                  <span>{course.progress}%</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      course.status === "completed"
                        ? "bg-green-500"
                        : "bg-blue-600"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Button */}
              <button
                className={`w-full py-2 rounded-lg text-sm font-medium ${
                  course.status === "completed"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {course.status === "completed"
                  ? "View Certificate"
                  : "Continue Learning →"}
              </button>
            </div>
          </div>
        ))}

        {/* Discover Card */}
        <div className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6">
          <div className="text-3xl text-purple-600 mb-2">+</div>
          <h3 className="font-semibold">Discover New Skills</h3>
          <p className="text-sm text-gray-500 mb-3">
            Explore our catalog of over 500+ premium courses.
          </p>
          <button className="text-purple-600 font-medium">
            Browse Course Catalog
          </button>
        </div>
      </div>
    </div>
  );
}
