"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCard } from "@/components/homepage/project-card";
import { projects } from "@/lib/data";
import Image from "next/image";
import { DownloadIcon } from "@/icons";
import Typewriter from "@/components/homepage/typewriter";
import { technicalDepth } from "@/lib/technicalDepth";
import { MagneticSkillTag } from "@/components/homepage/magnetic-skill-tag";
import { useLoading } from "@/context/loading-context";


const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 30,
  mass: 1,
} as const;

export default function Home() {
  const { isFinished } = useLoading();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroTranslationY = useTransform(scrollY, [0, 800], [0, -100]);

  const heroPointerEvents = useTransform(scrollY, [0, 600], ["auto", "none"]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground/20">

      <div className="mx-auto">
        {/* HERO SECTION */}
        <motion.section style={{ opacity: heroOpacity, y: heroTranslationY, pointerEvents: heroPointerEvents }}
          className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden z-0">
          <div className="ml-[14vw]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-[18px] font-medium tracking-widest text-foreground/60">
                Hi! I'm
              </span>
            </motion.div>

            <div
              className={`relative group cursor-none${!isFinished ? " pointer-events-none" : ""}`}
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
                animate={isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ ...springConfig, delay: 0.2 }}
                {...(isFinished ? { "data-expand-cursor": "true" } : {})}
                className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter my-2 max-w-4xl text-foreground ${!isFinished ? 'pointer-events-none' : ''}`}
              >
                Pichayapa Thaisedhawatkul
              </motion.h1>

              {/* Spotlight Layer: PEACH */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ ...springConfig, delay: 0.3 }}
              className="text-[24px] md:text-[32px] text-foreground/60 max-w-2xl font-light leading-relaxed"
            >
              I'm a <Typewriter texts={[
                "Full-Stack Developer",
                "UX/UI Designer",
                "Junior Architect",
                "Traveller"
              ]} />
            </motion.div>
          </div>

        </motion.section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative z-10 w-screen h-screen mb-16 md:mb-40 bg-background px-18 md:px-19 xl:px-24 scroll-mt-24 border-y-2 border-white/40
            dark:shadow-[0_-35px_35px_-5px_rgba(251,146,60,0.04),0_-2px_25px_-5px_rgba(251,146,60,0.5),0_20px_25px_-5px_rgba(251,146,60,0.2),inset_0_0_2px_1px_rgba(251,146,60,0.1)]
           shadow-[0_-30px_25px_-5px_rgba(0,0,0,0.03),0_20px_25px_-5px_rgba(0,0,0,0.04),inset_0_0_2px_1px_rgba(255,255,255,0.05)]">

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
            viewport={{}}
            className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-10 pt-15"
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ ...springConfig }}
              className="md:col-span-5"
            >
              <h3 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6 leading-snug">
                From structural architecture to digital experiences.
              </h3>
              <p className="text-foreground/60 leading-relaxed font-light mb-6">
                With a foundation in Architecture, my journey into technology is driven by a passion for building robust, human-centered systems.
              </p>
              <motion.div
                initial="initial"
                whileHover="hover"
                data-hide-cursor
                className="relative mt-9 w-[30vw] h-[30vw] max-h-fit overflow-hidden cursor-none"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="md:col-span-6 md:col-start-7"
            >
              <div className="space-y-14">
                {/* Education */}
                <div>
                  <h4 className="text-[12px] font-light text-foreground mb-4 border-b border-foreground/10 pb-2 uppercase">Education</h4>
                  <ul className="space-y-4 text-[16px] font-light">
                    <li className="flex justify-between items-start">
                      <span className="font-medium">CodeCamp Fullstack Developer #22</span>
                      <span className="text-right">Jan 2026 - May 2026</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <span className="font-medium">Chulalongkorn University <br /><span className="text-xs font-light">Bachelor of Architecture Program in Architecture, Faculty of Architecture.</span></span>
                      <span className="text-right">2020 - 2025</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <span className="font-medium">ÉNSAV <br /><span className="text-xs font-light">Exchange program in France.</span></span>
                      <span className="text-right">Sep 2023 - Jan 2024</span>
                    </li>
                  </ul>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-[12px] font-light text-foreground mb-4 border-b border-foreground/10 pb-2 uppercase">Certifications</h4>
                  <ul className="space-y-4 text-[16px] font-light">
                    <li className="flex justify-between items-start">
                      <span className="font-medium">Google UX Design Professional Cert.</span>
                      <span className="text-right">2025</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <span className="font-medium">Google Digital Marketing & E-commerce</span>
                      <span className="text-right">2025</span>
                    </li>
                  </ul>
                </div>
                {/* Experience */}
                <div>
                  <h4 className="text-[12px] font-light text-foreground mb-4 border-b border-foreground/10 pb-2 uppercase">Experience</h4>
                  <ul className="space-y-4 text-[16px] font-light">
                    <li className="flex justify-between items-start">
                      <span className="font-medium">Architectural Intern <br /><span className="text-xs font-light">K2LD Singapore</span></span>
                      <span className="text-right">May 2024 - Aug 2024</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SELECTED WORKS - INFINITE HORIZONTAL MARQUEE */}
        <section className="mb-16 md:mb-40 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{}}
            className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-8 md:mb-12 px-18 md:px-19 xl:px-24"
          >
            Selected Works
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={springConfig}
            className="relative flex"
          >
            {/* The Marquee Container */}
            <div
              className="flex gap-6 whitespace-nowrap animate-marquee"
            >
              {/* Render projects twice for seamless loop */}
              {[...projects, ...projects].map((project, idx) => (
                <div
                  key={`${project.id}-${idx}`}
                  className="w-[450px] flex-shrink-0"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {/* Gradient Fades for Editorial look */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-70 bg-gradient-to-r from-background to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-70 bg-gradient-to-l from-background to-transparent z-20" />
          </motion.div>
        </section>

        {/* TECHNICAL DEPTH SECTION */}
        <section className="mb-20 md:mb-35 px-18 md:px-19 xl:px-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{}}
            className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-8 md:mb-12"
          >
            My Tech Stack
          </motion.h2>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-12"> */}
          <div className="flex flex-col gap-12">
            {technicalDepth.map((stack, idx) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ ...springConfig, delay: idx * 0.15 }}
                className="group"
              >
                <div className="mb-6 pb-6 transition-colors duration-500">
                  {/* <h3 className="text-xl font-medium text-foreground">{stack.category}</h3> */}
                  <p className="text-sm text-foreground/60 leading-relaxed font-light text-center">
                    {stack.description}
                  </p>
                </div>
                <ul data-hide-cursor className="flex flex-wrap gap-3 md:gap-4 justify-center">
                  {stack.skills.map((skill) => (
                    <MagneticSkillTag key={skill.name} skill={skill} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>


        {/* OPEN FOR WORK SECTION */}
        <section className="min-h-[85vh] px-18 md:px-19 xl:px-24 bg-foreground text-background flex flex-col justify-between">
          <div className="flex flex-col pt-30">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{}}
              transition={{ ...springConfig, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.2em] text-background/40 uppercase mb-8 md:mb-12"
            >
              get in touch
            </motion.h2>

            <div data-hide-cursor className="flex flex-col luckiest-guy-regular text-7xl md:text-9xl font-bold tracking-tighter text-background/90 hover:text-yellow-500 mb-8">
              <motion.a
                href="mailto:pichayapa.thai@gmail.com?subject=Inquiry from Portfolio"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ ...springConfig, delay: 0.1 }}
              >
                Let's Create
              </motion.a>
              <motion.a
                href="mailto:pichayapa.thai@gmail.com?subject=Inquiry from Portfolio"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ ...springConfig, delay: 0.1 }}
              >
                Something Together
              </motion.a>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ ...springConfig, delay: 0.2 }}
              className="text-lg md:text-xl text-background/60 font-light leading-relaxed"
            >
              I'm currently open to full-time roles, freelance projects, and collaborations. If you have a project in mind or just want to chat about design and technology, I'd love to hear from you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ ...springConfig, delay: 0.5 }}
            className="mt-auto pt-20"
          >
            {/* <h1 className="text-[12vw] md:text-[11vw] font-bold tracking-tighter text-background/90">
              Piecahcih.
            </h1> */}
          </motion.div>
        </section>

      </div>
    </div>
  );
}