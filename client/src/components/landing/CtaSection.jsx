import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";

export default function CtaSection() {
  const token = localStorage.getItem("token");

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="landing-cta-banner"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Left Copy */}
          <div className="space-y-4 max-w-2xl relative z-10 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-xs font-bold border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              <span>START YOUR JOURNEY TODAY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Ready to Ace Your Next <br className="hidden sm:inline" />
              Technical Interview?
            </h2>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal">
              Join over 15,000 developers using Gemini AI to practice technical questions, analyze resumes, and secure top job offers.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-4 pt-2 text-xs font-semibold text-blue-100">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-300" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-300" /> Instant Setup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-300" /> Unlimited Practice
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto shrink-0 relative z-10">
            <Link
              to={token ? "/dashboard" : "/register"}
              className="landing-cta-btn-primary"
            >
              <span>{token ? "Go to Dashboard" : "Start Free Practice"}</span>
              <ArrowRight size={18} className="text-blue-600" />
            </Link>

            <Link
              to={token ? "/resume" : "/login"}
              className="landing-cta-btn-secondary"
            >
              <FileText size={18} />
              <span>Analyze Resume</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
