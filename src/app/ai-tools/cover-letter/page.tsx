"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles, ArrowRight, Loader2, Copy, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CoverLetterAIResponse {
  coverLetter: string;
  suggestions?: string[];
  placeholders?: Array<{ key: string; label: string; hint: string }>;
}

export default function CoverLetterPage() {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<CoverLetterAIResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description");
      return;
    }
    setIsGenerating(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription })
      });
      if (!res.ok) throw new Error("Failed to generate cover letter");
      const data: CoverLetterAIResponse = await res.json();
      setResult(data);
    } catch (e) {
      setError("Failed to generate cover letter. Check your OpenAI key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.coverLetter) return;
    await navigator.clipboard.writeText(result.coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-primary to-primary/90 rounded-full mr-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">AI Cover Letter Generator</h1>
            </div>
            <p className="text-muted-foreground">Paste a job description and get a tailored cover letter with placeholders for your projects and metrics.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left: Input Card */}
            <section className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Paste the full job description *</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={16}
                  placeholder="Paste the job description here..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none max-h-[60vh] min-h-[360px] overflow-y-auto"
                />
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                <div className="flex items-center gap-3 mt-4">
                  <Button onClick={handleGenerate} disabled={isGenerating} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-6 py-2 rounded-lg font-medium">
                    {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4 mr-2" />Generate</>}
                  </Button>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Tip: Replace placeholders like [PROJECT_NAME], [TECH_STACK], [IMPACT_METRIC] with your details.
                </div>
              </div>
            </section>

            {/* Right: Output Column */}
            <section className="lg:col-span-3 space-y-6">
              {/* Preview Card */}
              <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Generated Cover Letter</h3>
                  <Button variant="outline" size="sm" onClick={handleCopy} disabled={!result?.coverLetter}>
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />} {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <div className="border border-border bg-background rounded-lg p-4 min-h-[360px] max-h-[60vh] overflow-y-auto whitespace-pre-wrap pr-2">
                  {result?.coverLetter ? result.coverLetter : <span className="text-muted-foreground">Generation output will appear here...</span>}
                </div>
              </div>

              {/* Placeholders Card */}
              {result?.placeholders && result.placeholders.length > 0 && (
                <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Placeholders to fill</h4>
                  <ul className="text-sm text-muted-foreground grid md:grid-cols-2 gap-3">
                    {result.placeholders.map((p) => (
                      <li key={p.key} className="border border-border rounded-md p-3">
                        <div className="font-medium text-foreground">[{p.key}] - {p.label}</div>
                        <div className="text-xs mt-1">{p.hint}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions Card */}
              {result?.suggestions && result.suggestions.length > 0 && (
                <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Suggestions</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {result.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}