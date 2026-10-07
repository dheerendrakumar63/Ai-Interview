import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function AnalyticsSection() {
  const metrics = [
    { label: "Technical Depth & Syntax", score: 92, color: "bg-blue-600" },
    { label: "Problem Solving Approach", score: 88, color: "bg-purple-600" },
    { label: "Communication & Delivery", score: 94, color: "bg-emerald-500" },
    { label: "ATS Resume Skill Match", score: 86, color: "bg-amber-500" },
  ];

  return (
    <section id="analytics" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="landing-grid-2">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
              <Sparkles size={14} className="text-purple-600" />
              <span>AI READINESS SCORE ANALYTICS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Actionable AI Insights <br />
              <span className="gradient-text-purple">Before You Step Into Real Interviews</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Our intelligent engine evaluates candidate responses across 15+ sub-dimensions including code efficiency, communication tone, system design trade-offs, and resume ATS alignment.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Comprehensive Readiness Radar</h4>
                  <p className="text-xs text-slate-500">Know exactly where you stand compared to candidate benchmarks in top tech roles.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">ATS Keyword Match Optimization</h4>
                  <p className="text-xs text-slate-500">Uncover missing technical keywords in your resume to guarantee high recruiter pass-through.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Gold-Standard Model Answers</h4>
                  <p className="text-xs text-slate-500">Review ideal responses for every question to elevate your technical articulation.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Analytics Card Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 space-y-6 text-left relative overflow-hidden">
              {/* Top Score Ring Row */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    Overall Candidate Performance
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">AI Interview Readiness Score</h3>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex flex-col items-center justify-center font-black text-white shadow-lg shadow-purple-500/20 shrink-0">
                  <span className="text-2xl">90</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">/ 100</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                {metrics.map((m) => (
                  <div key={m.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{m.label}</span>
                      <span className="font-mono text-white">{m.score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`${m.color} h-full rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Diagnostic Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                  <Brain size={15} />
                  <span>AI Assessment Diagnostic Note</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Candidate shows exceptional architectural domain clarity and clean code explanations. Recommendation: Highlight microservice scalability trade-offs to reach Senior Engineer benchmark."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
