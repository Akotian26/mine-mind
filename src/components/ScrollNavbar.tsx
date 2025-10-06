import { Button } from "@/components/ui/button";
import { Moon, Sun, Blocks } from "lucide-react";
import { useState, useEffect } from "react";

export function ScrollNavbar() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["aim", "theory", "objective", "procedure", "code", "simulation", "applications", "conclusion", "references"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "aim", label: "Aim" },
    { id: "theory", label: "Theory" },
    { id: "objective", label: "Objective" },
    { id: "procedure", label: "Procedure" },
    { id: "code", label: "Code" },
    { id: "simulation", label: "Simulation" },
    { id: "applications", label: "Applications" },
    { id: "conclusion", label: "Conclusion" },
    { id: "references", label: "References" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <nav className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all">
              <Blocks className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                Blockchain Hash Chain
              </h1>
              <p className="text-xs text-muted-foreground">Cryptography Lab Demo</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`relative ${
                  activeSection === item.id
                    ? "text-primary font-medium"
                    : "hover:text-primary"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
                )}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="hover:bg-muted/50"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-3 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={activeSection === item.id ? "bg-gradient-primary text-white" : ""}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
