import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Briefcase, FileText, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { label: "Home", path: "/", icon: LayoutDashboard },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Resume", path: "/resume", icon: FileText },
  { label: "Settings", path: "/settings", icon: Settings },
];

export function BottomNav() {
  const isMobile = useIsMobile();
  const location = useLocation();

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-md transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
