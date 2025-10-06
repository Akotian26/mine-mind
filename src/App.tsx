import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Theory from "./pages/Theory";
import Objective from "./pages/Objective";
import Procedure from "./pages/Procedure";
import Code from "./pages/Code";
import Simulation from "./pages/Simulation";
import Applications from "./pages/Applications";
import Conclusion from "./pages/Conclusion";
import References from "./pages/References";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/objective" element={<Objective />} />
          <Route path="/procedure" element={<Procedure />} />
          <Route path="/code" element={<Code />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/conclusion" element={<Conclusion />} />
          <Route path="/references" element={<References />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
