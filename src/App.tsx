import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { RoleProvider } from "@/hooks/use-role";
import { AppLayout } from "@/components/layout/AppLayout";
import { CommandPalette } from "@/components/CommandPalette";
import { AdminGuard } from "@/components/layout/AdminGuard";
import Dashboard from "./pages/Dashboard";
import JobTracker from "./pages/JobTracker";
import ResumeGenerator from "./pages/ResumeGenerator";
import InterviewPrep from "./pages/InterviewPrep";
import CodingPractice from "./pages/CodingPractice";
import AdminPanel from "./pages/AdminPanel";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RoleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CommandPalette />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/jobs" element={<JobTracker />} />
                <Route path="/resume" element={<ResumeGenerator />} />
                <Route path="/interview" element={<InterviewPrep />} />
                <Route path="/coding" element={<CodingPractice />} />
                <Route path="/admin" element={<AdminGuard><AdminPanel /></AdminGuard>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/pricing" element={<Pricing />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RoleProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
