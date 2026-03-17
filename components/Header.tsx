'use client';

import { Moon, Sun, Search, BookOpen } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <BookOpen size={20} />
          </div>
          <span className="text-2xl font-black tracking-tight text-foreground">Al-Quran</span>
        </Link>

        <div className="flex items-center gap-4">

          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-primary transition-all active:scale-90 cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
