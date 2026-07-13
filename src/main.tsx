import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Adia downloads de fontes para tirar do caminho crítico de renderização.
const loadDeferredFonts = () => {
  void import("@fontsource-variable/space-grotesk");

  const loadSecondary = () => {
    void import("@fontsource-variable/jetbrains-mono");
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadSecondary, { timeout: 2500 });
  } else {
    window.setTimeout(loadSecondary, 800);
  }
};

if (typeof window !== "undefined") {
  // rAF tende a acontecer após o primeiro paint.
  window.requestAnimationFrame(loadDeferredFonts);
}
