
import Hero from "./Pages/Hero";
import Featured from "./Pages/Featured";
import Career from "./Pages/Career";
import Platform from "./Pages/Platform";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar/>
      <Hero/>
      <Featured />
      <Platform />
      <Career />
      <Footer />
    </main>
  );
}
