import { Navbar } from "@/components/Navbar";
import { ObjectiveSection } from "@/components/sections/ObjectiveSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Objective() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ObjectiveSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
