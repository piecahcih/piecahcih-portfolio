"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./project-card"; // Reusing the utility
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Work", path: "/work" },
  { name: "Playground", path: "/playground" },
];

export function Navigation() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    // Only track sections if we are on the home page
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          } else if (entry.target.id === "about" && !entry.isIntersecting) {
            // If about is not visible, we are likely back at home
            setActiveSection("home");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    const aboutSection = document.getElementById("about");
    if (aboutSection) observer.observe(aboutSection);

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className="fixed top-7 right-5 z-50">
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-foreground/2 border border-foreground/10 backdrop-blur-md shadow-2xl dark:shadow-[0px_0px_62px_10px_rgba(251,146,60,0.1)]">
        {navItems.map((item) => {
          const isHomeAbout = item.path === "/" || item.path === "/#about";
          const isActive = isHomeAbout
            ? (item.path === "/" ? activeSection === "home" : activeSection === "about")
            : pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
              data-hide-cursor
              className="relative px-6 py-2.5 rounded-full text-[16px] font-medium transition-colors cursor-pointer"
            >
              {/* The active/hover background pill */}
              {hoveredPath === item.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-yellow-500/60 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1,
                  }}
                />
              )}

              <span className={cn(
                "relative z-10 transition-all duration-300",
                isActive
                  ? "text-yellow-500 font-bold scale-105"
                  : hoveredPath === item.path
                    ? "text-foreground"
                    : "text-foreground/70"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}

        <div className="w-px h-4 bg-foreground/10 mx-1" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
