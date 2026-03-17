import { Facebook, Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-2">
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">
            Al-Quran Bangla Project
          </p>
          <p className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
            Made with <Heart size={18} className="text-rose-500 fill-rose-500 animate-pulse" /> by 
            <span className="text-primary">Fuad Hasan Dipro</span>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.facebook.com/FuadHasanDipro"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-border hover:border-blue-500 hover:text-blue-500 transition-all hover:-translate-y-1"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://github.com/fuadhasandipro"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-border hover:border-slate-900 hover:text-slate-900 dark:hover:text-white dark:hover:border-white transition-all hover:-translate-y-1"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
