import { Navbar } from "@/components/Navbar";
import { CodeSection } from "@/components/sections/CodeSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Code() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <CodeSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
