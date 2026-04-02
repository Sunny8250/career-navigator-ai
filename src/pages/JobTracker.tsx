import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, MapPin, Clock, ExternalLink, Sparkles, FileText,
  MessageSquare, CheckCircle2, XCircle, AlertCircle, Calendar, DollarSign, Search,
  Plus, Pencil, X, ChevronLeft
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  status: "applied" | "interview" | "saved" | "rejected";
  date: string;
  salary: string;
  skills: string[];
  eligibility: number;
  missingSkills: string[];
  description: string;
  deadline: string;
}

const initialJobs: Job[] = [
  { id: 1, title: "Frontend Developer", company: "Stripe", location: "Remote", status: "interview", date: "Mar 25", salary: "$120k-$160k", skills: ["React", "TypeScript", "CSS"], eligibility: 85, missingSkills: ["GraphQL"], description: "Build and maintain user-facing features for Stripe's payment dashboard. Collaborate with design and product teams to deliver polished, performant UI components.", deadline: "Apr 15, 2025" },
  { id: 2, title: "Software Engineer", company: "Google", location: "Mountain View", status: "applied", date: "Mar 22", salary: "$150k-$200k", skills: ["Go", "Python", "DSA"], eligibility: 70, missingSkills: ["Go", "System Design"], description: "Design and implement scalable backend services. Work on distributed systems handling millions of requests per second.", deadline: "Apr 10, 2025" },
  { id: 3, title: "Full Stack Developer", company: "Notion", location: "San Francisco", status: "saved", date: "Mar 18", salary: "$130k-$170k", skills: ["React", "Node.js", "PostgreSQL"], eligibility: 92, missingSkills: [], description: "Work across the stack to build new features for Notion's collaborative workspace. Focus on real-time collaboration and performance.", deadline: "Apr 20, 2025" },
  { id: 4, title: "Backend Engineer", company: "Linear", location: "Remote", status: "rejected", date: "Mar 15", salary: "$140k-$180k", skills: ["Node.js", "TypeScript", "AWS"], eligibility: 60, missingSkills: ["AWS", "Docker", "CI/CD"], description: "Build and scale Linear's backend infrastructure. Work on API design, database optimization, and real-time sync.", deadline: "Mar 30, 2025" },
  { id: 5, title: "DevOps Engineer", company: "Vercel", location: "Remote", status: "applied", date: "Mar 28", salary: "$130k-$165k", skills: ["Docker", "Kubernetes", "Terraform"], eligibility: 55, missingSkills: ["Kubernetes", "Terraform"], description: "Manage cloud infrastructure and CI/CD pipelines for Vercel's edge network. Automate deployments and monitoring.", deadline: "Apr 25, 2025" },
  { id: 6, title: "ML Engineer", company: "OpenAI", location: "San Francisco", status: "saved", date: "Mar 20", salary: "$180k-$250k", skills: ["Python", "PyTorch", "ML"], eligibility: 45, missingSkills: ["PyTorch", "ML", "CUDA"], description: "Research and develop machine learning models for language understanding. Contribute to cutting-edge AI research.", deadline: "May 1, 2025" },
];

