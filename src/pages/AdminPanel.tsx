import { motion } from "framer-motion";
import { Users, Briefcase, DollarSign, CreditCard, TrendingUp } from "lucide-react";
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
  { name: "Alex Chen", email: "alex@example.com", plan: "Pro" },
  { name: "Sarah Kim", email: "sarah@example.com", plan: "Free" },
  { name: "James Lee", email: "james@example.com", plan: "Pro+" },
  { name: "Maya Patel", email: "maya@example.com", plan: "Pro" },
  { name: "David Wu", email: "david@example.com", plan: "Free" },
];

const planColors: Record<string, string> = {
  Free: "bg-secondary text-secondary-foreground",
  Pro: "bg-primary/10 text-primary",
  "Pro+": "bg-success/10 text-success",
};

export default function AdminPanel() {
  return (
    <div className="max-w-6xl space-y-6">
      <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>

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
                className={`text-xs px-2.5 py-1 rounded ${i === 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"} transition-colors`}
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

      {/* Users Table */}
      <div className="glass-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Email</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-secondary/50 transition-colors">
                  <td className="p-3 text-sm text-foreground">{user.name}</td>
                  <td className="p-3 text-sm text-muted-foreground">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${planColors[user.plan]}`}>{user.plan}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
