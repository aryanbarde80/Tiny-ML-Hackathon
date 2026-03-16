import React from "react";
import Navbar from "@/components/landingPage/Navbar";
import HeroSection from "@/components/landingPage/Hero";
import Features from "@/components/landingPage/Feature";
import HowItWorks from "@/components/landingPage/Working";
import CTA from "@/components/landingPage/CTA";
import Footer from "@/components/landingPage/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};
export default LandingPage;