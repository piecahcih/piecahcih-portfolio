import { ElementType } from "react";

export type TechCategory = "Frontend" | "Backend" | "Infrastructure" | "Design" | "Software";

export interface TechStackItem {
  name: string;
  category: TechCategory;
  icon: ElementType; // Expecting a React component (e.g., from lucide-react)
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technicalChallenge: string;
  imageUrl: string;
  link?: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: TechStackItem[];
  layoutConfig?: {
    colSpan?: number; // e.g., for span-1, span-2 in bento grid
    rowSpan?: number;
  };
}

export interface YouTubeTrack {
  id: string; // The videoId
  title: string;
  duration: number; // Parsed duration in seconds
  thumbnailUrl: string;
}
