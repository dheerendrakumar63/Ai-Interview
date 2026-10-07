import { motion } from "framer-motion";
import { UserPlus, Cpu, BarChart2, Award } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: UserPlus,
      title: "Choose Role & Upload Resume",
      description:
        "Select your desired engineering track or upload your resume for personalized AI question synthesis aligned with your experience.",
      badge: "Step 1",
    },
    {
      step: "02",
      icon: Cpu,
      title: "Experience AI Live Interview",
      description:
        "Participate in realistic video & voice mock sessions where Gemini AI asks technical, behavioral, and architectural questions.",
      badge: "Step 2",
    },
    {
      step: "03",
      icon: BarChart2,
      title: "Get Instant Feedback & AI Score",
      description:
        "Receive instant scoring, speech breakdown, missing keyword alerts, and gold-standard model answers for every question.",
      badge: "Step 3",
    },
    {
      step: "04",
      icon: Award,
      title: "Refine & Land Your Dream Job",
      description:
        "Track your progress over time, bridge technical gaps, build unstoppable confidence, and get hired faster at top tech firms.",
      badge: "Step 4",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide">
            <span>SIMPLE 4-STEP PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How AI Interview Pro Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From mock interview to dream job offer in 4 simple, effective steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="landing-grid-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Step Badge & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-slate-400 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                  <span>{item.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
