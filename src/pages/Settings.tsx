import { useState } from "react";
import { User, Bell, Palette, Shield, Save, Camera, Mail, Phone, MapPin, Briefcase, Globe, BellRing, BellOff, MessageSquare, FileText, Zap, Sun, Moon, Monitor, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useRole } from "@/hooks/use-role";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "account", label: "Account", icon: Shield },
] as const;

type Tab = typeof tabs[number]["id"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 rounded-lg p-1 w-fit overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "notifications" && <NotificationsSection />}
        {activeTab === "appearance" && <AppearanceSection />}
        {activeTab === "account" && <AccountSection />}
      </motion.div>
    </div>
  );
}

function ProfileSection() {
  const [form, setForm] = useState({
    name: "Alex Johnson",
    email: "alex@careerai.io",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    website: "https://alexjohnson.dev",
    bio: "Passionate full-stack developer with 5+ years of experience in React and Node.js.",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Profile Photo</h3>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-7 w-7 text-primary" />
            </div>
            <button className="absolute inset-0 rounded-full bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="h-4 w-4 text-foreground" />
            </button>
          </div>
          <div>
            <button className="text-xs font-medium text-primary hover:underline">Upload photo</button>
            <p className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG. Max 2MB.</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="glass-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={User} label="Full Name" value={form.name} onChange={(v) => update("name", v)} />
          <Field icon={Mail} label="Email" value={form.email} onChange={(v) => update("email", v)} />
          <Field icon={Phone} label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
          <Field icon={MapPin} label="Location" value={form.location} onChange={(v) => update("location", v)} />
          <Field icon={Briefcase} label="Job Title" value={form.title} onChange={(v) => update("title", v)} />
          <Field icon={Globe} label="Website" value={form.website} onChange={(v) => update("website", v)} />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
            rows={3}
            className="w-full bg-secondary rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => toast.success("Profile updated")}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange }: { icon: any; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground font-medium mb-1 flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-secondary rounded-md px-3 py-2 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors"
      />
    </div>
  );
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    emailApplications: true,
    emailInterviews: true,
    emailAiSuggestions: false,
    emailWeeklyDigest: true,
    pushNewMessages: true,
    pushStatusChanges: true,
    pushReminders: false,
    marketingEmails: false,
  });

  const toggle = (key: string) => setPrefs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));

  const groups = [
    {
      title: "Email Notifications",
      icon: Mail,
      items: [
        { key: "emailApplications", label: "Application updates", desc: "When your application status changes" },
        { key: "emailInterviews", label: "Interview reminders", desc: "Upcoming interview notifications" },
        { key: "emailAiSuggestions", label: "AI suggestions", desc: "Personalized career recommendations" },
        { key: "emailWeeklyDigest", label: "Weekly digest", desc: "Summary of your weekly activity" },
      ],
    },
    {
      title: "Push Notifications",
      icon: BellRing,
      items: [
        { key: "pushNewMessages", label: "New messages", desc: "When you receive a new message" },
        { key: "pushStatusChanges", label: "Status changes", desc: "When job status updates" },
        { key: "pushReminders", label: "Task reminders", desc: "Upcoming deadlines and tasks" },
      ],
    },
    {
      title: "Marketing",
      icon: MessageSquare,
      items: [
        { key: "marketingEmails", label: "Product updates", desc: "New features and announcements" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.title} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
            <group.icon className="h-4 w-4 text-muted-foreground" />
            {group.title}
          </h3>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-xs font-medium text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${
                    prefs[item.key as keyof typeof prefs] ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <motion.div
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
                    animate={{ left: prefs[item.key as keyof typeof prefs] ? 18 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          onClick={() => toast.success("Notification preferences saved")}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          <Save className="h-3.5 w-3.5" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [sidebarCompact, setSidebarCompact] = useState(false);

  const themes = [
    { id: "dark" as const, label: "Dark", icon: Moon, desc: "Easy on the eyes" },
    { id: "light" as const, label: "Light", icon: Sun, desc: "Classic bright mode" },
    { id: "system" as const, label: "System", icon: Monitor, desc: "Match OS setting" },
  ];

  const fontSizes = [
    { id: "small" as const, label: "Small" },
    { id: "medium" as const, label: "Medium" },
    { id: "large" as const, label: "Large" },
  ];

  return (
    <div className="space-y-4">
      {/* Theme */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); toast.success(`Theme set to ${t.label}`); }}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                theme === t.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <t.icon className={`h-5 w-5 ${theme === t.id ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs font-medium text-foreground">{t.label}</span>
              <span className="text-[10px] text-muted-foreground">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Font Size</h3>
        <div className="flex gap-2">
          {fontSizes.map((f) => (
            <button
              key={f.id}
              onClick={() => setFontSize(f.id)}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
                fontSize === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Compact Sidebar</h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">Show icons only in the sidebar</p>
          </div>
          <button
            onClick={() => setSidebarCompact(!sidebarCompact)}
            className={`w-9 h-5 rounded-full transition-colors relative ${sidebarCompact ? "bg-primary" : "bg-muted"}`}
          >
            <motion.div
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
              animate={{ left: sidebarCompact ? 18 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountSection() {
  const { role, setRole, isAdmin } = useRole();

  return (
    <div className="space-y-4">
      {/* Role Switcher (Demo) */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-1">Role (Demo)</h3>
        <p className="text-[10px] text-muted-foreground mb-3">Switch between admin and user to preview different experiences</p>
        <div className="flex gap-2">
          <button
            onClick={() => { setRole("admin"); toast.success("Switched to Admin"); }}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-md transition-colors ${isAdmin ? "bg-destructive/10 text-destructive border border-destructive/30" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            <Crown className="h-3.5 w-3.5" /> Admin
          </button>
          <button
            onClick={() => { setRole("user"); toast.success("Switched to User"); }}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-md transition-colors ${!isAdmin ? "bg-primary/10 text-primary border border-primary/30" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            <User className="h-3.5 w-3.5" /> User
          </button>
        </div>
      </div>
      {/* Plan */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Current Plan</h3>
        <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Pro Plan</p>
              <p className="text-[10px] text-muted-foreground">$19/month · Renews Jan 15, 2027</p>
            </div>
          </div>
          <button className="text-xs font-medium text-primary hover:underline">Manage</button>
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-5 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Security</h3>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-medium text-foreground">Change Password</p>
            <p className="text-[10px] text-muted-foreground">Last changed 30 days ago</p>
          </div>
          <button className="text-xs font-medium text-primary hover:underline">Update</button>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-medium text-foreground">Two-Factor Authentication</p>
            <p className="text-[10px] text-muted-foreground">Add an extra layer of security</p>
          </div>
          <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded-full font-medium">Not enabled</span>
        </div>
      </div>

      {/* Danger */}
      <div className="glass-card p-5 border-destructive/20">
        <h3 className="text-sm font-semibold text-destructive mb-3">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Delete Account</p>
            <p className="text-[10px] text-muted-foreground">Permanently remove your account and data</p>
          </div>
          <button className="text-xs font-medium text-destructive border border-destructive/30 px-3 py-1.5 rounded-md hover:bg-destructive/10 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
