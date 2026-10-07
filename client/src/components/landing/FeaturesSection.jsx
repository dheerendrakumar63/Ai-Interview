import { motion } from "framer-motion";
import {
  Bot,
  Video,
  FileCheck,
  BarChart3,
  Zap,
  Target,
  ArrowUpRight,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI Dynamic Question Generator",
      description:
        "Generates context-aware, role-specific questions tailored to your exact tech stack, experience level, and target company standards.",
      tag: "Gemini AI Engine",
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      icon: Video,
      title: "Real-Time Voice & Video Mock",
      description:
        "Simulate authentic face-to-face interviews with live speech-to-text transcription, camera feedback, and confidence monitoring.",
      tag: "Interactive AI",
      color: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      icon: FileCheck,
      title: "AI Resume & ATS Optimizer",
      description:
        "Scan your resume against target job descriptions to extract missing skills, format warnings, and ATS keyword match percentages.",
      tag: "ATS Parsing",
      color: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      icon: BarChart3,
      title: "Readiness Score Radar",
      description:
        "Visualize your technical depth, problem-solving speed, clarity, and system design aptitude with rich interactive charts.",
      tag: "Deep Analytics",
      color: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      icon: Zap,
      title: "Instant Detailed AI Feedback",
      description:
        "Get constructive critique right after each response, complete with gold-standard model answers and improvement tips.",
      tag: "Instant Insights",
      color: "from-sky-500 to-sky-600",
      bgLight: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      icon: Target,
      title: "Role & Company Practice Modules",
      description:
        "Access 500+ curated interview tracks for Frontend, Backend, Fullstack, DevOps, Data Science, and Product Management.",
      tag: "20+ Disciplines",
      color: "from-indigo-500 to-indigo-600",
      bgLight: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Badge & Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide">
            <Zap size={14} className="text-blue-600" />
            <span>POWERFUL FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to <br className="hidden sm:inline" />
            <span className="gradient-text">Dominate Your Technical Interviews</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Engineered with cutting-edge Gemini AI models to provide an unmatched, realistic interview preparation experience.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="landing-grid-3">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.bgLight}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>Learn more</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
