import Aside from "@/app/Components/Student/Aside";
import Topbar from "@/app/Components/Student/Topbar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Aside />

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main>{children}</main>
      </div>
    </div>
  );
}
