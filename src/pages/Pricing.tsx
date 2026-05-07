import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Crown, X, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    amount: 0,
    icon: Zap,
    features: ["5 AI credits/day", "Basic resume builder", "3 job applications", "Community support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹1,900",
    period: "/month",
    amount: 1900,
    icon: Sparkles,
    features: ["50 AI credits/day", "Advanced resume builder", "Unlimited applications", "Interview prep", "Priority support"],
    popular: true,
  },
  {
    name: "Pro+",
    price: "₹3,900",
    period: "/month",
    amount: 3900,
    icon: Crown,
    features: ["Unlimited AI credits", "All Pro features", "Coding practice", "1-on-1 AI coaching", "Resume reviews", "Priority placement"],
    popular: false,
  },
];

type FlowState = "select" | "success" | "failure";

declare global {
  interface Window { Razorpay: any }
}

// Load Razorpay checkout script once
function useRazorpayScript() {
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

export default function Pricing() {
  const [selected, setSelected] = useState<string | null>(null);
  const [flowState, setFlowState] = useState<FlowState>("select");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useRazorpayScript();

  const handleUpgrade = async (planName: string) => {
    if (planName === "Free") return;
    if (!user) {
      toast.error("Please sign in first");
      return;
    }
    if (!window.Razorpay) {
      toast.error("Payment system loading, please wait...");
      return;
    }

    setSelected(planName);
    setLoading(true);

    try {
      // Create order on backend
      const { data, error } = await supabase.functions.invoke("razorpay-create-order", {
        body: { plan: planName },
      });
      if (error || !data?.order_id) throw new Error(error?.message || "Failed to create order");

      const rzp = new window.Razorpay({
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "CareerOS AI",
        description: `${planName} Plan Subscription`,
        order_id: data.order_id,
        prefill: { email: user.email },
        theme: { color: "#3b82f6" },
        handler: async (response: any) => {
          // Verify payment on backend
          const { data: verifyData, error: verifyErr } = await supabase.functions.invoke("razorpay-verify-payment", {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
          });
          if (verifyErr || !verifyData?.verified) {
            setFlowState("failure");
          } else {
            setFlowState("success");
            toast.success(`Welcome to ${planName}!`);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.on("payment.failed", () => {
        setFlowState("failure");
        setLoading(false);
      });

      rzp.open();
      setLoading(false);
    } catch (e: any) {
      toast.error(e.message || "Payment failed to initiate");
      setLoading(false);
    }
  };

  const handleBack = () => {
    setFlowState("select");
    setSelected(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 md:p-0">
      <AnimatePresence mode="wait">
        {flowState === "select" && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground">Choose your plan</h1>
              <p className="text-sm text-muted-foreground mt-1">Powered by Razorpay · Secure payments</p>
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
                    onClick={() => handleUpgrade(plan.name)}
                    disabled={loading || plan.name === "Free"}
                    className={`w-full py-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {loading && selected === plan.name ? "Processing..." : plan.name === "Free" ? "Current Plan" : "Upgrade"}
                  </button>
                </motion.div>
              ))}
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
              <p className="text-sm text-muted-foreground mb-6">Your payment was successful and your account has been upgraded.</p>
              <button onClick={handleBack} className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm hover:opacity-90 transition-opacity">
                Continue
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
              <p className="text-sm text-muted-foreground mb-6">Something went wrong with your payment. Please try again.</p>
              <button onClick={handleBack} className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm hover:opacity-90 transition-opacity">
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
