import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { AudioPlayer } from "@/components/AudioPlayer";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Al-Quran - Interactive Experience",
  description: "A beautiful, interactive Al-Quran web app with a modern design.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${notoNaskh.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-emerald-100 selection:text-emerald-900 bg-background text-foreground">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <AudioPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