const statusConfig = {
  applied: { label: "Applied", color: "bg-info/10 text-info", icon: Clock },
  interview: { label: "Interview", color: "bg-warning/10 text-warning", icon: AlertCircle },
  saved: { label: "Saved", color: "bg-primary/10 text-primary", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive", icon: XCircle },
};

const statusFilters = [
  { key: "all", label: "All" },
  { key: "applied", label: "Applied" },
  { key: "interview", label: "Interview" },
  { key: "saved", label: "Saved" },
  { key: "rejected", label: "Rejected" },
] as const;

const emptyJob: Omit<Job, "id"> = {
  title: "", company: "", location: "", status: "saved", date: "",
  salary: "", skills: [], eligibility: 0, missingSkills: [],
  description: "", deadline: "",
};

export default function JobTracker() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);
  const isMobile = useIsMobile();

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === "all" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  const handleSaveJob = (jobData: Omit<Job, "id">) => {
    if (editingJob) {
      setJobs((prev) => prev.map((j) => j.id === editingJob.id ? { ...jobData, id: editingJob.id } : j));
      setSelectedJob({ ...jobData, id: editingJob.id });
      toast.success("Job updated successfully");
    } else {
      const newJob = { ...jobData, id: Date.now() };
      setJobs((prev) => [newJob, ...prev]);
      setSelectedJob(newJob);
      toast.success("Job added successfully");
    }
    setShowForm(false);
    setEditingJob(null);
  };

  const openAdd = () => { setEditingJob(null); setShowForm(true); };
  const openEdit = () => { setEditingJob(selectedJob); setShowForm(true); };

  const selectJob = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) setMobileShowDetail(true);
  };

  // Mobile: show either list or detail
  if (isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] pb-16">
        <AnimatePresence>
          {showForm && (
            <JobFormModal
              initial={editingJob || undefined}
              onSave={handleSaveJob}
              onClose={() => { setShowForm(false); setEditingJob(null); }}
            />
          )}
        </AnimatePresence>

        {!mobileShowDetail ? (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Job Applications</h2>
                <button onClick={openAdd} className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
                  <Plus className="h-3.5 w-3.5" /> Add Job
                </button>
              </div>
              <div className="flex items-center gap-2 bg-secondary rounded-md px-2.5 py-1.5">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search jobs..." className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-full" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {statusFilters.map((f) => (
                  <button key={f.key} onClick={() => setStatusFilter(f.key)} className={`text-[10px] px-2 py-1 rounded transition-colors ${statusFilter === f.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
              {filteredJobs.map((job) => {
                const cfg = statusConfig[job.status];
                return (
                  <button key={job.id} onClick={() => selectJob(job)} className="w-full text-left p-3 rounded-lg border border-border bg-card hover:border-muted-foreground/20 hover:bg-secondary/50 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground truncate">{job.title}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ml-2 ${cfg.color}`}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{job.company} · {job.location}</p>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-1.5 py-0.5 bg-secondary text-[10px] text-muted-foreground rounded">{skill}</span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="p-3 border-b border-border flex items-center gap-2">
              <button onClick={() => setMobileShowDetail(false)} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-sm font-semibold text-foreground">Job Details</span>
              <button onClick={openEdit} className="ml-auto flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1.5 rounded-md">
                <Pencil className="h-3 w-3" /> Edit
              </button>
            </div>
            <JobDetailPanel job={selectedJob} />
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)] max-w-6xl">
      <AnimatePresence>
        {showForm && (
          <JobFormModal
            initial={editingJob || undefined}
            onSave={handleSaveJob}
            onClose={() => { setShowForm(false); setEditingJob(null); }}
          />
        )}
      </AnimatePresence>

      {/* Job List */}
      <div className="w-80 shrink-0 glass-card flex flex-col">
        <div className="p-3 border-b border-border space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Job Applications</h2>
            <button onClick={openAdd} className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
              <Plus className="h-3.5 w-3.5" /> Add Job
            </button>
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-md px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search jobs..." className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-full" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {statusFilters.map((f) => (
              <button key={f.key} onClick={() => setStatusFilter(f.key)} className={`text-[10px] px-2 py-1 rounded transition-colors ${statusFilter === f.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">No jobs found</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isActive = selectedJob.id === job.id;
              const cfg = statusConfig[job.status];
              return (
                <button key={job.id} onClick={() => setSelectedJob(job)} className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${isActive ? "border-primary/40 bg-primary/5 shadow-md shadow-primary/5" : "border-border bg-card hover:border-muted-foreground/20 hover:bg-secondary/50"}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground truncate">{job.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ml-2 ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{job.company} · {job.location}</p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-1.5 py-0.5 bg-secondary text-[10px] text-muted-foreground rounded">{skill}</span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-muted-foreground">+{job.skills.length - 3}</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div key={selectedJob.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }} className="flex-1 glass-card overflow-y-auto">
          <div className="p-5 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{selectedJob.title}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{selectedJob.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{selectedJob.location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selectedJob.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={openEdit} className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${statusConfig[selectedJob.status].color}`}>
                  {statusConfig[selectedJob.status].label}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {[
                { icon: FileText, label: "Generate Resume" },
                { icon: MessageSquare, label: "Mock Interview" },
                { icon: ExternalLink, label: "View Posting" },
              ].map((action) => (
                <button key={action.label} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors">
                  <action.icon className="h-3.5 w-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
          <JobDetailPanel job={selectedJob} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function JobDetailPanel({ job }: { job: Job }) {
  return (
    <div className="p-5 space-y-5">
      <section>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
      </section>
      <section>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="surface-2 rounded-md p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Salary</span>
            </div>
            <p className="text-sm font-medium text-foreground">{job.salary}</p>
          </div>
          <div className="surface-2 rounded-md p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Deadline</span>
            </div>
            <p className="text-sm font-medium text-foreground">{job.deadline}</p>
          </div>
          <div className="surface-2 rounded-md p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Briefcase className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Type</span>
            </div>
            <p className="text-sm font-medium text-foreground">Full-time</p>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Required Skills</h3>
        <div className="flex flex-wrap gap-1.5">
          {job.skills.map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">{skill}</span>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI Eligibility Score
        </h3>
        <div className="surface-2 rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-semibold text-foreground">{job.eligibility}%</span>
            <span className={`text-xs font-medium ${job.eligibility >= 80 ? "text-success" : job.eligibility >= 60 ? "text-warning" : "text-destructive"}`}>
              {job.eligibility >= 80 ? "Strong Match" : job.eligibility >= 60 ? "Good Match" : "Needs Work"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${job.eligibility}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${job.eligibility >= 80 ? "bg-success" : job.eligibility >= 60 ? "bg-warning" : "bg-destructive"}`}
            />
          </div>
          {job.missingSkills.length > 0 && (
            <div className="mt-3">
              <span className="text-xs text-muted-foreground">Missing skills:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {job.missingSkills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function JobFormModal({ initial, onSave, onClose }: {
  initial?: Job;
  onSave: (job: Omit<Job, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<Job, "id">>({
    title: initial?.title || "",
    company: initial?.company || "",
    location: initial?.location || "",
    status: initial?.status || "saved",
    date: initial?.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    salary: initial?.salary || "",
    skills: initial?.skills || [],
    eligibility: initial?.eligibility || 0,
    missingSkills: initial?.missingSkills || [],
    description: initial?.description || "",
    deadline: initial?.deadline || "",
  });
  const [skillInput, setSkillInput] = useState("");

  const update = (key: string, value: any) => setForm((p) => ({ ...p, [key]: value }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      update("skills", [...form.skills, s]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", form.skills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company) {
      toast.error("Title and company are required");
      return;
    }
    onSave(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">{initial ? "Edit Job" : "Add New Job"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Job Title *" value={form.title} onChange={(v) => update("title", v)} placeholder="e.g. Frontend Developer" />
            <FormField label="Company *" value={form.company} onChange={(v) => update("company", v)} placeholder="e.g. Stripe" />
            <FormField label="Location" value={form.location} onChange={(v) => update("location", v)} placeholder="e.g. Remote" />
            <FormField label="Salary Range" value={form.salary} onChange={(v) => update("salary", v)} placeholder="e.g. $120k-$160k" />
            <FormField label="Deadline" value={form.deadline} onChange={(v) => update("deadline", v)} placeholder="e.g. Apr 15, 2025" />
            <div>
              <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Status</label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full bg-secondary rounded-md px-3 py-2 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors"
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              placeholder="Job description..."
              className="w-full bg-secondary rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Skills</label>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                placeholder="Type a skill and press Enter"
                className="flex-1 bg-secondary rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors"
              />
              <button type="button" onClick={addSkill} className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded-md hover:bg-primary/20 transition-colors">
                Add
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md font-medium">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-medium text-muted-foreground bg-secondary rounded-md hover:text-foreground transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors">
              {initial ? "Save Changes" : "Add Job"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function FormField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground font-medium mb-1 block">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-secondary rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors"
      />
    </div>
  );
}
