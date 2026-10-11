import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "./pages/Index";

import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Convert from "./pages/Convert";
import About from "./pages/About";
import Realisations from "./pages/Realisations";
import ProjectDetail from "./pages/ProjectDetail";
import AgentDetail from "./pages/AgentDetail";
import NewLanding from "./pages/NewLanding";
import StudioHome from "./pages/StudioHome";
import Admin from "./pages/Admin";
import OcrTerms from "./pages/OcrTerms";
import AgenticCommerce from "./pages/AgenticCommerce";
import StudioLayout from "./components/studio/StudioLayout";
import { PageTransitionProvider } from "./components/studio/PageTransition";


// Import i18n configuration
import "./lib/i18n";
import i18n from "./lib/i18n";

const queryClient = new QueryClient();

const App = () => {
  // Global scroll to top behavior
  useScrollToTop();
  
  useEffect(() => {
    // Translations of the older components; each page sets its own <html lang>
    i18n.changeLanguage('en');
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <div className="min-h-screen bg-[#FAF9F5]">
            <Navbar />
            <PageTransitionProvider>
              <Routes>
                {/* Studio pages share one shell: header, footer, smooth scroll, cursor */}
                <Route element={<StudioLayout />}>
                  <Route path="/" element={<StudioHome />} />
                  <Route path="/realisations" element={<Realisations />} />
                  <Route path="/project/:projectId" element={<ProjectDetail />} />
                  <Route path="/agent/:id" element={<AgentDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/Convert" element={<Convert />} />
                  <Route path="/ocr-terms" element={<OcrTerms />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/hold-lp" element={<Index />} />
                <Route path="/old-landing" element={<NewLanding />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/home" element={<Admin />} />
                <Route path="/:locale/agentic-commerce" element={<AgenticCommerce />} />
              </Routes>
            </PageTransitionProvider>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
