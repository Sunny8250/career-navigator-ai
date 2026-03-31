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
          <motion.div key="confirm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
            <div className="glass-card p-6 text-center relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4"
              >
                {plans.find((p) => p.name === selected)?.icon &&
                  React.createElement(plans.find((p) => p.name === selected)!.icon, {
                    className: "h-6 w-6 text-primary",
                  })}
              </motion.div>

              <h2 className="text-lg font-semibold text-foreground mb-1">Upgrade to {selected}</h2>
              <p className="text-sm text-muted-foreground mb-5">Unlock more AI power for your career journey</p>

              {/* Features preview */}
              <div className="surface-2 rounded-lg p-4 mb-5 text-left space-y-2">
                {plans
                  .find((p) => p.name === selected)
                  ?.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-success shrink-0" />
                      {f}
                    </div>
                  ))}
              </div>

              {/* Price summary */}
              <div className="surface-2 rounded-lg p-4 mb-6 text-left">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{selected} Plan</span>
                  <span className="text-foreground font-medium">{plans.find((p) => p.name === selected)?.price}/mo</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold">
                  <span className="text-foreground">Total today</span>
                  <span className="text-primary">{plans.find((p) => p.name === selected)?.price}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleBack} className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Confirm & Upgrade
                </motion.button>
              </div>

              <p className="text-[11px] text-muted-foreground mt-4">Cancel anytime · No hidden fees · Instant access</p>
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
