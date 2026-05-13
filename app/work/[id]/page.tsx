"use client";

import { use } from "react";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type ProjectDetailsPageProps = {
    params: Promise<{ id: string }>
}

export default function WorkDetailsPage({ params }: ProjectDetailsPageProps) {
    const { id } = use(params);
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p className="text-lg font-light tracking-widest uppercase">Project not found</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 px-18 md:px-20 lg:px-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-6xl mx-auto"
            >
                {/* Back button */}
                <Link href="/work" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Work
                </Link>

                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 mb-16">
                    <div className="md:col-span-6 lg:col-span-5">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                            {project.title}
                        </h1>
                        <p className="text-sm font-medium tracking-[0.2em] text-foreground/60 uppercase mb-4">
                            {project.subtitle}
                        </p>
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-hide-cursor
                                className="inline-flex items-center gap-2 text-sm font-medium border border-foreground/20 px-6 py-3 rounded-full hover:bg-yellow-500/80 hover:text-background transition-colors"
                            >
                                Visit Project <ArrowUpRight className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3 lg:col-start-7 md:col-span-3 md:col-start-7 flex flex-col gap-4 pb-2"
                    >
                        <h3 className="text-xs font-semibold tracking-widest text-foreground/40 uppercase">STACK & TOOLS</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.stack.map((tech) => {
                                return (
                                    <div
                                        key={tech.name}
                                        className="text-sm font-medium w-fit flex items-center gap-3 px-3 py-1 rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-colors hover:bg-foreground/10 hover:border-foreground/20"
                                    >
                                        {tech.name}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3 lg:col-start-10 md:col-span-3 md:col-start-10 flex flex-col gap-4 pb-2"
                    >
                        <h3 className="text-xs font-semibold tracking-widest text-foreground/40 uppercase">DESCRIPTION</h3>
                        <p className="text-sm text-foreground/80 leading-relaxed font-light">{project.description}</p>
                        <p className="text-sm text-foreground/80 leading-relaxed font-light">{project.technicalChallenge}</p>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <div className="flex gap-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-[600px] overflow-hidden mb-20 border border-foreground/10 bg-foreground/5"
                    >
                        <img
                            src={project.imageUrl[0]}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-foreground/5 mix-blend-overlay pointer-events-none" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-[400px] aspect-[21/9] md:aspect-[16/7] overflow-hidden mb-20 border border-foreground/10 bg-foreground/5"
                    >
                        <img
                            src={project.imageUrl[1]}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-foreground/5 mix-blend-overlay pointer-events-none" />
                    </motion.div>

                </div>

            </motion.div>
        </main >
    );
}