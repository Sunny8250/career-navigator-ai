import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, Eye, ArrowLeftRight, CheckCircle2, AlertTriangle } from "lucide-react";

const keywords = [
  { word: "React", present: true },
  { word: "TypeScript", present: true },
  { word: "GraphQL", present: false },
  { word: "REST APIs", present: true },
  { word: "CI/CD", present: false },
  { word: "Agile", present: true },
  { word: "Testing", present: false },
];

export default function ResumeGenerator() {
  const [atsScore] = useState(72);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Resume Generator</h1>
          <p className="text-xs text-muted-foreground mt-0.5">AI-powered resume tailored to your target job</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center gap-1.5 text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md hover:bg-muted transition-colors"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            {showComparison ? "Editor" : "Compare"}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
            <Download className="h-3.5 w-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* ATS Score */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">ATS Compatibility Score</span>
          </div>
          <span className="text-lg font-semibold text-warning">{atsScore}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${atsScore}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-warning rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Add missing keywords to improve your score to 90%+</p>
      </motion.div>

      {showComparison ? (
        /* Comparison View */
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Original Resume</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">John Doe</strong> — Frontend Developer</p>
              <p>3 years of experience building web applications with React and JavaScript. Familiar with CSS and HTML.</p>
              <p>• Built user interfaces for e-commerce platform</p>
              <p>• Worked with REST APIs</p>
              <p>• Used Git for version control</p>
            </div>
          </div>
          <div className="glass-card p-5 border-primary/20">
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">AI-Optimized</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">John Doe</strong> — Senior Frontend Engineer</p>
              <p>3+ years building <span className="text-primary">scalable React & TypeScript</span> applications. Expert in <span className="text-primary">modern CSS, responsive design, and component architecture</span>.</p>
              <p>• Architected and shipped <span className="text-primary">high-performance UI</span> for e-commerce platform serving 100K+ users</p>
              <p>• Integrated <span className="text-primary">RESTful APIs</span> with robust error handling and caching</p>
              <p>• Implemented <span className="text-primary">CI/CD pipelines</span> and <span className="text-primary">automated testing</span> workflows</p>
            </div>
          </div>
        </div>
      ) : (
        /* Editor View */
        <div className="grid grid-cols-3 gap-4">
          {/* Input */}
          <div className="col-span-2 glass-card p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Resume Content</h3>
            <div className="space-y-4">
              {["Summary", "Experience", "Skills", "Education"].map((section) => (
                <div key={section}>
                  <label className="text-xs font-medium text-foreground block mb-1.5">{section}</label>
                  <textarea
                    className="w-full bg-secondary border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    rows={section === "Experience" ? 5 : 3}
                    placeholder={`Enter your ${section.toLowerCase()}...`}
                  />
                </div>
              ))}
              <button className="flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity w-full justify-center">
                <Sparkles className="h-4 w-4" />
                Optimize with AI
              </button>
            </div>
          </div>

          {/* Keywords */}
          <div className="glass-card p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Keyword Analysis</h3>
            <div className="space-y-2">
              {keywords.map((kw) => (
                <div key={kw.word} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-foreground">{kw.word}</span>
                  {kw.present ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 surface-2 rounded-md">
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">AI Tip:</span> Add GraphQL, CI/CD, and Testing to your skills section to boost your ATS score by ~18%.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
