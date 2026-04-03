import { useState, useRef, useEffect } from "react";
import { Search, Bell, Zap, User, Settings, CreditCard, LogOut, Moon, HelpCircle, Shield, Crown, BarChart3, Users, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRole } from "@/hooks/use-role";

const notifications = [
  { id: 1, text: "Your resume ATS score improved to 87%", time: "2m ago", unread: true },
  { id: 2, text: "New interview scheduled with Google", time: "1h ago", unread: true },
  { id: 3, text: "Stripe application moved to Interview", time: "3h ago", unread: false },
  { id: 4, text: "AI suggestion: Practice system design", time: "1d ago", unread: false },
];

const adminUser = {
  name: "Alex Johnson",
  email: "alex@careerai.io",
  plan: "Admin",
  credits: "Unlimited",
};

const regularUser = {
  name: "Alex Johnson",
  email: "alex@careerai.io",
  plan: "Pro Plan",
  credits: "3 AI credits left",
};

export function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { isAdmin } = useRole();
  const currentUser = isAdmin ? adminUser : regularUser;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const userMenuItems = isAdmin
    ? [
        { icon: Shield, label: "Admin Dashboard", onClick: () => navigate("/admin"), accent: true },
        { icon: Users, label: "Manage Users", onClick: () => navigate("/admin") },
        { icon: BarChart3, label: "Analytics", onClick: () => navigate("/admin") },
        { icon: FileText, label: "Audit Logs", onClick: () => navigate("/admin") },
      ]
    : [
        { icon: User, label: "Profile", onClick: () => navigate("/auth") },
        { icon: CreditCard, label: "Billing & Plan", onClick: () => navigate("/pricing") },
        { icon: Settings, label: "Settings", onClick: () => navigate("/settings") },
        { icon: Moon, label: "Appearance" },
      ];

  const secondaryItems = isAdmin
    ? [
        { icon: Settings, label: "Platform Settings", onClick: () => navigate("/settings") },
        { icon: HelpCircle, label: "Help & Support" },
      ]
    : [
        { icon: HelpCircle, label: "Help & Support" },
      ];

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Search - hidden on mobile, or smaller */}
      <div className={`flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 ${isMobile ? "ml-10 flex-1 max-w-[200px]" : "w-72"}`}>
        <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder={isMobile ? "Search..." : "Search jobs, skills, actions..."}
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
        {!isMobile && (
          <kbd className="hidden sm:inline text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 md:gap-3">
        {/* Credits - hide on mobile */}
        {!isMobile && (
          <div className="flex items-center gap-1.5 bg-secondary rounded-md px-2.5 py-1.5 text-xs">
            <Zap className="h-3.5 w-3.5 text-warning" />
            <span className="text-muted-foreground">{currentUser.credits}</span>
          </div>
        )}

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 glass-card shadow-xl z-50"
              >
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">{unreadCount} new</span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-border">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-3 py-2.5 hover:bg-secondary/50 transition-colors cursor-pointer ${n.unread ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex items-start gap-2">
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />}
                        <div className={n.unread ? "" : "ml-3.5"}>
                          <p className="text-xs text-foreground">{n.text}</p>
                          <span className="text-[10px] text-muted-foreground">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-border">
                  <button className="w-full text-xs text-primary hover:underline text-center py-1">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-secondary transition-colors"
          >
            <div className={`h-7 w-7 rounded-full flex items-center justify-center ${isAdmin ? "bg-destructive/20" : "bg-primary/20"}`}>
              {isAdmin ? (
                <Crown className="h-3.5 w-3.5 text-destructive" />
              ) : (
                <User className="h-3.5 w-3.5 text-primary" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 glass-card shadow-xl z-50"
              >
                {/* User info */}
                <div className="p-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${isAdmin ? "bg-destructive/20" : "bg-primary/20"}`}>
                      {isAdmin ? (
                        <Crown className="h-4 w-4 text-destructive" />
                      ) : (
                        <User className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{currentUser.name}</p>
                      <p className="text-[11px] text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded-full font-medium ${isAdmin ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                      {currentUser.plan}
                    </span>
                    {!isAdmin && <span className="text-muted-foreground">· {currentUser.credits}</span>}
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-1">
                  {userMenuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { setShowUserMenu(false); item.onClick?.(); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-md hover:bg-secondary transition-colors ${
                        (item as any).accent ? "text-destructive font-medium" : "text-foreground"
                      }`}
                    >
                      <item.icon className={`h-3.5 w-3.5 ${(item as any).accent ? "text-destructive" : "text-muted-foreground"}`} />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border p-1">
                  {secondaryItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-foreground rounded-md hover:bg-secondary transition-colors"
                    >
                      <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border p-1">
                  <button
                    onClick={() => { setShowUserMenu(false); navigate("/auth"); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-destructive rounded-md hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
