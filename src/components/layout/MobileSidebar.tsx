import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Code2,
  CreditCard,
  Shield,
  Settings,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Job Tracker", path: "/jobs", icon: Briefcase },
  { label: "Resume", path: "/resume", icon: FileText },
  { label: "Interview Prep", path: "/interview", icon: MessageSquare },
  { label: "Coding Practice", path: "/coding", icon: Code2 },
  { label: "Pricing", path: "/pricing", icon: CreditCard },
  { label: "Settings", path: "/settings", icon: Settings },
  { label: "Admin", path: "/admin", icon: Shield },
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Hamburger button - fixed in top-left */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-50 p-2 rounded-md bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-sidebar border-r border-border flex flex-col"
            >
              {/* Header */}
              <div className="h-14 flex items-center justify-between px-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground text-sm">CareerOS AI</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`} />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
