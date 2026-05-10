"use client";

import { motion } from "framer-motion";
import TextMorphAnimation from "@/components/text-morph-animation/text-morph";

const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 1,
} as const;

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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springConfig, delay: 0.3 }}
                        className="text-[60px] md:text-[80px] font-light leading-relaxed text-center luckiest-guy-regular"
                    >
                        <TextMorphAnimation texts={[
                            "Hello",
                            "สวัสดี",
                            "Welcome to my playground"
                        ]} />
                    </motion.div>

                </section>

            </div>
        </div>
    )
} 