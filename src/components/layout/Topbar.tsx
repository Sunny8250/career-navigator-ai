import { Search, Bell, Zap, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Topbar() {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Search */}
      <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 w-72">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search jobs, skills, actions..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
        <kbd className="hidden sm:inline text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Credits */}
        <div className="flex items-center gap-1.5 bg-secondary rounded-md px-2.5 py-1.5 text-xs">
          <Zap className="h-3.5 w-3.5 text-warning" />
          <span className="text-muted-foreground">3 AI credits left</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-secondary transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* Profile */}
        <Link to="/auth" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-secondary transition-colors">
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
        </Link>
      </div>
    </header>
  );
}
