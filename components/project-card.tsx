"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Physics-based spring config: Low damping for premium, heavy feel
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 1,
  } as const;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden group flex flex-col justify-end p-8",
        "bg-background text-foreground",
        "border border-foreground/10 backdrop-blur-md hover:border-yellow-500/60 hover:bg-yellow-500/10", // Glassmorphism
        "h-[28vh] cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 0.98 }}
      transition={springConfig}
    >
      {/* Background Image / Gradient */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0 transition-opacity duration-700 ease-out group-hover:opacity-20"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      />

      {/* Gradient Overlay for Editorial readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />

      {/* Card Content */}
      <div className="relative z-20 flex flex-col h-full justify-end">
        {/* Editorial Default State */}
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
}
