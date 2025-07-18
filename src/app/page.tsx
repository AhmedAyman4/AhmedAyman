"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { ProjectsComponent } from "@/components/ProjectsComponent";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import {
  SectionSeparator,
  AnimatedSeparator,
} from "@/components/SectionSeparator";
import Footer from "@/components/Footer";
import { IntroScreen } from "@/components/IntroScreen";
import Me1 from "../assets/a1.jpg";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // Disabled intro screen , change it back to true if you want to show it
  const [introComplete, setIntroComplete] = useState(false); // Set to true since intro is skipped , false if you want to show it
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    sectionsRef.current = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    });
    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => {
      observer.observe(section);
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      {/* Intro Screen */}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      {/* Main Website Content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-1000 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        {" "}
        <Navbar
          links={[
            { href: "#", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#experience", label: "Experience" },
            { href: "#skills", label: "Skills" },
            { href: "#contact", label: "Contact" },
          ]}
        />
        <main className="container mx-auto py-6 flex-grow px-4 md:px-8 lg:px-24 xl:px-28">
          {" "}
          {/* Hero Section */}{" "}
          <div
            ref={(el) => {
              if (el) sectionsRef.current.push(el);
            }}
          >
            <HeroSection profileImage={Me1} introComplete={introComplete} />
          </div>
          {/* Separator between Hero and Projects */}
          {/* <SectionSeparator variant="geometric" />  */}
          <SectionSeparator variant="dots" />
          {/* Projects Component */}
          <div
            id="projects"
            ref={(el) => {
              if (el) sectionsRef.current.push(el);
            }}
          >
            <ProjectsComponent />
          </div>
          {/* Animated Separator between Projects and Experience */}
          <AnimatedSeparator /> {/* Experience Timeline */}
          <section
            id="experience"
            className="mb-8 fade-in-section"
            ref={(el) => {
              if (el) sectionsRef.current.push(el);
            }}
          >
            <ExperienceTimeline />
          </section>
          {/* Separator between Experience and Skills */}
          <SectionSeparator variant="wave" /> {/* Skills Section */}
          <section
            id="skills"
            className="mb-8 fade-in-section"
            ref={(el) => {
              if (el) sectionsRef.current.push(el);
            }}
          >
            <SkillsSection />
          </section>
          {/* Separator between Skills and Contact */}
          <SectionSeparator variant="dots" /> {/* Contact Section */}
          <section
            id="contact"
            className="mb-8 fade-in-section"
            ref={(el) => {
              if (el) sectionsRef.current.push(el);
            }}
          >
            <ContactSection />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
