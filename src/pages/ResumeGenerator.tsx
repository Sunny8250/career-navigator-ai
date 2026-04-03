import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, Upload, FileText, CheckCircle2, AlertTriangle, ArrowUp, Minus, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const analysisMetrics = [
  { label: "Keyword Match", score: 72, color: "bg-warning" },
  { label: "Format & Structure", score: 88, color: "bg-success" },
  { label: "Readability", score: 65, color: "bg-warning" },
  { label: "Impact Metrics", score: 50, color: "bg-destructive" },
];

const aiImprovements = [
  { text: "Add quantifiable metrics to work experience bullets", priority: "high" as const },
  { text: "Include GraphQL and CI/CD in skills section", priority: "high" as const },
  { text: "Rewrite summary with stronger action verbs", priority: "medium" as const },
  { text: "Add links to portfolio and GitHub projects", priority: "medium" as const },
  { text: "Improve education section formatting", priority: "low" as const },
];

const priorityConfig = {
  high: { label: "High", color: "bg-destructive/10 text-destructive" },
  medium: { label: "Medium", color: "bg-warning/10 text-warning" },
  low: { label: "Low", color: "bg-info/10 text-info" },
};

export default function ResumeGenerator() {
  const [atsScore] = useState(72);
  const isMobile = useIsMobile();

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Resume Builder</h1>
          <p className="text-xs text-muted-foreground mt-0.5">AI-powered resume tailored to your target job</p>
        </div>
      </div>

      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-5 h-[calc(100vh-12rem)]"}`}>
        {/* LEFT SIDE */}
        <div className={`${isMobile ? "" : "col-span-3"} flex flex-col gap-4 overflow-y-auto pr-1`}>
          {/* Job Description Input */}
          <div className="glass-card p-4 md:p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Job Description</h3>
            <textarea
              className="w-full bg-secondary border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              rows={isMobile ? 3 : 4}
              placeholder="Paste the job description here to generate a tailored resume..."
            />
            <div className={`flex gap-2 mt-3 ${isMobile ? "flex-col" : ""}`}>
              <button className="flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex-1 justify-center">
                <Sparkles className="h-4 w-4" />
                Generate Resume
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-muted transition-colors justify-center">
                <Upload className="h-4 w-4" />
                Upload Existing
              </button>
            </div>
          </div>

          {/* ATS Score */}
          <div className="glass-card p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">ATS Compatibility Score</span>
              </div>
              <span className={`text-2xl font-bold ${atsScore >= 80 ? "text-success" : atsScore >= 60 ? "text-warning" : "text-destructive"}`}>{atsScore}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${atsScore}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${atsScore >= 80 ? "bg-success" : atsScore >= 60 ? "bg-warning" : "bg-destructive"}`}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Add missing keywords to improve your score to 90%+</p>
          </div>

          {/* Detailed Analysis */}
          <div className="glass-card p-4 md:p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Detailed Analysis</h3>
            <div className="space-y-3">
              {analysisMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{metric.label}</span>
                    <span className="text-xs font-medium text-muted-foreground">{metric.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      className={`h-full rounded-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Improvements */}
          <div className="glass-card p-4 md:p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI Improvements
            </h3>
            <div className="space-y-2">
              {aiImprovements.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 surface-2 rounded-md">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 mt-0.5 ${priorityConfig[item.priority].color}`}>
                    {priorityConfig[item.priority].label}
                  </span>
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Resume Preview */}
        <div className={`${isMobile ? "" : "col-span-2"} glass-card flex flex-col`}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Resume Preview</h3>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-5">
              <div className="border-b border-border pb-4">
                <h2 className="text-lg font-bold text-foreground">John Doe</h2>
                <p className="text-xs text-primary mt-0.5">Senior Frontend Engineer</p>
                <p className="text-xs text-muted-foreground mt-1">john@example.com · (555) 123-4567 · San Francisco, CA</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Summary</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  3+ years building <span className="text-primary">scalable React & TypeScript</span> applications. Expert in modern CSS, responsive design, and component architecture with a focus on performance optimization.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Experience</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-xs font-medium text-foreground">Frontend Engineer · TechCorp</span>
                      <span className="text-[10px] text-muted-foreground">2022 - Present</span>
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      <li className="text-xs text-muted-foreground">• Architected high-performance UI serving 100K+ users</li>
                      <li className="text-xs text-muted-foreground">• Integrated RESTful APIs with robust error handling</li>
                      <li className="text-xs text-muted-foreground">• Reduced bundle size by 35% through code splitting</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-xs font-medium text-foreground">Junior Developer · StartupXYZ</span>
                      <span className="text-[10px] text-muted-foreground">2020 - 2022</span>
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      <li className="text-xs text-muted-foreground">• Built responsive landing pages and dashboards</li>
                      <li className="text-xs text-muted-foreground">• Implemented CI/CD pipelines with GitHub Actions</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {["React", "TypeScript", "JavaScript", "CSS", "Node.js", "REST APIs", "Git", "Agile"].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-secondary text-[10px] text-muted-foreground rounded">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Education</h4>
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-xs text-foreground">B.S. Computer Science · State University</span>
                  <span className="text-[10px] text-muted-foreground">2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
