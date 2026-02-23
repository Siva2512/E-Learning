import Dashboard from "../Pages/Student/Dashboard"; 
import DashboardLayout from "../Components/Layout/DashboardLayout";
import StudentCourse from "@/app/Pages/Student/StudentCourse";

export default function Page() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}