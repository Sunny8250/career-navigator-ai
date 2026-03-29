import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AISuggestionCardProps {
  title: string;
  description: string;
  action: string;
  onClick?: () => void;
}

export function AISuggestionCard({ title, description, action, onClick }: AISuggestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className="glass-card-hover p-4 cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground mb-0.5">{title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          <span className="inline-flex items-center gap-1 text-xs text-primary mt-2 font-medium group-hover:gap-1.5 transition-all">
            {action}
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
