import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resume_text, job_description } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert ATS resume analyzer. Analyze the resume against the job description and return structured feedback.`,
          },
          {
            role: "user",
            content: `Resume:\n${resume_text}\n\nJob Description:\n${job_description}\n\nAnalyze this resume for ATS compatibility.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "ats_analysis",
              description: "Return ATS resume analysis results",
              parameters: {
                type: "object",
                properties: {
                  overall_score: { type: "number", description: "Overall ATS score 0-100" },
                  keyword_match: { type: "number", description: "Keyword match score 0-100" },
                  format_score: { type: "number", description: "Format & structure score 0-100" },
                  readability_score: { type: "number", description: "Readability score 0-100" },
                  impact_score: { type: "number", description: "Impact metrics score 0-100" },
                  improvements: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string" },
                        priority: { type: "string", enum: ["high", "medium", "low"] },
                      },
                      required: ["text", "priority"],
                    },
                  },
                  missing_keywords: { type: "array", items: { type: "string" } },
                },
                required: ["overall_score", "keyword_match", "format_score", "readability_score", "impact_score", "improvements", "missing_keywords"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "ats_analysis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limited, try again later" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    const result = toolCall ? JSON.parse(toolCall.function.arguments) : null;

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
