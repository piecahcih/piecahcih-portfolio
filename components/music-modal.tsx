"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import YouTube from "react-youtube";
import { RhythmSymbol } from "./rhythm-symbol";
import { YouTubeTrack } from "@/lib/types";
import { Play, Pause, SkipForward, SkipBack, Music, GripHorizontal, Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react";

interface MusicModalProps {
  tracks: YouTubeTrack[];
}

export function MusicModal({ tracks }: MusicModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      if (playing) {
        // Higher value = faster speed. 0.5 - 1.0 is a good "chill" range.
        setRotation((prev) => (prev + 0.1) % 360);
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [playing]);

  // Sync play/pause state with YouTube instance
  useEffect(() => {
    if (!player || typeof player.pauseVideo !== 'function') return;
    try {
      if (!player.getIframe()) return;
      if (playing) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    } catch (e) {
      // Suppress known "Cannot read properties of null" errors when skipping tracks
    }
  }, [playing, player]);

  // Sync volume with YouTube instance
  useEffect(() => {
    if (!player || typeof player.setVolume !== 'function') return;
    try {
      if (!player.getIframe()) return;
      if (isMuted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(volume);
      }
    } catch (e) { }
  }, [volume, isMuted, player]);

  // Track playback progress manually
  useEffect(() => {
    if (!player || typeof player.getCurrentTime !== 'function') return;
    const interval = setInterval(async () => {
      try {
        if (!player.getIframe()) return;
        const elapsed = await player.getCurrentTime();
        const duration = await player.getDuration();
        if (duration > 0) {
          setProgress(elapsed / duration);
        }
      } catch (e) { }
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, player]);

  if (!mounted || tracks.length === 0) return null;

  const currentTrack = tracks[currentIndex];

  const handleNext = () => {
    // Keep playing state as is so it autoplays the next song automatically
    setProgress(0);
    setPlayer(null); // Clear stale player reference
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setPlayer(null); // Clear stale player reference
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };


  return (
    <>
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-[100]"
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="pointer-events-auto absolute bottom-6 right-6 flex flex-col overflow-hidden bg-background/30 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-2xl text-foreground w-54 dark:shadow-[0px_0px_62px_10px_rgba(251,146,60,0.1)]"
          style={{ touchAction: "none" }}
        >
          {/* Robust React-YouTube Engine (Visually Hidden but Rendered) */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.01] pointer-events-none overflow-hidden -z-10">
            <YouTube
              videoId={currentTrack.id}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: playing ? 1 : 0,
                  controls: 0,
                  playsinline: 1,
                  origin: typeof window !== 'undefined' ? window.location.origin : '',
                },
              }}
              onReady={(e) => {
                setPlayer(e.target);
                if (playing) e.target.playVideo();
              }}
              onEnd={handleNext}
              onError={(e) => console.error("YouTube Error:", e)}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-2 border-b border-foreground/5 cursor-grab active:cursor-grabbing hover:bg-foreground/5 transition-colors">
            <div className="flex items-center gap-2 text-foreground/50">
              {isMinimized ? <RhythmSymbol isPlaying={playing} /> : <Music className="w-3 h-3" />}
              <span className="text-[10px] truncate w-35 font-medium tracking-widest uppercase">{isMinimized ? (`${currentTrack.title}`) : "Now Playing..."}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-foreground/30 hover:text-foreground transition-colors focus:outline-none cursor-pointer"
                aria-label={isMinimized ? "Expand Modal" : "Minimize Modal"}
              >
                {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
              {/* <GripHorizontal className="w-4 h-4 text-foreground/30" /> */}
            </div>
          </div>

          <motion.div
            animate={{
              height: isMinimized ? 0 : "auto",
              opacity: isMinimized ? 0 : 1
            }}
            style={{ overflow: "hidden" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-36 h-36 flex items-center justify-center mt-2 mb-2">
                  {/* Dynamic Glowing Rhythm Background */}
                  {currentTrack.thumbnailUrl && (
                    <motion.div
                      animate={
                        playing
                          ? {
                            scale: [1, 1.12, 1],
                            opacity: [0.3, 0.7, 0.3],
                          }
                          : {
                            scale: 1,
                            opacity: 0.2,
                          }
                      }
                      transition={
                        playing
                          ? {
                            duration: 2, // Smooth, natural breathing rhythm
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                          : { duration: 0.5 }
                      }
                      className="absolute inset-0 z-0 pointer-events-none"
                    >
                      <img
                        src={currentTrack.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-full blur-2xl saturate-150"
                      />
                    </motion.div>
                  )}

                  {/* Main Thumbnail - Rotating smoothly */}
                  <motion.div
                    className="relative z-10 w-full h-full rounded-full overflow-hidden bg-foreground/5 shrink-0 border border-foreground/10 shadow-2xl"
                    animate={{ rotate: rotation }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 0
                    }}
                  >
                    {currentTrack.thumbnailUrl ? (
                      <img
                        src={currentTrack.thumbnailUrl}
                        alt={currentTrack.title}
                        className="object-cover w-full h-full"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-4 h-4 text-foreground/20" />
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="w-44 text-center text-xs font-medium truncate text-foreground/90" title={currentTrack.title}>
                    {currentTrack.title}
                  </span>
                </div>
              </div>

              <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-foreground/80"
                  style={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between -mt-2.5">
                {/* progression current time */}
                <p className="text-[10px] text-foreground/50 truncate">
                  {Math.floor((progress * currentTrack.duration) / 60)}:{Math.floor((progress * currentTrack.duration) % 60).toString().padStart(2, '0')}
                </p>
                {/* progression duration */}
                <p className="text-[10px] text-foreground/50 truncate">
                  {Math.floor(currentTrack.duration / 60)}:{(currentTrack.duration % 60).toString().padStart(2, '0')}
                </p>
              </div>

              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handlePrev}
                  className="text-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Previous Track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition-transform"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="text-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-foreground/50 hover:text-foreground transition-colors focus:outline-none"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <div className="relative flex-1 h-1 bg-foreground/10 rounded-full flex items-center group">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    aria-label="Volume"
                  />
                  <div
                    className="h-full bg-foreground/50 group-hover:bg-foreground/80 transition-colors rounded-full"
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
