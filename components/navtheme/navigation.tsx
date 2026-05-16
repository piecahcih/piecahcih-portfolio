"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Work", path: "/work" },
  // { name: "Playground", path: "/playground" },
];

export function Navigation() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  // Track viewport width so we can compute pixel values for useTransform
  const [vw, setVw] = useState<number>(1440);

  const { scrollY } = useScroll();
  // Override scroll value to 0 on the work page to disable navigation morphing
  const effectiveScroll = useTransform(scrollY, (value) =>
    pathname === "/work" ? 0 : value
  );

  const smoothScrollY = useSpring(effectiveScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Intersection observer for active-section highlighting (home page only)
  useEffect(() => {
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
            setActiveSection("home");
          }
        });
      },
      { threshold: 0.5 }
    );
    const aboutSection = document.getElementById("about");
    if (aboutSection) observer.observe(aboutSection);
    return () => observer.disconnect();
  }, [pathname]);

  // ─── Scroll-driven transforms ────────────────────────────────────────────────
  // The scroll range over which the morph happens: 0 → 150 px
  const SCROLL_END = 150;

  // Pill target width: min(560px, 90vw)
  const pillWidth = Math.min(670, vw * 0.9);

  // Width: full viewport → compact pill
  const navWidth = useTransform(smoothScrollY, [0, SCROLL_END], [vw, pillWidth]);

  // Vertical offset: flush with top → floating 20 px below top
  const navTop = useTransform(smoothScrollY, [0, SCROLL_END], [0, 25]);

  // Border radius: flat → pill
  const borderRadius = useTransform(smoothScrollY, [0, SCROLL_END], [0, 50]);

  // Horizontal padding: spacious → compact
  const paddingX = useTransform(smoothScrollY, [0, SCROLL_END], [28, 19]);

  // Vertical padding: thin top-bar feel → compact pill feel
  const paddingY = useTransform(smoothScrollY, [0, SCROLL_END], [24, 12]);

  // Logo: persists and scales slightly as nav morphs
  const logoOpacity = useTransform(smoothScrollY, [0, SCROLL_END], [1, 1]);
  const logoMaxWidth = useTransform(smoothScrollY, [0, SCROLL_END], [180, 140]);
  const logoX = useTransform(smoothScrollY, [0, SCROLL_END], [0, 0]);

  // Background opacity: nearly transparent → light glass
  const bgOpacity = useTransform(smoothScrollY, [0, SCROLL_END], [0.02, 0.07]);
  const bgColor = useMotionTemplate`rgba(255,255,255,${bgOpacity})`;

  // Shadow: invisible at top → soft depth in pill state
  const shadowOpacity = useTransform(smoothScrollY, [60, SCROLL_END], [0, 1]);
  const borderOpacity = useTransform(smoothScrollY, [60, SCROLL_END], [0, 0.15]);
  const borderColor = useMotionTemplate`rgba(120, 120, 120, ${borderOpacity})`;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-end pr-6 pointer-events-none">
      <motion.nav
        style={{
          width: navWidth,
          top: navTop,
          borderRadius,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          position: "relative",
          border: useMotionTemplate`1px solid ${borderColor}`,
        }}
        className="flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md pointer-events-auto"
        aria-label="Main navigation"
      >
        {/* ── Shadow overlay (only appears in pill/scrolled state) ── */}
        <motion.div
          style={{ opacity: shadowOpacity }}
          className="absolute inset-0 rounded-[inherit] pointer-events-none -z-10"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-[inherit] shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(251,146,60,0.09)]" />
        </motion.div>

        {/* ── Logo (left) — collapses as nav morphs ── */}
        <motion.div
          style={{
            opacity: logoOpacity,
            maxWidth: logoMaxWidth,
            x: logoX,
          }}
          className="overflow-hidden flex-shrink-0 whitespace-nowrap"
          aria-hidden={/* visually hidden once collapsed */ undefined}
        >
          <Link
            href="/"
            data-hide-cursor
            className="font-light tracking-[0.2em] ml-3 text-foreground hover:text-yellow-500 transition-colors duration-300"
            tabIndex={-1}
          >
            PIECAHCIH
          </Link>
        </motion.div>

        {/* ── Spacer (pushes links right while logo is visible) ── */}
        <div className="flex-1 min-w-0" />

        {/* ── Nav links ── */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {navItems.map((item) => {
            const isHomeAbout =
              item.path === "/" || item.path === "/#about";
            const isActive = isHomeAbout
              ? item.path === "/"
                ? activeSection === "home"
                : activeSection === "about"
              : pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                data-hide-cursor
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
              >
                {/* Hover / active pill background */}
                {hoveredPath === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-yellow-500/60 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 22,
                      mass: 0.9,
                    }}
                  />
                )}

                <span className={cn(
                  "relative z-10 transition-all duration-300 text-[16px]",
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
        </div>

        {/* ── Divider + ThemeToggle ── */}
        <div className="flex items-center gap-1 flex-shrink-0 ml-1">
          <div className="w-px h-4 bg-foreground/10 mx-1" />
          <ThemeToggle />
        </div>
      </motion.nav>
    </div>
  );
}
