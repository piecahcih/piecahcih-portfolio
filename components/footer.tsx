"use client";

import { usePathname } from "next/navigation";
import { useScroll, useTransform, motion } from "framer-motion";
import { CVIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "@/icons";
import { SocialLink } from "@/components/link";

export function Footer() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();


  const isHome = pathname === "/";

  const textColor = useTransform(
    scrollYProgress,
    [0.9, 0.95],
    ["var(--fg-color)", "var(--bg-color)"]
  );

  const barColor = useTransform(
    scrollYProgress,
    [0.9, 0.95],
    ["var(--fg-color)", "var(--bg-color)"]
  );


  const footerStyle = isHome ? { color: textColor } : {};
  const barStyle = isHome ? { backgroundColor: barColor } : {};

  return (
    <footer className="fixed bottom-5 flex justify-between px-6 w-full items-end z-50 pointer-events-none">
      <motion.div
        style={footerStyle}
        className="flex flex-col gap-4 items-center pointer-events-auto text-foreground/80"
      >
        <SocialLink href="/assets/Resume.pdf" icon={CVIcon} label="CV" />
        <SocialLink href="https://github.com/piecahcih" icon={GitHubIcon} label="GitHub" />
        <SocialLink href="http://www.linkedin.com/in/pichayapa-thaisedhawatkul-414217328" icon={LinkedInIcon} label="LinkedIn" />
        <SocialLink href="http://www.instagram.com/piecahcih" icon={InstagramIcon} label="Instagram" />
        <motion.div
          style={barStyle}
          className="w-[2px] h-26 opacity-20 -mb-6"
        />
      </motion.div>

      <motion.div
        style={footerStyle}
        className="-rotate-270 pb-46 fixed bottom-5 right-5 font-light pointer-events-none w-fit text-foreground/80"
      >
        <a
          href="mailto:pichayapa.thai@gmail.com?subject=Inquiry from Portfolio"
          rel="noopener noreferrer"
          data-hide-cursor
          className="hover:cursor-pointer hover:text-yellow-500 pointer-events-auto transition-all opacity-80 hover:opacity-100"
        >
          pichayapa.thai@gmail.com
        </a>
      </motion.div>
    </footer>
  );
}
