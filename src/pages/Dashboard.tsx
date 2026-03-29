import { motion } from "framer-motion";
import { Briefcase, FileCheck, Trophy, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AISuggestionCard } from "@/components/ui/ai-suggestion-card";
import { useNavigate } from "react-router-dom";

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6 max-w-6xl">
      {/* Next Action */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-primary/20 p-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Your next step</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Complete your resume for the Frontend Developer role at Stripe
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/resume")}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:gap-2 transition-all bg-primary/10 px-3 py-1.5 rounded-md"
        >
          Continue <ArrowRight className="h-3 w-3" />
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Applications" value={24} change="+3 this week" icon={Briefcase} />
        <StatCard label="Interviews" value={8} change="+2 scheduled" icon={FileCheck} iconColor="text-info" />
        <StatCard label="Offers" value={2} icon={Trophy} iconColor="text-success" />
        <StatCard label="Success Rate" value="34%" change="+5% vs last month" icon={TrendingUp} iconColor="text-warning" />
      </div>

      {/* AI Suggestions */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Suggestions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AISuggestionCard
            title="Optimize your resume"
            description="Your resume is missing 3 key skills for the Google SWE role. Let AI help you add them."
            action="Improve resume"
            onClick={() => navigate("/resume")}
          />
          <AISuggestionCard
            title="Practice system design"
            description="You have a system design interview in 3 days. Practice with AI mock questions."
            action="Start practice"
            onClick={() => navigate("/interview")}
          />
          <AISuggestionCard
            title="Solve coding problems"
            description="Complete 2 medium-level problems to improve your coding readiness score."
            action="Start coding"
            onClick={() => navigate("/coding")}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h2>
        <div className="glass-card divide-y divide-border">
          {[
            { text: "Applied to Frontend Developer at Stripe", time: "2h ago", color: "bg-primary" },
            { text: "Completed mock interview for Google", time: "5h ago", color: "bg-success" },
            { text: "Resume ATS score improved to 87%", time: "1d ago", color: "bg-warning" },
            { text: "Solved 3 LeetCode-style problems", time: "2d ago", color: "bg-info" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className={`w-1.5 h-1.5 rounded-full ${item.color} shrink-0`} />
              <span className="text-sm text-foreground flex-1">{item.text}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
