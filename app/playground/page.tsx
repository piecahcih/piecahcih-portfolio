"use client";

import { motion } from "framer-motion";

export default function Playground() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-foreground/20">
            <div className="mx-auto px-6 mt-40 flex justify-center">
                <section className="mb-40 px-24">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs font-semibold tracking-[0.2em] text-foreground/40 uppercase mb-12"
                    >
                        Playground
                    </motion.h2>

                    <motion.div className="bg-yellow-500 w-[1200px]">
                        Mock
                    </motion.div>

                </section>

            </div>
        </div>
    )
} 