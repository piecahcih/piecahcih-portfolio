import type { Metadata } from "next";
import { Geist, Geist_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MusicModal } from "@/components/music-modal";
import { fetchRandomizedPlaylist } from "@/lib/youtube";
import { Navigation } from "@/components/navigation";
import { CVIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "@/icons";
import { SocialLink } from "@/components/link";
import CustomCursor from "@/components/cursor";
import Link from "next/link";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Piecahcih.co",
  description: "Pichayapa Thaisedhawatkul (PEACH) | Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tracks = await fetchRandomizedPlaylist("PL-593-J8YOpxoRwcxJsUS0EoMTEpAX48x");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CustomCursor />
          <header>
            <div className="fixed top-10 left-8 z-50">
              <div className="absolute inset-x-[-30px] inset-y-[-15px] -z-10 
                  backdrop-blur-xl bg-white/[0.01] rounded-full
                  [mask-image:radial-gradient(ellipse,black_10%,transparent_70%)]" />

              <Link href="/"
                data-hide-cursor
                className="font-light tracking-[0.2em] cursor-pointer hover:text-yellow-500"
              >
                PIECAHCIH
              </Link>
            </div>
            <Navigation />
          </header>
          <main>
            {children}
          </main>
          <footer className="fixed bottom-5 flex justify-between px-6 w-full items-end z-50">
            <div className="flex flex-col gap-4 items-center">
              <SocialLink
                href="/assets/Resume.pdf"
                icon={CVIcon}
                label="CV"
              />
              <SocialLink
                href="https://github.com/piecahcih"
                icon={GitHubIcon}
                label="GitHub"
              />
              <SocialLink
                href="http://www.linkedin.com/in/pichayapa-thaisedhawatkul-414217328"
                icon={LinkedInIcon}
                label="LinkedIn"
              />
              <SocialLink
                href="http://www.instagram.com/piecahcih"
                icon={InstagramIcon}
                label="Instagram"
              />
              <div className="w-[2px] h-26 bg-foreground/20 -mb-6" />
            </div>
            <p className="-rotate-270 pb-46 fixed bottom-5 right-5 font-light">pichayapa.thai@gmail.com</p>
          </footer>
          <MusicModal tracks={tracks} />
        </ThemeProvider>
      </body>
    </html>
  );
}
