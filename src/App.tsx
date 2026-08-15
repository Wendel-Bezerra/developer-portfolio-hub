import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { ScrollToHash } from "@/components/ScrollToHash";
import { I18nProvider } from "@/i18n/I18nProvider";
import { LANGS, ROUTES, type RouteKey } from "@/i18n/routes";
import { SECTION_IDS } from "@/sections/anchors";

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen">
          <div className="relative z-10">
            <I18nProvider>
              <ScrollToHash />
              <Suspense fallback={null}>
                <Routes>
                  {/*
                    A home concentra todo o conteúdo em seções ancoradas; as rotas
                    antigas (/sobre, /en/projects, …) continuam válidas e passam a
                    redirecionar para a âncora correspondente, preservando links
                    externos já publicados.
                  */}
                  {LANGS.flatMap((lang) =>
                    (Object.entries(ROUTES[lang]) as [RouteKey, string][]).map(([key, path]) =>
                      key === "home" ? (
                        <Route key={path} path={path} element={<Index />} />
                      ) : (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <Navigate to={`${ROUTES[lang].home}#${SECTION_IDS[key]}`} replace />
                          }
                        />
                      ),
                    ),
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
