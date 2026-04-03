import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Bot, User, BarChart3, Star, ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  role: "ai" | "user";
  content: string;
  score?: number;
}

const categories = ["Behavioral", "Technical", "System Design", "Coding"];

const initialMessages: Message[] = [
  { role: "ai", content: "Welcome! I'll be your interviewer today. Let's start with a behavioral question.\n\nTell me about a time you had to work under a tight deadline. How did you handle it?" },
];

const skillBreakdown = [
  { label: "Communication", score: 80 },
  { label: "Problem Solving", score: 70 },
  { label: "Technical Depth", score: 65 },
  { label: "STAR Method", score: 75 },
  { label: "Confidence", score: 85 },
];

const questionProgress = [
  { category: "Behavioral", done: 3, total: 5 },
  { category: "Technical", done: 1, total: 4 },
  { category: "System Design", done: 0, total: 3 },
  { category: "Coding", done: 0, total: 3 },
];

export default function InterviewPrep() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const isMobile = useIsMobile();

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Good answer! You clearly demonstrated time management skills. To strengthen this, try using the STAR method more explicitly — especially the Result part.\n\nNext question: How do you approach debugging a complex issue in production?",
          score: 7,
        },
      ]);
    }, 1200);
  };

  const FeedbackPanel = () => (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Session Feedback</h4>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Overall Score</span>
          <span className="text-2xl font-bold text-foreground">7.5<span className="text-sm text-muted-foreground font-normal">/10</span></span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-success rounded-full" />
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Skill Breakdown</h4>
        <div className="space-y-3">
          {skillBreakdown.map((skill) => (
            <div key={skill.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-foreground">{skill.label}</span>
                <span className="text-xs text-muted-foreground">{skill.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.score}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${skill.score >= 80 ? "bg-success" : skill.score >= 60 ? "bg-warning" : "bg-destructive"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question Progress */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Question Progress</h4>
        <div className="space-y-2">
          {questionProgress.map((qp) => (
            <div key={qp.category} className="flex items-center justify-between text-xs">
              <span className="text-foreground">{qp.category}</span>
              <span className="text-muted-foreground font-mono">{qp.done}/{qp.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">AI Suggestion</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Use more specific metrics when describing impact. Instead of "improved performance," say "reduced load time by 40%."
        </p>
      </div>
    </div>
  );

  // Mobile: toggle between chat and feedback
  if (isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] pb-16">
        {showFeedback ? (
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 border-b border-border flex items-center gap-2">
              <button onClick={() => setShowFeedback(false)} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-sm font-semibold text-foreground">Session Feedback</span>
            </div>
            <div className="p-3">
              <FeedbackPanel />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Header */}
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Mock Interview</h2>
                  <p className="text-xs text-muted-foreground">Question 1 of 5</p>
                </div>
                <button onClick={() => setShowFeedback(true)} className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1.5 rounded-md">
                  <BarChart3 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(i)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                      activeCategory === i ? "bg-primary text-primary-foreground" : "text-muted-foreground bg-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`p-1.5 rounded-md shrink-0 h-fit ${msg.role === "ai" ? "bg-primary/10" : "bg-secondary"}`}>
                    {msg.role === "ai" ? <Bot className="h-3.5 w-3.5 text-primary" /> : <User className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <div className="max-w-[80%] space-y-1.5">
                    <div className={`p-2.5 rounded-lg text-sm ${msg.role === "ai" ? "surface-2 text-foreground" : "bg-primary/10 text-foreground"}`}>
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                    {msg.score && (
                      <div className="flex items-center gap-1.5 px-2">
                        <Star className="h-3 w-3 text-warning" />
                        <span className="text-xs font-medium text-warning">{msg.score}/10</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your answer..."
                  className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={handleSend} className="p-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="max-w-6xl flex gap-4 h-[calc(100vh-8rem)]">
      {/* Chat */}
      <div className="flex-1 glass-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Mock Interview</h2>
              <p className="text-xs text-muted-foreground">Question 1 of 5</p>
            </div>
          </div>
          <div className="flex gap-1">
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(i)}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                  activeCategory === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`p-1.5 rounded-md shrink-0 h-fit ${msg.role === "ai" ? "bg-primary/10" : "bg-secondary"}`}>
                {msg.role === "ai" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="max-w-[75%] space-y-2">
                <div className={`p-3 rounded-lg text-sm ${msg.role === "ai" ? "surface-2 text-foreground" : "bg-primary/10 text-foreground"}`}>
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
                {msg.score && (
                  <div className="flex items-center gap-1.5 px-2">
                    <Star className="h-3 w-3 text-warning" />
                    <span className="text-xs font-medium text-warning">{msg.score}/10</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your answer..."
              className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button onClick={handleSend} className="p-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Feedback Panel */}
      <div className="w-72 shrink-0 overflow-y-auto">
        <FeedbackPanel />
      </div>
    </div>
  );
}
