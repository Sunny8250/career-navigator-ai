import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ label, value, change, icon: Icon, iconColor = "text-primary" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
        <div className={`p-1.5 rounded-md bg-secondary ${iconColor}`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
      {change && <span className="text-xs text-success mt-1 inline-block">{change}</span>}
    </motion.div>
  );
}
