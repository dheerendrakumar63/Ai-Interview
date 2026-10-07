import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Senior Full Stack Engineer",
      company: "Landed offer at Google",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote:
        "The real-time speech feedback & System Design questions mirrored my actual Google interviews. Practicing here boosted my confidence 10x!",
      rating: 5,
      increase: "+45% Salary Offer",
    },
    {
      name: "Priya Sharma",
      role: "Backend Engineer",
      company: "Landed offer at Meta",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      quote:
        "The ATS Resume Analyzer flagged critical missing keywords that were holding back my applications. Within 2 weeks of fixing them, I got 5 callbacks.",
      rating: 5,
      increase: "Landed Meta L5 Role",
    },
    {
      name: "Marcus Chen",
      role: "Frontend Specialist",
      company: "Landed offer at Stripe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      quote:
        "I used to get extremely nervous during video interviews. AI Interview Pro's live audio/video simulation eliminated my anxiety completely.",
      rating: 5,
      increase: "3 FAANG Offers",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>REAL SUCCESS STORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by Developers <br />
            <span className="gradient-text">Hired by Top Tech Companies</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            See how candidates used AI Interview Pro to transform their interview performance and secure high-paying offers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="landing-grid-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-slate-300" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* User Bio */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {t.increase}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
