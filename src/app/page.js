"use client";
import Hero from "./Pages/HomePage/Hero";
import Featured from "./Pages/HomePage/Featured";
import Career from "./Pages/HomePage/Career";
import Platform from "./Pages/HomePage/Platform";


import MainLayout from "./Components/Layout/MainLayout";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* <Navbar/> */}
      <MainLayout>
      <Hero/>
      <Featured />
      <Platform />
      <Career />
      </MainLayout>
      {/* <Footer /> */}
    </main>
  );
}
