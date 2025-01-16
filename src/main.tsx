import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import router from "@/router";
import "@/index.css";
import SheetProviders from "./providers/sheet-providers";
import "./i18n"; // Import the i18n import { DirectionProvider } from "@radix-ui/react-direction";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useDirection } from "./hooks/use-direction";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DirectionProvider dir={useDirection.getState().dir}></DirectionProvider>;
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
      <SheetProviders />
    </ThemeProvider>
  </React.StrictMode>
);
