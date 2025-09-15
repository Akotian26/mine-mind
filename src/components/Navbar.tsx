import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Blocks, 
  Plus, 
  Shield, 
  CheckCircle, 
  Settings,
  Moon,
  Sun
} from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  const navItems = [
    { to: "/", label: "Dashboard", icon: Blocks },
    { to: "/add-transaction", label: "Add Transaction", icon: Plus },
    { to: "/tamper-block", label: "Tamper Block", icon: Shield },
    { to: "/verify-blockchain", label: "Verify Chain", icon: CheckCircle },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-pulse-glow">
              <Blocks className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CryptoChain
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={isActive(item.to) ? "default" : "ghost"}
                    className={`relative group ${
                      isActive(item.to) 
                        ? "bg-gradient-primary text-white shadow-button" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive(item.to) && (
                      <div className="absolute inset-0 bg-gradient-primary rounded-md opacity-20 animate-pulse" />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="hover:bg-muted/50"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={isActive(item.to) ? "default" : "ghost"}
                    size="sm"
                    className={
                      isActive(item.to) 
                        ? "bg-gradient-primary text-white" 
                        : "hover:bg-muted/50"
                    }
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}