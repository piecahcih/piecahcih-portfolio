import { motion } from "framer-motion";

export const RhythmSymbol = ({ isPlaying }: { isPlaying: boolean }) => {
    return (
        <div className="flex items-end justify-center gap-[2px] w-3 h-3">
            {[1, 2, 3, 4].map((i) => (
                <motion.span
                    key={i}
                    className="w-[3px] bg-foreground/50 rounded-full"
                    animate={
                        isPlaying
                            ? {
                                height: ["20%", "80%", "40%", "100%", "20%"],
                                transition: {
                                    duration: 1.2 + i * 0.2, // Varying speeds for rhythm
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }
                            }
                            : {
                                height: "20%",
                                transition: {
                                    duration: 0.3, // Quick reset when paused
                                    ease: "easeOut"
                                }
                            }
                    }
                />
            ))}
        </div>
    );
};