import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, Briefcase, FileText, MessageSquare, Code2, CreditCard, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const commands = [
  { label: "Dashboard", description: "Go to dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Job Tracker", description: "Track your applications", icon: Briefcase, path: "/jobs" },
  { label: "Resume Builder", description: "Generate AI resume", icon: FileText, path: "/resume" },
  { label: "Interview Prep", description: "Practice mock interviews", icon: MessageSquare, path: "/interview" },
  { label: "Coding Practice", description: "Solve coding problems", icon: Code2, path: "/coding" },
  { label: "Pricing", description: "View plans & billing", icon: CreditCard, path: "/pricing" },
  { label: "Admin Panel", description: "Manage platform", icon: Shield, path: "/admin" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false);
      setQuery("");
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!open) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex].path);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, filtered, selectedIndex, handleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="glass-card shadow-2xl shadow-primary/5 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">ESC</kbd>
              </div>
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">No results found</p>
                ) : (
                  filtered.map((cmd, i) => (
                    <button
                      key={cmd.path}
                      onClick={() => handleSelect(cmd.path)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        selectedIndex === i ? "bg-primary/10" : "hover:bg-secondary/50"
                      }`}
                    >
                      <cmd.icon className={`h-4 w-4 shrink-0 ${selectedIndex === i ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${selectedIndex === i ? "text-primary" : "text-foreground"}`}>{cmd.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{cmd.description}</p>
                      </div>
                      {selectedIndex === i && <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
