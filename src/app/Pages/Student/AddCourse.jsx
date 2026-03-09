"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addCourse } from "../../../redux/courseSlice";

export default function AddCourse() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [course, setCourse] = useState({
    title: "",
    instructor: "",
    price: "",
    hours: "",
    level: "",
    image: "",
    desc: "",
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      id: Date.now(),
      rating: 4.5,
      reviews: "0",
      ...course,
    };

    //  Add course to Redux
    dispatch(addCourse(newCourse));

    // redirect
    router.push("/CourseDetails");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Course Title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="instructor"
          placeholder="Instructor Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="hours"
          placeholder="Hours"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="level"
          placeholder="Level"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="desc"
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Add Course
        </button>

      </form>
    </div>
  );
}