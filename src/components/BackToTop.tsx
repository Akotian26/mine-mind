import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-primary shadow-glow z-50 hover:shadow-button transition-all animate-fade-in"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </Button>
  );
}
