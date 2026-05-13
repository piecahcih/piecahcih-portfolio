"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Tools } from "@/lib/types";

interface MagneticSkillTagProps {
  skill: Tools;
}

const MAGNETIC_STRENGTH = 0.35; // How strongly it pulls (0 = none, 1 = full cursor)
const SPRING = { stiffness: 150, damping: 15, mass: 0.1 };

export function MagneticSkillTag({ skill }: MagneticSkillTagProps) {
  const ref = useRef<HTMLLIElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * MAGNETIC_STRENGTH);
    rawY.set((e.clientY - cy) * MAGNETIC_STRENGTH);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.li
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group/skill relative flex flex-col items-center px-3 py-1.5 text-xs font-medium text-foreground/70 select-none"
    >
      {typeof skill.icon === "string" ? (
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-10 h-10 grayscale opacity-60 group-hover/skill:grayscale-0 group-hover/skill:opacity-100 transition-all duration-300"
        />
      ) : skill.icon ? (
        <skill.icon className="w-10 h-10 opacity-60 group-hover/skill:opacity-100 transition-opacity duration-300" />
      ) : null}
      <span className="mt-2 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200 whitespace-nowrap text-[10px]">
        {skill.name}
      </span>
    </motion.li>
  );
}
