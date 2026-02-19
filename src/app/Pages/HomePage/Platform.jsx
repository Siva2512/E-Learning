import { Clock, GraduationCap, TrendingUp } from "lucide-react";


export default function Platform() {
  const features = [
    {
      icon: Clock,
      title: "Self-paced learning",
      desc: "Study on your own schedule from anywhere in the world. Our platform fits your busy lifestyle perfectly.",
    },
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      desc: "Learn from industry veterans with real-world experience at global tech companies and creative agencies.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      desc: "Monitor your growth with detailed analytics, quiz results, and career-ready milestones throughout your journey.",
    },
  ];

  return (
    
    <section className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Why Choose Our Platform
          </h2>
          <p className="text-gray-600 tracking-wide mt-4">
            Designed for the modern learner with a focus on flexibility,
            quality content, and actionable industry insights.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:max-w-6xl md:mx-auto">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-7 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl mb-6">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    
  );
}
