"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";
import Image from "next/image";
import { DownloadIcon } from "@/icons";
import Typewriter from "@/components/typewriter";
import { technicalDepth } from "@/lib/technicalDepth";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 1,
} as const;

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroTranslationY = useTransform(scrollY, [0, 800], [0, -100]);

  const revealRef = useRef(null);
  const { scrollYProgress: revealProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "end start"]
  });

  const technicalDepthOpacity = useTransform(revealProgress, [0.5, 0.7], [0, 1]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground/20">

      <div className="mx-auto">
        {/* HERO SECTION */}
        <motion.section style={{ opacity: heroOpacity, y: heroTranslationY }}
          className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden z-0">
          <div className="ml-55">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-[18px] font-medium tracking-widest text-foreground/60">
                Hi! I'm
              </span>
            </motion.div>

            <div
              className="relative group cursor-none"
              style={{ "--x": "-1000px", "--y": "-1000px" } as React.CSSProperties}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--x", `${x}px`);
                e.currentTarget.style.setProperty("--y", `${y}px`);
              }}
            >
              {/* Base Layer: Full Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springConfig, delay: 0.2 }}
                data-expand-cursor
                className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter my-2 max-w-4xl text-foreground"
              >
                Pichayapa Thaisedhawatkul
              </motion.h1>

              {/* Spotlight Layer: PEACH */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springConfig, delay: 0.2 }}
                className="absolute -inset-2 text-[127px] md:text-[180px] lg:text-[238px] luckiest-guy-regular tracking-wider leading-[0.88] max-w-4xl pointer-events-none select-none -z-10"
                style={{
                  maskImage: 'radial-gradient(circle 130px at var(--x) var(--y), black 100%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle 130px at var(--x) var(--y), black 100%, transparent 100%)',
                }}
              >
                <span className="text-red-500/40">P</span>
                <span className="text-yellow-500/40">E</span>
                <span className="text-green-500/40">A</span>
                <span className="text-blue-500/40">C</span>
                <span className="text-purple-500/40">H</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.3 }}
              className="text-[24px] md:text-[32px] text-foreground/60 max-w-2xl font-light leading-relaxed"
            >
              I'm a <Typewriter texts={[
                "Full-Stack Developer",
                "UX/UI Designer",
                "Junior Architect"
              ]} />
              {/* Junior Design Engineer bridging the gap between Full-Stack Development and UX/UI Design. Crafting enterprise-grade code with an editorial aesthetic. */}
            </motion.p>
          </div>

        </motion.section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative z-20 w-screen h-screen bg-background px-24 scroll-mt-24 border-y-2 border-white/40
            dark:shadow-[0_-35px_35px_-5px_rgba(251,146,60,0.04),0_-2px_25px_-5px_rgba(251,146,60,0.5),0_20px_25px_-5px_rgba(251,146,60,0.2),inset_0_0_2px_1px_rgba(251,146,60,0.1)]
           shadow-[0_-30px_25px_-5px_rgba(0,0,0,0.03),0_20px_25px_-5px_rgba(0,0,0,0.04),inset_0_0_2px_1px_rgba(255,255,255,0.05)]">
          {/* shadow-[0_-30px_20px_-15px_rgba(0,0,0,0.02),0_-15px_20px_-5px_rgba(0,0,0,0.03)]"> */}

          <Image
            src="/assets/polycarbonate-6194281dac837-1200.jpg"
            alt="Background concept"
            fill
            className="object-cover object-center opacity-15 -z-1"
          />
          <Image
            src="/assets/polycarbonate2.jpg"
            alt="polycarbonate2"
            fill
            className="object-cover object-center opacity-19 -z-5"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-12 pt-10"
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...springConfig }}
              className="md:col-span-5"
            >
              <h3 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6 leading-snug">
                From structural architecture to digital experiences.
              </h3>
              <p className="text-foreground/60 leading-relaxed font-light mb-6">
                With a foundation in Architecture from Chulalongkorn University and ENSAV in France, my journey into technology is driven by a passion for building robust, human-centered systems.
              </p>
              <motion.div
                initial="initial"
                whileHover="hover"
                data-hide-cursor
                className="relative mt-9 w-[350px] h-[450px] overflow-hidden cursor-none"
              >
                <div
                  className="absolute inset-0 z-0 opacity-25 dark:opacity-12"
                  style={{ background: 'radial-gradient(circle at center, var(--glow-color) 0%, var(--outglow-color) 30%, transparent 100%)' }}
                // style={{ background: 'radial-gradient(circle at center, rgba(254, 240, 138, 0.6) 0%, rgba(254, 249, 195, 0.4) 50%, transparent 100%)' }}
                />

                <motion.div
                  variants={{
                    initial: { opacity: 0, scale: 1.1 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src="/assets/profile.jpg"
                    alt="Profile"
                    fill
                    className="object-cover object-center"
                  />
                </motion.div>
              </motion.div>
              {/* <Image
                src="/assets/profile.jpg"
                alt="Profile"
                width={350}
                height={350}
                className="object-cover object-center"
              /> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="md:col-span-6 md:col-start-7"
            >
              <div className="space-y-8">
                {/* Education */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-4 border-b border-foreground/10 pb-2">Education & Journey</h4>
                  <ul className="space-y-4 text-sm font-light text-foreground/60">
                    <li className="flex justify-between items-start">
                      <span>CodeCamp Fullstack Developer #22</span>
                      <span className="text-foreground/40 text-right">2026 - Present</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <span>Chulalongkorn University <br /><span className="text-xs text-foreground/40">Bachelor of Architecture</span></span>
                      <span className="text-foreground/40 text-right">Bangkok</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <span>ENSAV <br /><span className="text-xs text-foreground/40">Exchange Program</span></span>
                      <span className="text-foreground/40 text-right">France</span>
                    </li>
                  </ul>
                </div>

                {/* Experience & Certifications */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-4 border-b border-foreground/10 pb-2">Experience & Certs</h4>
                  <ul className="space-y-4 text-sm font-light text-foreground/60">
                    <li className="flex justify-between items-start">
                      <span>Architectural Intern <br /><span className="text-xs text-foreground/40">K2LD Singapore</span></span>
                      <span className="text-foreground/40 text-right">2024</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <span>Google UX Design Professional Cert.</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <span>Google Digital Marketing & E-commerce</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SELECTED WORKS - INFINITE HORIZONTAL MARQUEE */}
        {/* <section className="mb-40 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-12 px-24"
          >
            Selected Works
          </motion.h2>

          <div className="relative flex">
            <div
              className="flex gap-6 whitespace-nowrap animate-marquee"
            >
              {[...projects, ...projects].map((project, idx) => (
                <div
                  key={`${project.id}-${idx}`}
                  className="w-[450px] flex-shrink-0"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-70 bg-gradient-to-r from-background to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-70 bg-gradient-to-l from-background to-transparent z-20" />
          </div>
        </section> */}

        {/* TECHNICAL DEPTH REVEAL CONTAINER */}
        <motion.div
          ref={revealRef}
          style={{ opacity: technicalDepthOpacity }}
          className="relative z-10 -mt-[100vh] h-[200vh]">

          <section className="sticky top-0 h-screen px-24 flex flex-col justify-center bg-background">

            {/* SELECTED WORKS - INFINITE HORIZONTAL MARQUEE */}
            <section className="mb-20 overflow-hidden">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-12 px-24"
              >
                Selected Works
              </motion.h2>

              <div className="relative flex">
                <div
                  className="flex gap-6 whitespace-nowrap animate-marquee"
                >
                  {[...projects, ...projects].map((project, idx) => (
                    <div
                      key={`${project.id}-${idx}`}
                      className="w-[450px] flex-shrink-0"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-70 bg-gradient-to-r from-background to-transparent z-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-70 bg-gradient-to-l from-background to-transparent z-20" />
              </div>
            </section>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-12"
            >
              Technical Depth
            </motion.h2>

            {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-12 w-[138vw]"> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {technicalDepth.map((stack, idx) => (
                <motion.div
                  key={stack.category}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...springConfig, delay: idx * 0.15 }}
                  className="group"
                >
                  <div className="mb-6 pb-6 border-b border-foreground/10 group-hover:border-foreground/30 transition-colors duration-500">
                    <h3 className="text-xl font-medium text-foreground mb-4">{stack.category}</h3>
                    {/* <p className="text-sm text-foreground/60 leading-relaxed font-light">
                      {stack.description}
                    </p> */}
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {stack.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="px-3 py-1.5 rounded-md bg-foreground/5 border border-foreground/5 text-xs font-medium text-foreground/70 backdrop-blur-sm"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
