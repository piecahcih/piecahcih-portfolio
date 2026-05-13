import { ProjectData } from "./types";

export const projects: ProjectData[] = [
  {
    id: "architecture-portfolio",
    title: "Architecture Portfolio",
    subtitle: "architectural Design",
    description: "A high-performance banking dashboard with real-time updates.",
    technicalChallenge: "Orchestrated WebSockets with a custom Node.js microservice architecture to handle high-frequency trading data, reducing latency to < 50ms.",
    imageUrl: [
      "https://res.cloudinary.com/piecahcih/image/upload/v1777969934/7-pavilion_j31yei.png",
      "https://res.cloudinary.com/piecahcih/image/upload/v1777969934/7-pavilion_j31yei.png"
    ],
    stack: [
      { name: "Sketchup 2024", category: "Software" },
      { name: "Autodesk", category: "Software" },
      { name: "Adobe Indesign", category: "Software" },
      { name: "Adobe Photoshop", category: "Software" },
    ],
    layoutConfig: { colSpan: 8, rowSpan: 2 }, // Takes up 8/12 cols
    link: "https://online.fliphtml5.com/wbrna/rral/",
  },
  {
    id: "pichngo",
    title: "Pich & Go",
    subtitle: "Hotel Booking Platform",
    description: "Built a Thailand-based hotel booking platform that covers the full hotel booking journey from browsing and booking to payment and post-stay reviews, with additional features including a favourites system and a loyalty rewards program.",
    technicalChallenge: "Engineered a seamless booking and payment flow using Stripe, with full booking history tracking and an admin panel for operational management. Integrated an AI-powered chatbot for real-time customer assistance, delivering personalized responses to guest inquiries and service FAQs.",
    imageUrl: [
      "https://res.cloudinary.com/piecahcih/image/upload/v1778002833/Screenshot_2026-05-06_003957_v8gn9f.png",
      "https://res.cloudinary.com/piecahcih/image/upload/v1778002833/Screenshot_2026-05-06_003957_v8gn9f.png"
    ],
    stack: [
      { name: "React", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "MySQL", category: "Backend" },
      { name: "Stripe", category: "Payment" },
      { name: "AI Chatbot", category: "AI-powered" },
    ],
    layoutConfig: { colSpan: 8, rowSpan: 2 },
    link: 'https://pichngo.vercel.app/'
  },
  {
    id: "onlyfriendssss",
    title: "Onlyfriendssss",
    subtitle: "Social Community Application",
    description: "A Social Community application, that facilitates real-world meetups through interest-based activity hosting.",
    technicalChallenge: "Engineered a real-time chat and slot tracking system using Socket.io. Integrated Mapbox for location-based activity discovery and Google OAuth for secure authentication. Implemented a host-mediated 'Pending/Approved' join system, giving hosts control over participant selection while maintaining live slot count accuracy. Designed a custom Peer-to-Peer scoring system to promote accountability and maintain a trustworthy community.",
    imageUrl: [
      "https://res.cloudinary.com/piecahcih/image/upload/v1778003700/Screenshot_2026-05-06_004605_frew7s.png",
      "https://res.cloudinary.com/piecahcih/image/upload/v1778003700/Screenshot_2026-05-06_004605_frew7s.png"
    ],
    stack: [
      { name: "React", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "MySQL", category: "Backend" },
      { name: "Socket.io", category: "Real-time" },
      { name: "Mapbox", category: "Map" },
      { name: "Google OAuth", category: "Auth" },
    ],
    layoutConfig: { colSpan: 4, rowSpan: 1 }, // Takes up 4/12 cols
    link: "https://onlyfriendssss.vercel.app/",
  },
  {
    id: "pch-grid",
    title: "PchGrid",
    subtitle: "Financial & Plan management platform",
    description: "A headless CMS built for editorial teams with strict typing.",
    technicalChallenge: "Engineered a strictly typed GraphQL API with .NET, allowing robust querying while maintaining a sub-100ms response time globally.",
    imageUrl: [
      "https://i.pinimg.com/webp80/736x/6c/48/ed/6c48ed0af2475884a33be1a5595c5315.webp",
      "https://i.pinimg.com/webp80/736x/6c/48/ed/6c48ed0af2475884a33be1a5595c5315.webp"
    ],
    stack: [
      { name: ".NET", category: "Backend" },
      { name: "TypeScript", category: "Frontend" },
    ],
    layoutConfig: { colSpan: 4, rowSpan: 1 }, // Takes up 4/12 cols
    link: "https://www.youtube.com/watch?v=TGgcC5xg9YI&list=RDTGgcC5xg9YI&start_radio=1",
  },
];
