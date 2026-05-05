import { Code2, Database, Layout, Server, Cloud, Container } from "lucide-react";
import { ProjectData } from "./types";

export const projects: ProjectData[] = [
  {
    id: "architecture-portfolio",
    title: "Architecture Portfolio",
    subtitle: "architectural Design",
    description: "A high-performance banking dashboard with real-time updates.",
    technicalChallenge: "Orchestrated WebSockets with a custom Node.js microservice architecture to handle high-frequency trading data, reducing latency to < 50ms.",
    imageUrl: "https://res.cloudinary.com/piecahcih/image/upload/v1777969934/7-pavilion_j31yei.png",
    stack: [
      { name: "Sketchup 2024", category: "Software", icon: Server },
      { name: "Autodesk", category: "Software", icon: Database },
      { name: "Adobe Indesign", category: "Software", icon: Layout },
      { name: "Adobe Photoshop", category: "Software", icon: Layout },
    ],
    layoutConfig: { colSpan: 8, rowSpan: 2 }, // Takes up 8/12 cols
  },
  {
    id: "pichngo",
    title: "Pich & Go",
    subtitle: "Hotel Booking Platform",
    description: "A high-performance banking dashboard with real-time updates.",
    technicalChallenge: "Orchestrated WebSockets with a custom Node.js microservice architecture to handle high-frequency trading data, reducing latency to < 50ms.",
    imageUrl: "https://res.cloudinary.com/piecahcih/image/upload/v1778002833/Screenshot_2026-05-06_003957_v8gn9f.png",
    stack: [
      { name: "React", category: "Frontend", icon: Layout },
      { name: "Node.js", category: "Backend", icon: Server },
      { name: "PostgreSQL", category: "Backend", icon: Database },
    ],
    layoutConfig: { colSpan: 8, rowSpan: 2 }, // Takes up 8/12 cols
  },
  {
    id: "onlyfriendssss",
    title: "Onlyfriendssss",
    subtitle: "Social Community Application",
    description: "Automated scaling for distributed systems.",
    technicalChallenge: "Implemented a zero-downtime deployment pipeline using Docker Swarm and Cloudflare Workers, achieving 99.99% uptime.",
    imageUrl: "https://res.cloudinary.com/piecahcih/image/upload/v1778003700/Screenshot_2026-05-06_004605_frew7s.png",
    stack: [
      { name: "Docker", category: "Infrastructure", icon: Container },
      { name: "Cloudflare", category: "Infrastructure", icon: Cloud },
    ],
    layoutConfig: { colSpan: 4, rowSpan: 1 }, // Takes up 4/12 cols
  },
  {
    id: "mynd",
    title: "Mynd",
    subtitle: "Tracking System",
    description: "A headless CMS built for editorial teams with strict typing.",
    technicalChallenge: "Engineered a strictly typed GraphQL API with .NET, allowing robust querying while maintaining a sub-100ms response time globally.",
    imageUrl: "https://i.pinimg.com/webp80/736x/6c/48/ed/6c48ed0af2475884a33be1a5595c5315.webp",
    stack: [
      { name: ".NET", category: "Backend", icon: Code2 },
      { name: "TypeScript", category: "Frontend", icon: Layout },
    ],
    layoutConfig: { colSpan: 4, rowSpan: 1 }, // Takes up 4/12 cols
  },
];
