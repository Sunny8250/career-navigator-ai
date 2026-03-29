import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Crown, X, CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: ["5 AI credits/day", "Basic resume builder", "3 job applications", "Community support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    icon: Sparkles,
    features: ["50 AI credits/day", "Advanced resume builder", "Unlimited applications", "Interview prep", "Priority support"],
    popular: true,
  },
  {
    name: "Pro+",
    price: "$39",
    period: "/month",
    icon: Crown,
    features: ["Unlimited AI credits", "All Pro features", "Coding practice", "1-on-1 AI coaching", "Resume reviews", "Priority placement"],
    popular: false,
  },
];

type FlowState = "select" | "confirm" | "success" | "failure";

export default function Pricing() {
  const [selected, setSelected] = useState<string | null>(null);
  const [flowState, setFlowState] = useState<FlowState>("select");

  const handleSelect = (plan: string) => {
    setSelected(plan);
    setFlowState("confirm");
  };

  const handleConfirm = () => {
    setFlowState(Math.random() > 0.2 ? "success" : "failure");
  };

  const handleBack = () => {
    setFlowState("select");
    setSelected(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AnimatePresence mode="wait">
        {flowState === "select" && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground">Choose your plan</h1>
              <p className="text-sm text-muted-foreground mt-1">Unlock the full power of AI for your career</p>
            </div>

            {/* Current Plan */}
            <div className="glass-card p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">Current Plan</span>
                <p className="text-sm font-medium text-foreground">Free · 3 credits remaining</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-warning">
                <Zap className="h-3.5 w-3.5" />
                Low credits
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ scale: 1.02 }}
                  className={`glass-card p-5 relative flex flex-col ${plan.popular ? "border-primary/40 ring-1 ring-primary/20" : ""}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <plan.icon className={`h-4 w-4 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm font-semibold text-foreground">{plan.name}</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-success shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelect(plan.name)}
                    className={`w-full py-2 rounded-md text-sm font-medium transition-all ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {plan.name === "Free" ? "Current Plan" : "Upgrade"}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {flowState === "confirm" && (
          <motion.div key="confirm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
            <div className="glass-card p-6 text-center">
              <h2 className="text-lg font-semibold text-foreground mb-2">Confirm Upgrade</h2>
              <p className="text-sm text-muted-foreground mb-6">
                You're upgrading to <span className="text-primary font-medium">{selected}</span>
              </p>
              <div className="surface-2 rounded-md p-4 mb-6 text-left">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{selected} Plan</span>
                  <span className="text-foreground">{plans.find((p) => p.name === selected)?.price}/mo</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-sm font-medium">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{plans.find((p) => p.name === selected)?.price}/mo</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleBack} className="flex-1 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button onClick={handleConfirm} className="flex-1 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity">
                  Confirm Payment
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {flowState === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center">
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Welcome to {selected}!</h2>
              <p className="text-sm text-muted-foreground mb-6">Your account has been upgraded successfully.</p>
              <button onClick={handleBack} className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm hover:opacity-90 transition-opacity">
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        )}

        {flowState === "failure" && (
          <motion.div key="failure" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center">
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Payment Failed</h2>
              <p className="text-sm text-muted-foreground mb-6">Something went wrong. Please try again.</p>
              <button onClick={() => setFlowState("confirm")} className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm hover:opacity-90 transition-opacity">
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
