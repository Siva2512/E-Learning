import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [], // { id, title, instructor, image, progress, lastAccessed }
  courses: [
    {
      id: 1,
      title: "Advanced Web Development: Full-Stack Mastery",
      instructor: "John Doe",
      price: 89,
      rating: 4.8,
      reviews: "1240",
      hours: 42,
      level: "Intermediate",
      image: "/Featured1.png",
      desc: "Master the latest web technologies including React, Node.js, and MongoDB."
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
      desc: "Learn to build interactive dashboards."
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
      desc: "Guide to creating responsive layouts."
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Emily Kim",
      price: 79,
      rating: 4.6,
      reviews: "1500",
      hours: 32,
      level: "Intermediate",
      image: "/Featured3.png",
      desc: "Python programming for data analysis."
    },
    {
      id: 5,
      title: "UI/UX Design Essentials",
      instructor: "Jessica Lee",
      price: 99,
      rating: 4.5,
      reviews: "1200",
      hours: 20,
      level: "Beginner",
      image: "/Featured1.png",
      desc: "Master UI/UX design principles."
    },
    {
      id: 6,
      title: "Mobile App Development Fundamentals",
      instructor: "David Kim",
      price: 89,
      rating: 4.7,
      reviews: "900",
      hours: 28,
      level: "Intermediate",
      image: "/Featured2.png",
      desc: "Learn mobile development with React Native."
    }
  ]
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {

    // Add a new course (teacher only)
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },

    // Delete a course by id
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    },

    // Edit a course by id
    updateCourse: (state, action) => {
      const index = state.courses.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...action.payload };
      }
    },

    // Enroll student in a course — stored per user email
    enrollCourse: (state, action) => {
      const course = action.payload;
      const exists = state.enrolledCourses.find((c) => c.id === course.id);
      if (!exists) {
        const entry = {
          id:           course.id,
          title:        course.title,
          instructor:   course.instructor,
          image:        course.image,
          hours:        course.hours,
          level:        course.level,
          progress:     0,
          lastAccessed: new Date().toISOString(),
        };
        state.enrolledCourses.push(entry);

        //  Also save per-user in localStorage
        if (typeof window !== "undefined") {
          const user  = JSON.parse(localStorage.getItem("user") || "{}");
          const key   = `enrolledCourses_${user.email}`;
          const saved = JSON.parse(localStorage.getItem(key) || "[]");
          if (!saved.find((c) => c.id === course.id)) {
            saved.push(entry);
            localStorage.setItem(key, JSON.stringify(saved));
          }
        }
      }
    },

    // Clear enrolled courses when user logs out / switches account
    clearEnrolledCourses: (state) => {
      state.enrolledCourses = [];
    },

    // Update student progress on a course
    updateProgress: (state, action) => {
      const { id, progress } = action.payload;
      // update in enrolledCourses
      const enrolled = state.enrolledCourses.find((c) => c.id === id);
      if (enrolled) {
        enrolled.progress     = progress;
        enrolled.lastAccessed = new Date().toISOString();
        enrolled.status       = progress === 100 ? "completed" : "continue";
      }
      // also update in courses
      const course = state.courses.find((c) => c.id === id);
      if (course) {
        course.progress = progress;
        course.status   = progress === 100 ? "completed" : "continue";
      }
    },

  },
});

export const { addCourse, deleteCourse, updateCourse, updateProgress, enrollCourse, clearEnrolledCourses } = courseSlice.actions;
export default courseSlice.reducer;
