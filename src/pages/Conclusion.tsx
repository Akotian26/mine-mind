import { Navbar } from "@/components/Navbar";
import { ConclusionSection } from "@/components/sections/ConclusionSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Conclusion() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ConclusionSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
