import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Lightbulb, BookOpen, Clock, CheckCircle2, XCircle, Plus } from "lucide-react";

const sampleTestCases = [
  { input: "nums = [2,7,11,15], target = 9", expected: "[0,1]" },
  { input: "nums = [3,2,4], target = 6", expected: "[1,2]" },
  { input: "nums = [3,3], target = 6", expected: "[0,1]" },
];

export default function CodingPractice() {
  const [showHint, setShowHint] = useState(false);
  const [code, setCode] = useState(`function twoSum(nums, target) {\n  // Your solution here\n  \n}`);
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState<"description" | "testcases" | "output">("description");
  const [results, setResults] = useState<{ passed: boolean; input: string; expected: string; got: string }[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [customExpected, setCustomExpected] = useState("");

  const handleRun = () => {
    const mockResults = [
      { passed: false, input: sampleTestCases[0].input, expected: "[0,1]", got: "undefined" },
      { passed: false, input: sampleTestCases[1].input, expected: "[1,2]", got: "undefined" },
      { passed: false, input: sampleTestCases[2].input, expected: "[0,1]", got: "undefined" },
    ];
    setResults(mockResults);
    setOutput(`Running...\n\n❌ 0/${mockResults.length} test cases passed`);
    setActiveTab("output");
  };

  const tabs = ["description", "testcases", "output"] as const;
  const tabLabels = { description: "Description", testcases: "Test Cases", output: "Output" };

  return (
    <div className="max-w-6xl flex gap-4 h-[calc(100vh-8rem)]">
      {/* Left: Problem + Tabs */}
      <div className="w-96 shrink-0 glass-card flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-xs font-medium py-2.5 transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "description" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded font-medium">Medium</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>~20 min</span>
                </div>
              </div>
              <h2 className="text-sm font-semibold text-foreground">Two Sum</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Given an array of integers <code className="text-primary bg-primary/10 px-1 rounded">nums</code> and an integer <code className="text-primary bg-primary/10 px-1 rounded">target</code>, return indices of the two numbers such that they add up to target.
              </p>
              <div className="p-3 surface-2 rounded-md">
                <p className="text-xs text-muted-foreground font-mono">
                  Input: nums = [2,7,11,15], target = 9{"\n"}
                  Output: [0,1]
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Array", "Hash Map"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-secondary text-xs text-muted-foreground rounded">{tag}</span>
                ))}
              </div>

              {/* AI Panel */}
              <div className="border-t border-border pt-4 space-y-2">
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
          )}

          {activeTab === "testcases" && (
            <div className="space-y-3">
              {sampleTestCases.map((tc, i) => (
                <div key={i} className="surface-2 rounded-md p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">Test Case {i + 1}</span>
                    {results[i] !== undefined && (
                      results[i].passed
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                        : <XCircle className="h-3.5 w-3.5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase">Input</span>
                    <p className="text-xs font-mono text-foreground">{tc.input}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase">Expected Output</span>
                    <p className="text-xs font-mono text-foreground">{tc.expected}</p>
                  </div>
                </div>
              ))}

              {/* Custom Test Case */}
              <div className="border-t border-border pt-3">
                <h4 className="text-xs font-medium text-foreground mb-2 flex items-center gap-1.5">
                  <Plus className="h-3 w-3" />
                  Custom Test Case
                </h4>
                <div className="space-y-2">
                  <input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Input..."
                    className="w-full bg-secondary border border-border rounded-md px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                  />
                  <input
                    value={customExpected}
                    onChange={(e) => setCustomExpected(e.target.value)}
                    placeholder="Expected output..."
                    className="w-full bg-secondary border border-border rounded-md px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "output" && (
            <div className="space-y-3">
              {results.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-semibold ${results.some(r => r.passed) ? "text-success" : "text-destructive"}`}>
                      {results.filter(r => r.passed).length}/{results.length} Passed
                    </span>
                  </div>
                  {results.map((r, i) => (
                    <div key={i} className={`surface-2 rounded-md p-3 border-l-2 ${r.passed ? "border-success" : "border-destructive"}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        {r.passed ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                        <span className="text-xs font-medium text-foreground">Test Case {i + 1}</span>
                      </div>
                      <div className="space-y-1 text-xs font-mono">
                        <p className="text-muted-foreground">Input: {r.input}</p>
                        <p className="text-muted-foreground">Expected: {r.expected}</p>
                        <p className={r.passed ? "text-success" : "text-destructive"}>Got: {r.got}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-xs text-muted-foreground">Click 'Run' to execute your code...</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Editor + Output */}
      <div className="flex-1 flex flex-col gap-4">
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
      </div>
    </div>
  );
}
