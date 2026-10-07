import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code2,
  Database,
  Layers,
  BrainCircuit,
  Server,
  Briefcase,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function JobRolesSection() {
  const token = localStorage.getItem("token");

  const roles = [
    {
      title: "Frontend Developer",
      icon: Code2,
      description: "React, Next.js, Virtual DOM, State Management, Performance & CSS architecture.",
      skills: ["React 19", "TypeScript", "Tailwind", "State Ops"],
      difficulty: "All Levels",
      scenarios: "280+ Questions",
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Backend Engineer",
      icon: Database,
      description: "Node.js, Express, MongoDB, System Design, REST APIs, Caching & Database Indexing.",
      skills: ["Node.js", "MongoDB", "Express", "System Design"],
      difficulty: "Mid - Staff",
      scenarios: "310+ Questions",
      color: "from-purple-600 to-violet-600",
    },
    {
      title: "Full Stack Engineer",
      icon: Layers,
      description: "End-to-end MERN/PERN stack architectures, authentication, real-time WebSockets & CI/CD.",
      skills: ["MERN Stack", "GraphQL", "JWT", "Deployment"],
      difficulty: "Mid - Senior",
      scenarios: "400+ Questions",
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: "Data Scientist & AI",
      icon: BrainCircuit,
      description: "Machine Learning models, Python, Gemini/GPT APIs, Prompt Engineering & Data Pipelines.",
      skills: ["Python", "PyTorch", "LLMs", "Pandas"],
      difficulty: "Advanced",
      scenarios: "220+ Questions",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "DevOps & Cloud Specialist",
      icon: Server,
      description: "Docker, Kubernetes, AWS, Infrastructure as Code, CI/CD Pipelines & Security.",
      skills: ["Docker", "K8s", "AWS", "GitHub Actions"],
      difficulty: "Mid - Senior",
      scenarios: "190+ Questions",
      color: "from-sky-500 to-blue-600",
    },
    {
      title: "Product & Tech Lead",
      icon: Briefcase,
      description: "System Trade-offs, Engineering Leadership, Agile Roadmaps & Behavioral Scenarios.",
      skills: ["System Design", "Leadership", "Product Strategy"],
      difficulty: "Senior / Lead",
      scenarios: "175+ Questions",
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <section id="job-roles" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Sparkles size={14} className="text-blue-600" />
            <span>TAILORED INTERVIEW TRACKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Practice for Your Target Role
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Specialized interview tracks configured with industry-aligned evaluation standards.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="landing-grid-3">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${role.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {role.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {role.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {role.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{role.scenarios}</span>
                  <Link
                    to={token ? "/create-interview" : "/register"}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                  >
                    <span>Start Practice</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
