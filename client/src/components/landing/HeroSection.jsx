import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  Mic,
  CheckCircle2,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";

export default function HeroSection() {
  const token = localStorage.getItem("token");

  return (
    <section className="hero-section">
      {/* Background Decorative Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] max-w-full h-[450px] bg-gradient-to-tr from-blue-400/15 via-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="hero-container">
        {/* Left Column - Hero Copy & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hero-left"
        >
          {/* Pill Badge */}
          <div className="hero-pill-badge">
            <Sparkles size={14} className="text-blue-600" />
            <span>Next-Gen AI Interview Prep 2.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-purple-600 font-extrabold">Gemini Powered</span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline">
            Ace Your Interview. <br />
            <span className="gradient-text">Get Hired Faster.</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-subheadline">
            Master technical interviews with real-time AI voice & video simulations, tailored question sets, ATS resume scoring, and instant actionable feedback.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <Link
              to={token ? "/dashboard" : "/register"}
              className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all duration-200 active:scale-[0.98]"
            >
              <span>{token ? "Go to Dashboard" : "Start Free Interview"}</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#features"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-base shadow-sm hover:shadow transition-all duration-200"
            >
              <PlayCircle size={18} className="text-blue-600" />
              <span>Explore Features</span>
            </a>
          </div>

          {/* Trust Proof Stats */}
          <div className="hero-stats-row">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">15,000+</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Interviews Practiced</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">94.8%</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Offer Success Rate</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                4.9 <Star size={18} className="fill-amber-400 text-amber-400 inline" />
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Candidate Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - AI Interview Interactive Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="hero-right"
        >
          {/* Ambient Background Glow Behind Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 -z-10 transform scale-95 pointer-events-none" />

          {/* Preview Card Box */}
          <div className="preview-card-box">
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    AI Interviewer Sarah
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                      v3.2
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">Senior Fullstack Technical Evaluator</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  LIVE REC
                </div>
                <span className="text-xs font-mono font-semibold text-slate-500">14:32</span>
              </div>
            </div>

            {/* Active Question Prompt */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-wider text-blue-600 flex items-center gap-1">
                  <Zap size={13} /> Active Technical Prompt #3
                </span>
                <span className="text-xs text-slate-400 font-medium">Difficulty: Hard</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                "Can you explain how React's Virtual DOM diffing algorithm optimizes rendering performance during state updates?"
              </p>
            </div>

            {/* Simulated Candidate Audio Response & Speech Wave */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-purple-50/50 border border-blue-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Mic size={14} className="text-blue-600 shrink-0" />
                  <span>Candidate Speech Input</span>
                </div>
                <div className="flex items-center gap-1 h-5">
                  <span className="audio-bar" />
                  <span className="audio-bar" />
                  <span className="audio-bar" />
                  <span className="audio-bar" />
                  <span className="audio-bar" />
                </div>
              </div>
              <p className="text-xs text-slate-600 italic bg-white/80 p-2.5 rounded-xl border border-slate-200/60">
                "React creates an in-memory Virtual DOM tree. During state updates, it compares the new tree with the previous snapshot using an O(n) heuristic diffing algorithm..."
              </p>
            </div>

            {/* Real-Time AI Feedback Metrics */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-500" /> Technical Accuracy
                </span>
                <span className="text-emerald-600 font-mono">94%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "94%" }} />
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <span className="text-slate-700 flex items-center gap-1">
                  <TrendingUp size={13} className="text-blue-500" /> Communication Clarity
                </span>
                <span className="text-blue-600 font-mono">90%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }} />
              </div>
            </div>

            {/* AI Readiness Score Badge */}
            <div className="pt-2">
              <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shrink-0">
                  🏆
                </div>
                <div>
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    AI Readiness Index
                  </div>
                  <div className="text-lg font-extrabold text-white flex items-center gap-1">
                    92 / 100
                    <span className="text-xs text-emerald-400 font-semibold">(Top 5%)</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Ready for Senior Frontend Role</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
