import React from 'react'
import Image from "next/image";
import { Star } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

export default function Featured() {

    const courses=[
        {
            id: 1,
            title: "Advanced Web Development",
            instructor: "John Doe",
            price: 89,
            rating: 4.8,
            reviews: "1.2k",
            image: "/Featured1.png",
            category: "Web Dev",
        },
        {
            id: 2,
            title: "Data Science Essentials",
            instructor: "Sarah Smith",
            price: 124,
            rating: 4.9,
            reviews: "850",
            image: "/Featured 2.png",
            category: "Data Science",
            
        },
        {
            id: 3,
            title: "Digital Marketing pro",
            instructor: "Michael chen",
            price: 75,
            rating: 4.7,
            reviews: "920",
            image: "/Featured 3.png",
            category: "Marketing",
            
        },
    ];

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">

            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                        Featured Courses
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Hand-picked courses by our top-tier instructors.
                    </p>
                </div>

                <button className="flex items-center gap-2 text-blue-400 font-semibold  cursor-pointer hover:underline">
                    View all <FaArrowRight className="hover:underline cursor-pointer" />
                </button>
            </div>

            {/* cards */}
            <div className="flex flex-col md:flex-row  md:flex-wrap  gap-10">
                {courses.map((course)=>(
                    <div 
                        key={course.id} 
                        className="bg-gray-100 flex flex-col rounded-2xl shadow-sm  p-4  hover:shadow-md transition md:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)]"
                    >

                        {/* image */}
                        <div className="relative rounded-xl overflow-hidden " >

                            <Image
                                src={course.image}
                                alt={course.title}
                                width={500}
                                height={500}
                                className="w-full h-48 object-cover"
                            />
                        

                            {/* category */}
                            <span className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-md shadow">
                                {course.category}
                            </span>
                        </div> 
                        
                        
                        <div className="mt-3">

                        {/* rating */}
                        <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-500" />
                            <span className="font-semibold text-yellow-500">
                                {course.rating}
                            </span>
                            <span>({course.reviews} reviews)</span>
                        </div>

                        {/* title */}
                        <h3 className="text-lg font-semibold text-gray-900 mt-2">
                            {course.title}
                        </h3>

                        {/* instructor */}
                        <div className="flex items-center gap-4 mt-3">
                            <div className="w-8 h-8 rounded-full bg-gray-300" />
                            <p className="text-sm text-gray-600">
                                {course.instructor}
                            </p>
                        </div>

                        {/* price and button */}
                        <div className="border-t border-[#e0e0e0] mt-auto py-4">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-gray-900">
                                    ${course.price.toFixed(2)}
                                </p>
                                <button className="text-blue-500 font-semibold hover:text-blue-400 cursor-pointer">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    </section>
  );
}
