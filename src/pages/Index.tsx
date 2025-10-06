import { ScrollNavbar } from "@/components/ScrollNavbar";
import { AimSection } from "@/components/sections/AimSection";
import { TheorySection } from "@/components/sections/TheorySection";
import { ObjectiveSection } from "@/components/sections/ObjectiveSection";
import { ProcedureSection } from "@/components/sections/ProcedureSection";
import { CodeSection } from "@/components/sections/CodeSection";
import { SimulationSection } from "@/components/sections/SimulationSection";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { ConclusionSection } from "@/components/sections/ConclusionSection";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollNavbar />
      
      <main>
        <AimSection />
        <TheorySection />
        <ObjectiveSection />
        <ProcedureSection />
        <CodeSection />
        <SimulationSection />
        <ApplicationsSection />
        <ConclusionSection />
        <ReferencesSection />
      </main>

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground/80">
            Developed by <span className="text-primary font-semibold">Ananya Naik</span> | Cryptography Assignment
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            © 2025 Blockchain Hash Chain Demo. All rights reserved.
          </p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default Index;
