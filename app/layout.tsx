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
import { LoadingProvider } from "@/context/loading-context";
import { Footer } from "@/components/footer";

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
          <LoadingProvider>
            <Preloader />
            <ScrollToTop />
            <CustomCursor />
            <header>
              <Navigation />
            </header>
            <main>
              {children}
            </main>
            <Footer />
            <MusicModal tracks={tracks} />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
