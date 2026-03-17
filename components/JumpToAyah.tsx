'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function JumpToAyah({ totalAyahs, isVertical = false }: { totalAyahs: number, isVertical?: boolean }) {
  const [ayahNumber, setAyahNumber] = useState('');

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(ayahNumber);
    if (!isNaN(num) && num >= 1 && num <= totalAyahs) {
      const element = document.getElementById(`ayah-${num}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <form onSubmit={handleJump} className={cn("flex items-center gap-2", isVertical ? "flex-col" : "pr-1")}>
      <div className="relative group flex flex-col items-center">
        {isVertical && (
          <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1.5">
            Jump
          </span>
        )}
        <input
          type="number"
          min="1"
          max={totalAyahs}
          placeholder={isVertical ? "Ayat" : "Ayat..."}
          value={ayahNumber}
          onChange={(e) => setAyahNumber(e.target.value)}
          className={cn(
            "bg-secondary/40 hover:bg-secondary/60 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold placeholder:font-medium text-center",
            isVertical ? "w-14 py-3 px-1" : "w-20 sm:w-28 pl-3 pr-2 py-2"
          )}
        />
        {!isVertical && (
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-90 hidden sm:block"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
      {isVertical ? (
         <button
           type="submit"
           className="w-12 h-10 flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-90 px-2"
         >
           <ChevronRight size={18} />
           <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">Go</span>
         </button>
      ) : (
        <button
           type="submit"
           className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-lg shadow-lg shadow-primary/20 active:scale-90 sm:hidden"
         >
           <ChevronRight size={14} />
         </button>
      )}
      {!isVertical && (
        <span className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-tighter hidden xs:block">
          /{totalAyahs}
        </span>
      )}
    </form>
  );
}
