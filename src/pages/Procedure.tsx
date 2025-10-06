import { Navbar } from "@/components/Navbar";
import { ProcedureSection } from "@/components/sections/ProcedureSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Procedure() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ProcedureSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
