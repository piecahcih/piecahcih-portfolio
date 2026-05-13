import type { Metadata } from "next";
import { Geist, Geist_Mono, Luckiest_Guy, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/navtheme/theme-provider";
import { MusicModal } from "@/components/musiccard/music-modal";
import { fetchRandomizedPlaylist } from "@/lib/youtube";
import { Navigation } from "@/components/navtheme/navigation";
import { CVIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "@/icons";
import { SocialLink } from "@/components/link";
import CustomCursor from "@/components/cursor";

import { ScrollToTop } from "@/components/scroll-to-top";
import { Preloader } from "@/components/preloader";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} font-sans ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Preloader />
          <ScrollToTop />
          <CustomCursor />
          <header>
            <Navigation />
          </header>
          <main>
            {children}
          </main>
          <footer className="fixed bottom-5 flex justify-between px-6 w-full items-end z-50 pointer-events-none">
            <div className="flex flex-col gap-4 items-center pointer-events-auto">
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
            <p className="-rotate-270 pb-46 fixed bottom-5 right-5 font-light pointer-events-none">pichayapa.thai@gmail.com</p>
          </footer>
          <MusicModal tracks={tracks} />
        </ThemeProvider>
      </body>
    </html>
  );
}
