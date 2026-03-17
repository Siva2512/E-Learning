"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Users, BarChart2,
  PlusCircle, MessageSquare, Settings, LogOut,
  GraduationCap, X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",  href: "/admin",           icon: LayoutDashboard },
  { label: "Courses",    href: "/CourseDetails",   icon: BookOpen        },
  { label: "Students",   href: "/Student",         icon: Users           },
  { label: "Analytics",  href: "/admin/Analytics", icon: BarChart2       },
  { label: "Add Course", href: "/AddCourse",       icon: PlusCircle      },
  { label: "Messages",   href: "/admin/Messages",  icon: MessageSquare   },
  { label: "Settings",   href: "/admin/Settings",  icon: Settings        },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router   = useRouter();

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {};


  const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return (parts[0][0] + (parts[0][1] || "D")).toUpperCase();
  };
  const initials = user.name ? getInitials(user.name) : "AD";

  //  redirect to home on logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <GraduationCap className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900 text-lg">AdminBoard</span>
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? "text-indigo-600" : "text-gray-400"}`} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name || "Admin"}</p>
            <p className="text-xs text-gray-400 truncate">{user.email || ""}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition font-medium"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen bg-white border-r border-gray-100 shadow-sm fixed top-0 left-0 z-40">
        <SidebarContent />
      </aside>
    </>
  );
}
