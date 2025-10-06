import { Navbar } from "@/components/Navbar";
import { TheorySection } from "@/components/sections/TheorySection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Theory() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <TheorySection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
