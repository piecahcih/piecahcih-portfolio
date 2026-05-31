import { ProjectData } from "./types";

export const projects: ProjectData[] = [
  {
    id: "architecture-portfolio",
    title: "Architecture Portfolio",
    subtitle: "architectural Design",
    description: "My architecture portfolio developed throughout my studies at Chulalongkorn University.",
    imageUrl: [
      "https://res.cloudinary.com/piecahcih/image/upload/v1777969934/7-pavilion_j31yei.png",
      "https://res.cloudinary.com/piecahcih/image/upload/v1778862473/Screenshot_2026-05-15_232036_o9rqjt.png"
    ],
    stack: [
      { name: "Autodesk", category: "Software" },
      { name: "Sketchup 2024", category: "Software" },
      { name: "Enscape", category: "Software" },
      { name: "D5", category: "Software" },
      { name: "Adobe Indesign", category: "Software" },
      { name: "Adobe Photoshop", category: "Software" },
      { name: "Adobe Illustrator", category: "Software" },
    ],
    layoutConfig: { colSpan: 8, rowSpan: 2 }, // Takes up 8/12 cols
    link: "https://online.fliphtml5.com/wbrna/rral/",
  },
  {
    id: "pichngo",
    title: "Pich & Go",
    subtitle: "Hotel Booking Platform",
    description: "Built a Thailand-based hotel booking platform that delivers a complete end-to-end user experience, from browsing and booking to payment and post-stay reviews, with additional features including a favourites system and a loyalty rewards program.",
    technicalChallenge: "Engineered a seamless booking and payment workflow through Stripe integration, featuring comprehensive booking history tracking and a centralized administrative dashboard for operational oversight. Additionally, implemented an AI-powered conversational chatbot to provide real-time customer support and personalized responses to guest inquiries and service-related FAQs.",
    imageUrl: [
      "https://res.cloudinary.com/piecahcih/image/upload/v1778860759/pichngoinmac_iily5u.png",
      "https://res.cloudinary.com/piecahcih/image/upload/v1778002833/Screenshot_2026-05-06_003957_v8gn9f.png"
    ],
    stack: [
      { name: "React.js", category: "Frontend" },
      { name: "TailwindCSS", category: "Frontend" },
      { name: "Framer-Motion", category: "Frontend" },
      { name: "UX/UI", category: "Design" },
      { name: "Zustand", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Express.js", category: "Backend" },
      { name: "MySQL", category: "Backend" },
      { name: "Prisma", category: "Backend" },
      { name: "Cloudinary", category: "Infrastructure" },
      { name: "Stripe", category: "Payment" },
      { name: "AI Chatbot", category: "AI-powered" },
      { name: "Vercel", category: "Devops/Deployment" },
      { name: "Railway", category: "Devops/Deployment" },
    ],
    layoutConfig: { colSpan: 8, rowSpan: 2 },
    link: 'https://pichngo.vercel.app/'
  },
  {
    id: "onlyfriendssss",
    title: "Onlyfriendssss",
    subtitle: "Social Community Application",
    description: "Led the end-to-end design and full-stack development of a social community application focused on facilitating real-world connections through interest-based activity hosting and meetups.",
    technicalChallenge: "Engineered a real-time messaging and participant slot-tracking system using Socket.IO, enabling synchronized user interactions and live activity updates. Integrated Mapbox for location-based activity discovery and Google OAuth for secure user authentication. Implemented a host-mediated “Pending/Approved” participation workflow, allowing activity hosts to manage attendee selection while preserving real-time slot availability accuracy. Additionally, designed and developed a custom peer-to-peer reputation scoring system to encourage accountability and foster a trustworthy community environment.",
    imageUrl: [
      "https://res.cloudinary.com/piecahcih/image/upload/v1779089987/Untitled_design_1_q5ngks.png",
      "https://res.cloudinary.com/piecahcih/image/upload/v1778866456/onlyfriends_jiqkcd.png"
    ],
    stack: [
      { name: "React", category: "Frontend" },
      { name: "TailwindCSS", category: "Frontend" },
      { name: "Framer-Motion", category: "Frontend" },
      { name: "UX/UI", category: "Design" },
      { name: "Zustand", category: "Frontend" },
      { name: "Zod", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Express.js", category: "Backend" },
      { name: "PostgreSQL", category: "Backend" },
      { name: "Socket.io", category: "Real-time" },
      { name: "Mapbox", category: "Map" },
      { name: "Multer", category: "Infrastructure" },
      { name: "Google OAuth (firebase)", category: "Auth" },
      { name: "Vercel", category: "Devops/Deployment" },
      { name: "Render", category: "Devops/Deployment" },
      { name: "Supabase", category: "Devops/Deployment" },
    ],
    layoutConfig: { colSpan: 4, rowSpan: 1 }, // Takes up 4/12 cols
    link: "https://onlyfriendssss.vercel.app/",
  },
  {
    id: "pichpocket",
    title: "PichPocket",
    subtitle: "Finance Tracking and Split a bill app",
    description: "A personal finance tracker with smart bill splitting for Thai users. It lets you track income and expenses, set monthly budgets per category, and visualize your spending on a dashboard. Its standout feature is group bill splitting — create a bill, add friends, and the app generates a PromptPay QR code for each person's share so they can pay instantly from any Thai banking app.",
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
  // {
  //   id: "pch-grid",
  //   title: "PchGrid",
  //   subtitle: "Expense Tracker & Planner",
  //   description: "A headless CMS built for editorial teams with strict typing.",
  //   technicalChallenge: "Engineered a strictly typed GraphQL API with .NET, allowing robust querying while maintaining a sub-100ms response time globally.",
  //   imageUrl: [
  //     "https://i.pinimg.com/webp80/736x/6c/48/ed/6c48ed0af2475884a33be1a5595c5315.webp",
  //     "https://i.pinimg.com/webp80/736x/6c/48/ed/6c48ed0af2475884a33be1a5595c5315.webp"
  //   ],
  //   stack: [
  //     { name: ".NET", category: "Backend" },
  //     { name: "TypeScript", category: "Frontend" },
  //   ],
  //   layoutConfig: { colSpan: 4, rowSpan: 1 }, // Takes up 4/12 cols
  //   link: "https://www.youtube.com/watch?v=TGgcC5xg9YI&list=RDTGgcC5xg9YI&start_radio=1",
  // },
];
