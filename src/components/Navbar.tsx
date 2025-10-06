import { Button } from "@/components/ui/button";
import { Moon, Sun, Blocks } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  const navItems = [
    { path: "/", label: "Aim" },
    { path: "/theory", label: "Theory" },
    { path: "/objective", label: "Objective" },
    { path: "/procedure", label: "Procedure" },
    { path: "/code", label: "Code" },
    { path: "/simulation", label: "Simulation" },
    { path: "/applications", label: "Applications" },
    { path: "/conclusion", label: "Conclusion" },
    { path: "/references", label: "References" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all">
              <Blocks className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                Blockchain Hash Chain
              </h1>
              <p className="text-xs text-muted-foreground">Cryptography Lab Demo</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${
                    isActive(item.path)
                      ? "text-primary font-medium"
                      : "hover:text-primary"
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
                  )}
                </Button>
              </Link>
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
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={isActive(item.path) ? "bg-gradient-primary text-white" : ""}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
