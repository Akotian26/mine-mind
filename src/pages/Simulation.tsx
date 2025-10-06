import { Navbar } from "@/components/Navbar";
import { SimulationSection } from "@/components/sections/SimulationSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Simulation() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <SimulationSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
