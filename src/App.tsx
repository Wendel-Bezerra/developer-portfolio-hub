import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ScrollToHash } from "@/components/ScrollToHash";
import { I18nProvider } from "@/i18n/I18nProvider";
import { AuroraBackground } from "@/components/layout/AuroraBackground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen relative">
          <AuroraBackground />
          <div className="relative z-10">
            <I18nProvider>
              <ScrollToHash />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/en" element={<Index />} />
            <Route path="/es" element={<Index />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/en/contact" element={<Contact />} />
            <Route path="/es/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </I18nProvider>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
