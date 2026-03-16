import React from "react";
import { motion } from "framer-motion";
import { Bot, Globe, Zap, Database, ArrowRight } from "lucide-react";
import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import HeroSection from "@/components/landingPage/Hero";
import Features from "@/components/landingPage/Feature";
import HowItWorks from "@/components/landingPage/Working";
import CTA from "@/components/landingPage/CTA";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className=" bg-black text-white font-sans">
        <HeroSection />

        <Features />

        <HowItWorks />


        <CTA />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
