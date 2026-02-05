import { Globe, Share2 } from "lucide-react";
import { GiStarShuriken } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 px-6 py-16 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GiStarShuriken className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">EduMaster</h2>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            The world's leading platform for online learning and skill
            development.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Platform</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Browse Courses</li>
            <li>Mentors</li>
            <li>Pricing</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Support</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          
          <p>© 2024 EduMaster. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 cursor-pointer" />
            <Share2 className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
