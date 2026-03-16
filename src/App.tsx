import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidekickProvider } from "@/contexts/SidekickContext";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import Sales from "./pages/Sales.tsx";
import Customers from "./pages/Customers.tsx";
import Channels from "./pages/Channels.tsx";
import Performance from "./pages/Performance.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidekickProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/performance" element={<Performance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidekickProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
