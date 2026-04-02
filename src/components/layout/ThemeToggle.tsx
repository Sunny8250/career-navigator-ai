import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-md hover:bg-secondary transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        key={resolvedTheme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Moon className="h-4 w-4 text-muted-foreground" />
        )}
      </motion.div>
    </button>
  );
}
