
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import StudioPage from "./pages/StudioPage";
import InspirationPage from "./pages/InspirationPage";
import TemplateSubmitPage from "./pages/TemplateSubmitPage";
import ProfilePage from "./pages/ProfilePage";
import BrandPage from "./pages/BrandPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="studio" element={<StudioPage />} />
            <Route path="inspiration" element={<InspirationPage />} />
            <Route path="templates/submit" element={<TemplateSubmitPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="brand" element={<BrandPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
