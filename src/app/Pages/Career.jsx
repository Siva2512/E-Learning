import React from "react";

export default function Career() {
  return (
    <section className="px-6 lg:px-12 mt-24">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#1a84ed] to-blue-400 rounded-3xl py-20 px-8 text-center text-white">
        
        {/* Inner wrapper for spacing */}
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
          
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to boost your career?
          </h2>

          {/* Subtext */}
          <p className="text-white/80 text-lg">
            Join over 500,000 learners and start your transformation today with a
            7-day free trial.
          </p>

          {/* Button */}
          <button className="bg-white text-blue-600 font-semibold px-10 py-4 rounded-xl hover:bg-gray-100 transition">
            Get Started for Free
          </button>

        </div>
      </div>
    </section>
  );
}
