import React from 'react'
import Image from "next/image";


export default function Hero() {
  return (

    <section className="bg-gray-100 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 px-6 lg:px-20">

        <div className=" max-w-7xl mx-auto flex flex-col lg:flex-row items-center  gap-12 lg:gap-16">

            {/* left content */}

            <div className="flex-1 text-left">
               {/* heading  */}

               <p className="text-blue-500 font-semibold text-xs tracking-wide uppercase">
                E-Learning Platform</p>

               <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold  leading-wide mt-2 text-gray-900">
                 Master New Skill{" "}
                 <span className="text-blue-600">Today</span>
                 </h1>

                 {/* description */}
                 <p className="text-[#475569] mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg">
                    Unlock your potential with flexible learning paths designed for
                    students and professionals. Learn at your own pace from industry
                    experts.
                    </p>

               {/* buttons */}
             <div className="flex flex-col lg:flex-row gap-4 mt-8 mb-10">
  <button className="w-auto sm:w-full px-6 py-3 sm:px-8 sm:py-4 rounded-md bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-semibold">
    Start Learning
  </button>

  <button className="w-auto sm:w-full px-6 py-3 sm:px-8 sm:py-4 rounded-md border border-gray-300 hover:bg-white text-gray-900 font-semibold">
    Browse Courses
  </button>
</div>

                
                
                <div className="flex items-center gap-4 mt-6">
                    <div className="flex -space-x-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-200 rounded-full border-2 border-white" />
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-300 rounded-full border-2 border-white" />
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-400 rounded-full border-2 border-white" />
                        </div>
                        
                    <p className="text-gray-700 text-sm sm:text-base">
                        <span className="font-semibold text-gray-900">10K+</span> Students already joined</p>
                    </div>
                    
                </div>


        {/* right image */}

        <div className="flex-1 w-full relative oder-first lg:oder-last">

            <div className=" rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-[#779e94] shadow-[#779e94] shadow-2xl">
                <Image 
                src="/MacBook.png"
                alt="hero image" 
                width={200}
                height={400}
                 className="w-full h-auto" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32" />
        </div>

    </div>
</section>

  )
}
