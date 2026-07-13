import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { ScrollToHash } from "@/components/ScrollToHash";
import { I18nProvider } from "@/i18n/I18nProvider";
import { RaysBackground } from "@/components/layout/RaysBackground";
import { LANGS, ROUTES } from "@/i18n/routes";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PAGES = { home: Index, about: About, projects: Projects, contact: Contact } as const;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen">
          <RaysBackground />
          <div className="relative z-10">
            <I18nProvider>
              <ScrollToHash />
              <Suspense fallback={null}>
                <Routes>
                  {LANGS.flatMap((lang) =>
                    (Object.entries(ROUTES[lang]) as [keyof typeof PAGES, string][]).map(([key, path]) => {
                      const Page = PAGES[key];
                      return <Route key={path} path={path} element={<Page />} />;
                    }),
                  )}
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </I18nProvider>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
