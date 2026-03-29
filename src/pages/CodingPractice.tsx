import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Lightbulb, BookOpen, CheckCircle2, Clock, BarChart3 } from "lucide-react";

export default function CodingPractice() {
  const [showHint, setShowHint] = useState(false);
  const [code, setCode] = useState(`function twoSum(nums, target) {\n  // Your solution here\n  \n}`);
  const [output, setOutput] = useState("");

  const handleRun = () => {
    setOutput("Running...\n\nTest Case 1: [2,7,11,15], target=9\nExpected: [0,1]\nOutput: undefined\n\n❌ 0/3 test cases passed");
  };

  return (
    <div className="max-w-6xl flex gap-4 h-[calc(100vh-8rem)]">
      {/* Problem + AI Panel */}
      <div className="w-80 shrink-0 flex flex-col gap-4">
        {/* Problem */}
        <div className="glass-card p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded font-medium">Medium</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>~20 min</span>
            </div>
          </div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Two Sum</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Given an array of integers <code className="text-primary bg-primary/10 px-1 rounded">nums</code> and an integer <code className="text-primary bg-primary/10 px-1 rounded">target</code>, return indices of the two numbers such that they add up to target.
          </p>
          <div className="mt-3 p-3 surface-2 rounded-md">
            <p className="text-xs text-muted-foreground font-mono">
              Input: nums = [2,7,11,15], target = 9{"\n"}
              Output: [0,1]
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Array", "Hash Map"].map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-secondary text-xs text-muted-foreground rounded">{tag}</span>
            ))}
          </div>
        </div>

        {/* AI Panel */}
        <div className="glass-card p-4 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI Assistant
          </h3>
          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full flex items-center gap-2 text-xs font-medium bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <Lightbulb className="h-3.5 w-3.5 text-warning" />
            {showHint ? "Hide Hint" : "Get Hint"}
          </button>
          {showHint && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="p-3 surface-2 rounded-md">
              <p className="text-xs text-muted-foreground">
                Think about using a <span className="text-primary">hash map</span> to store each number's complement. For each element, check if its complement already exists in the map.
              </p>
            </motion.div>
          )}
          <button className="w-full flex items-center gap-2 text-xs font-medium bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-muted transition-colors">
            <BookOpen className="h-3.5 w-3.5 text-info" />
            Explain Solution
          </button>
        </div>
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Editor */}
        <div className="flex-1 glass-card flex flex-col">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">solution.js</span>
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 text-xs font-medium bg-success text-success-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
            >
              <Play className="h-3.5 w-3.5" />
              Run
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent p-4 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="glass-card h-40">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Output</span>
            {output && (
              <div className="flex items-center gap-1 text-xs">
                <BarChart3 className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">0/3 passed</span>
              </div>
            )}
          </div>
          <pre className="p-4 text-xs text-muted-foreground font-mono overflow-auto h-[calc(100%-2.5rem)]">
            {output || "Click 'Run' to execute your code..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
