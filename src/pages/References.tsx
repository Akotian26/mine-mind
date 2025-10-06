import { Navbar } from "@/components/Navbar";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function References() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ReferencesSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
