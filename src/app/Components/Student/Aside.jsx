"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBook, FaClipboardList, FaEnvelope, FaCog } from "react-icons/fa";
import { GiStarShuriken } from "react-icons/gi";

export default function Aside() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/Student", icon: FaHome },
    { name: "My Courses", href: "/Student/StudentCourse", icon: FaBook },
    { name: "Assignments", href: "/Student/Assignments", icon: FaClipboardList },
    { name: "Messages", href: "/Student/Messages", icon: FaEnvelope },
    { name: "Settings", href: "/Student/Settings", icon: FaCog },
  ];

  return (
    <aside className="hidden md:flex w-56 bg-white p-5 flex-col justify-between">

      {/* Logo */}
      <div>
        <Link href="/Student" className="flex items-center gap-2 mb-6">
          <GiStarShuriken className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">EduMaster</h2>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2 text-sm">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile */}
      <Link
        href="/Student/Profile"
        className="flex items-center gap-3 pt-4 hover:bg-gray-50 rounded-lg p-2"
      >
        <Image
          src="/Featured2.png"
          alt="Alex Johnson"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium">Alex Johnson</p>
          <p className="text-xs text-gray-500">Premium Member</p>
        </div>
      </Link>
    </aside>
  );
}
