
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import StudioPage from "./pages/StudioPage";
import InspirationPage from "./pages/InspirationPage";
import TemplateSubmitPage from "./pages/TemplateSubmitPage";
import ProfilePage from "./pages/ProfilePage";
import BrandPage from "./pages/BrandPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
            <Route path="/" element={
              <Layout />
            }>
              <Route index element={<HomePage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="studio" element={
                <ProtectedRoute>
                  <StudioPage />
                </ProtectedRoute>
              } />
              <Route path="inspiration" element={<InspirationPage />} />
              <Route path="templates/submit" element={
                <ProtectedRoute>
                  <TemplateSubmitPage />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="brand" element={
                <ProtectedRoute>
                  <BrandPage />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
