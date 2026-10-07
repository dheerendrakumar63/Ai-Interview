import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import AnalyticsSection from "../components/landing/AnalyticsSection";
import JobRolesSection from "../components/landing/JobRolesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import LandingFooter from "../components/landing/LandingFooter";
import "../css/landing.css";

function Home() {
  return (
    <div className="landing-container min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      <LandingNavbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AnalyticsSection />
        <JobRolesSection />
        <TestimonialsSection />
      </main>
      <LandingFooter />
    </div>
  );
}

export default Home;