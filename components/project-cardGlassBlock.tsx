"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import Link from "next/link";

// Utility for class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
}

export function ProjectCardGB({ project, className }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const projectLink = project.link || project.liveUrl;

  // Physics-based spring config: Low damping for premium, heavy feel
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 1,
  } as const;

  const cardContent = (
    <motion.div
      className={cn(
        "relative rounded-[3px] group flex flex-col justify-end p-8",
        "bg-background text-foreground backdrop-blur-md",
        "shadow-[7px_3px_4px_1px_rgba(135,_127,_122,_0.5)]",
        "dark:shadow-[1px_1px_10px_2px_rgba(251,146,60,0.5),_0px_0px_62px_10px_rgba(226,113,133,0.2)]",
        // "dark:shadow-[7px_3px_15px_2px_rgba(251,146,60,0.4),_7px_3px_50px_10px_rgba(251,113,133,0.15)]",
        "dark:border border-foreground/40",
        "h-[360px] w-[360px]",
        projectLink ? "cursor-pointer" : "cursor-default",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={projectLink ? { scale: 0.98 } : {}}
      transition={springConfig}
    >
      {/* Background Image / Gradient */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-80 z-0 transition-opacity duration-700 ease-out group-hover:opacity-20"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      />

      {/* Gradient Overlay for Editorial readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent z-10" /> */}

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.37] pointer-events-none z-[15] select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(120%) brightness(120%)'
        }}
      />

      {/* Specular Highlight (Reflection) */}
      <div className="absolute inset-0 z-[16] pointer-events-none rounded-[3px] border-t border-l border-white/20" />

      {/* Card Content */}
      <div className="relative z-20 flex flex-col h-full justify-end">
        {/* Editorial Default State */}
        <div className="mb-2 absolute -bottom-26 -left-7 group-hover:opacity-0">
          <motion.h3
            layout="position"
            className="text-[18px] font-light tracking-tight text-foreground"
          >
            {project.title}
          </motion.h3>
          <motion.p
            layout="position"
            className="text-[9px] font-medium tracking-[0.2em] text-foreground/60 uppercase"
          >
            {project.subtitle}
          </motion.p>
        </div>

        {/* Hover State: Technical Challenge & Stack (AnimatePresence for smooth reveal) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={springConfig}
              className="overflow-hidden"
            >
              <div className="mb-2">
                <motion.p
                  layout="position"
                  className="text-xs font-medium tracking-[0.2em] text-foreground/60 uppercase mb-3"
                >
                  {project.subtitle}
                </motion.p>
                <motion.h3
                  layout="position"
                  className="text-3xl font-light tracking-tight text-foreground flex items-center gap-3"
                >
                  {project.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                </motion.h3>
              </div>
              <div className="pt-6 mt-4 border-t border-foreground/10 flex flex-col gap-5">
                <div>
                  <span className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest block mb-2">
                    Technical Challenge
                  </span>
                  <p className="text-sm text-foreground/80 leading-relaxed font-light">
                    {project.technicalChallenge}
                  </p>
                </div>

                {/* Tech Stack Icons Staggered Entrance */}
                <div className="flex gap-2 items-center">
                  {project.stack.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ delay: idx * 0.05, ...springConfig }}
                        className="p-2.5 rounded-lg bg-foreground/5 border border-foreground/10 backdrop-blur-md"
                        title={tech.name}
                      >
                        <Icon className="w-4 h-4 text-foreground/90" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  if (projectLink) {
    return (
      <Link
        href={projectLink}
        target={projectLink.startsWith("http") ? "_blank" : undefined}
        rel={projectLink.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
