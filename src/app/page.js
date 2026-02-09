
import Hero from "./Pages/Hero";
import Featured from "./Pages/Featured";
import Career from "./Pages/Career";
import Platform from "./Pages/Platform";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">

      <Hero/>
      <Featured />
      <Platform />
      <Career />
    </main>
  );
}
