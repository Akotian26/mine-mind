import { Navbar } from "@/components/Navbar";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Applications() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ApplicationsSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
