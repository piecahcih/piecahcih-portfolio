"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ProjectCardGB } from "@/components/project-cardGlassBlock";

const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 1,
} as const;

export default function Work() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-foreground/20">
            <div className="mx-auto px-6 mt-40 flex justify-center">
                <section className="mb-40 mx-auto w-fit">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-12 px-6"
                    >
                        Work
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-17 gap-y-29 p-6">
                        {[...projects].reverse().map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ ...springConfig, delay: idx * 0.1 }}
                            >
                                <ProjectCardGB project={project} />
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}