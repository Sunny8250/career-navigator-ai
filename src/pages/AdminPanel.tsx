import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, DollarSign, CreditCard, TrendingUp, CheckCircle2, XCircle, Eye, Search, Filter } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6800 },
  { month: "May", revenue: 9400 },
  { month: "Jun", revenue: 11200 },
  { month: "Jul", revenue: 13800 },
];

const users = [
  { name: "Alex Chen", email: "alex@example.com", plan: "Pro", credits: 45, status: "active" as const, joinDate: "Jan 15, 2025" },
  { name: "Sarah Kim", email: "sarah@example.com", plan: "Free", credits: 3, status: "active" as const, joinDate: "Feb 02, 2025" },
  { name: "James Lee", email: "james@example.com", plan: "Pro+", credits: 100, status: "active" as const, joinDate: "Dec 10, 2024" },
  { name: "Maya Patel", email: "maya@example.com", plan: "Pro", credits: 22, status: "blocked" as const, joinDate: "Mar 01, 2025" },
  { name: "David Wu", email: "david@example.com", plan: "Free", credits: 0, status: "active" as const, joinDate: "Mar 18, 2025" },
];

const pendingJobs = [
  { id: 1, title: "Senior React Developer", company: "TechCorp", postedBy: "alex@example.com", date: "Mar 25", status: "pending" as const },
  { id: 2, title: "ML Engineer Intern", company: "DataFlow", postedBy: "sarah@example.com", date: "Mar 24", status: "pending" as const },
  { id: 3, title: "DevOps Engineer", company: "CloudFirst", postedBy: "james@example.com", date: "Mar 23", status: "pending" as const },
];

const planColors: Record<string, string> = {
  Free: "bg-secondary text-secondary-foreground",
  Pro: "bg-primary/10 text-primary",
  "Pro+": "bg-success/10 text-success",
};

const statusColors = {
  active: "bg-success/10 text-success",
  blocked: "bg-destructive/10 text-destructive",
};

const jobStatusColors = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

type AdminTab = "overview" | "users" | "jobs";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [chartFilter, setChartFilter] = useState(2);
  const [userFilter, setUserFilter] = useState("all");
  const [jobQueue, setJobQueue] = useState(pendingJobs.map(j => ({ ...j })));

  const handleJobAction = (id: number, action: "approved" | "rejected") => {
    setJobQueue(prev => prev.map(j => j.id === id ? { ...j, status: action } : j));
  };

  const filteredUsers = users.filter(u => {
    if (userFilter === "all") return true;
    if (userFilter === "active") return u.status === "active";
    if (userFilter === "blocked") return u.status === "blocked";
    if (userFilter === "free") return u.plan === "Free";
    if (userFilter === "paid") return u.plan !== "Free";
    return true;
  });

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
        <div className="flex gap-1">
          {(["overview", "users", "jobs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-3 py-1.5 rounded-md capitalize transition-colors ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "jobs" ? "Job Moderation" : tab === "users" ? "Users" : "Overview"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Users" value="2,847" change="+12% this month" icon={Users} />
            <StatCard label="Total Jobs" value="1,234" icon={Briefcase} iconColor="text-info" />
            <StatCard label="Revenue" value="$13.8k" change="+18% vs last month" icon={DollarSign} iconColor="text-success" />
            <StatCard label="Active Subs" value="892" change="+5%" icon={CreditCard} iconColor="text-warning" />
          </div>

          {/* Revenue Chart */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Revenue Analytics</h2>
              </div>
              <div className="flex gap-1">
                {["Daily", "Weekly", "Monthly"].map((filter, i) => (
                  <button
                    key={filter}
                    onClick={() => setChartFilter(i)}
                    className={`text-xs px-2.5 py-1 rounded ${chartFilter === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"} transition-colors`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 10% 16%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 15% 52%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 15% 52%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(228 12% 10%)", border: "1px solid hsl(228 10% 16%)", borderRadius: "8px", fontSize: "12px" }}
                  labelStyle={{ color: "hsl(210 20% 92%)" }}
                  itemStyle={{ color: "hsl(217 91% 60%)" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[
                { key: "all", label: "All" },
                { key: "active", label: "Active" },
                { key: "blocked", label: "Blocked" },
                { key: "free", label: "Free" },
                { key: "paid", label: "Paid" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setUserFilter(f.key)}
                  className={`text-xs px-2.5 py-1 rounded transition-colors ${
                    userFilter === f.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Users Table */}
          <div className="glass-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Name</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Email</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Plan</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Credits</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Joined</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.email} className="hover:bg-secondary/50 transition-colors">
                      <td className="p-3 text-sm text-foreground">{user.name}</td>
                      <td className="p-3 text-sm text-muted-foreground">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${planColors[user.plan]}`}>{user.plan}</span>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{user.credits}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColors[user.status]}`}>{user.status}</span>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive" title={user.status === "active" ? "Block" : "Unblock"}>
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="space-y-4">
          <div className="glass-card">
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Approval Queue</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{jobQueue.filter(j => j.status === "pending").length} pending review</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Job Title</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Company</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Posted By</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Date</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {jobQueue.map((job) => (
                    <tr key={job.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="p-3 text-sm text-foreground">{job.title}</td>
                      <td className="p-3 text-sm text-muted-foreground">{job.company}</td>
                      <td className="p-3 text-sm text-muted-foreground">{job.postedBy}</td>
                      <td className="p-3 text-sm text-muted-foreground">{job.date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${jobStatusColors[job.status]}`}>{job.status}</span>
                      </td>
                      <td className="p-3">
                        {job.status === "pending" ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleJobAction(job.id, "approved")} className="p-1 rounded hover:bg-success/10 transition-colors text-muted-foreground hover:text-success" title="Approve">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={() => handleJobAction(job.id, "rejected")} className="p-1 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Reject">
                              <XCircle className="h-3.5 w-3.5" />
                            </button>
                            <button className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="View">
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground capitalize">{job.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
