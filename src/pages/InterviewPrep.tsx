import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Bot, User, BarChart3, ChevronRight } from "lucide-react";

interface Message {
  role: "ai" | "user";
  content: string;
}

const initialMessages: Message[] = [
  { role: "ai", content: "Welcome! I'll be your interviewer today. Let's start with a behavioral question.\n\nTell me about a time you had to work under a tight deadline. How did you handle it?" },
];

const difficultyLevels = ["Easy", "Medium", "Hard"];

export default function InterviewPrep() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

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
        },
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-6xl flex gap-4 h-[calc(100vh-8rem)]">
      {/* Chat */}
      <div className="flex-1 glass-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Mock Interview</h2>
            <p className="text-xs text-muted-foreground">Behavioral · Question 1 of 5</p>
          </div>
          <div className="flex items-center gap-2">
            {difficultyLevels.map((level, i) => (
              <button
                key={level}
                onClick={() => setDifficulty(i)}
                className={`text-xs px-2 py-1 rounded ${difficulty === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground bg-secondary"} transition-colors`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="px-4 py-2 border-b border-border">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className={`h-1 flex-1 rounded-full ${step <= 1 ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>

        {/* Messages */}
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
              <div className={`max-w-[75%] p-3 rounded-lg text-sm ${msg.role === "ai" ? "surface-2 text-foreground" : "bg-primary/10 text-foreground"}`}>
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
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

      {/* Feedback Panel */}
      <div className="w-72 shrink-0 space-y-4">
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="w-full glass-card-hover p-4 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Feedback</span>
            </div>
            <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${showFeedback ? "rotate-90" : ""}`} />
          </div>
        </button>

        {showFeedback && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Overall Score</span>
                <span className="text-lg font-semibold text-foreground">7.5<span className="text-xs text-muted-foreground">/10</span></span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-success rounded-full" />
              </div>
            </div>

            {[
              { label: "Clarity", score: 8 },
              { label: "Structure", score: 7 },
              { label: "Confidence", score: 7.5 },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground font-medium">{item.score}/10</span>
              </div>
            ))}

            <div className="p-3 surface-2 rounded-md">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary">AI Suggestion</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Use more specific metrics when describing impact. Instead of "improved performance," say "reduced load time by 40%."
              </p>
            </div>
          </motion.div>
        )}

        <div className="glass-card p-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Session Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="text-foreground">12 min</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Questions</span><span className="text-foreground">1 / 5</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Avg Response</span><span className="text-foreground">45 sec</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
