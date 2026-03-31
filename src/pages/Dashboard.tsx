import { motion } from "framer-motion";
import { Briefcase, FileCheck, Trophy, TrendingUp, ArrowRight, Sparkles, Flame, Target } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AISuggestionCard } from "@/components/ui/ai-suggestion-card";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const activityData = [
  { day: "Mon", applications: 3, practice: 2 },
  { day: "Tue", applications: 1, practice: 4 },
  { day: "Wed", applications: 5, practice: 1 },
  { day: "Thu", applications: 2, practice: 3 },
  { day: "Fri", applications: 4, practice: 5 },
  { day: "Sat", applications: 0, practice: 2 },
  { day: "Sun", applications: 1, practice: 1 },
];

const pipeline = [
  { stage: "Applied", count: 24, color: "bg-info" },
  { stage: "Screening", count: 12, color: "bg-primary" },
  { stage: "Interview", count: 8, color: "bg-warning" },
  { stage: "Offer", count: 2, color: "bg-success" },
];

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

      {/* Stats + Streak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Applications" value={24} change="+3 this week" icon={Briefcase} />
        <StatCard label="Interviews" value={8} change="+2 scheduled" icon={FileCheck} iconColor="text-info" />
        <StatCard label="Offers" value={2} icon={Trophy} iconColor="text-success" />
        <StatCard label="Success Rate" value="34%" change="+5% vs last month" icon={TrendingUp} iconColor="text-warning" />
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 flex flex-col items-center justify-center">
          <Flame className="h-6 w-6 text-warning mb-1" />
          <span className="text-2xl font-bold text-foreground">7</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Day Streak</span>
        </motion.div>
      </div>

      {/* Weekly Activity + Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Weekly Activity</h2>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Applications</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> Practice</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPractice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 10% 16%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215 15% 52%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215 15% 52%)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(228 12% 10%)", border: "1px solid hsl(228 10% 16%)", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "hsl(210 20% 92%)" }}
              />
              <Area type="monotone" dataKey="applications" stroke="hsl(217 91% 60%)" fill="url(#colorApps)" strokeWidth={2} />
              <Area type="monotone" dataKey="practice" stroke="hsl(142 71% 45%)" fill="url(#colorPractice)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Application Pipeline */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Pipeline</h2>
          </div>
          <div className="space-y-3">
            {pipeline.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground">{stage.stage}</span>
                  <span className="text-xs font-mono text-muted-foreground">{stage.count}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stage.count / pipeline[0].count) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full ${stage.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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
