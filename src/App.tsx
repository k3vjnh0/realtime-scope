import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="data-sources" element={<div className="p-6"><h1 className="text-2xl font-bold gradient-text">Data Sources</h1><p className="text-muted-foreground">Configure your data sources and integrations</p></div>} />
            <Route path="realtime" element={<div className="p-6"><h1 className="text-2xl font-bold gradient-text">Real-time Monitoring</h1><p className="text-muted-foreground">Live sensor data and alerts</p></div>} />
            <Route path="devices" element={<div className="p-6"><h1 className="text-2xl font-bold gradient-text">IoT Devices</h1><p className="text-muted-foreground">Manage your connected devices</p></div>} />
            <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold gradient-text">Reports</h1><p className="text-muted-foreground">Analytics and detailed reports</p></div>} />
            <Route path="alerts" element={<div className="p-6"><h1 className="text-2xl font-bold gradient-text">Alerts</h1><p className="text-muted-foreground">Notification settings and alert history</p></div>} />
            <Route path="users" element={<div className="p-6"><h1 className="text-2xl font-bold gradient-text">Users</h1><p className="text-muted-foreground">User management and permissions</p></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold gradient-text">Settings</h1><p className="text-muted-foreground">System configuration</p></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
