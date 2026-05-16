"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { ProjectCardGB } from "@/components/project-cardGlassBlock";
import { useRef } from "react";

export default function Work() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Translate the content horizontally as the user scrolls vertically
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    return (
        <main className="bg-background selection:bg-foreground/20">
            <div ref={targetRef} className="relative h-[800vh]">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    {/* Fixed Title - Stays put while content slides */}
                    <div className="absolute top-40 left-0 w-full px-[10vw] z-10">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-12"
                        >
                            Work
                        </motion.h2>
                    </div>

                    <motion.div style={{ x }} className="flex px-[10vw] items-center">
                        {/* Projects Row */}
                        <div className="flex gap-19 items-center">
                            {[...projects].reverse().map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                        delay: idx * 0.1
                                    }}
                                    className="shrink-0"
                                >
                                    <ProjectCardGB project={project} />
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center gap-16 whitespace-nowrap">
                            <p className="ml-400 font-light opacity-50">peach</p>
                            <p className="ml-400 font-light opacity-50">พิชญาภา ไทเศรษฐวัฒน์กุล</p>
                            <p className="ml-400 font-light opacity-50">pichayapa thaisedhawatkul</p>
                        </div>

                        <p className="ml-400 font-light opacity-50">&lt;/p&gt;</p>
                        {/* End Spacer */}
                        <div className="min-w-[40vw]" />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}