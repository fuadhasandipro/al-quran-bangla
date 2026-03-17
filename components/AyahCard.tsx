'use client';

import { Ayah } from '@/lib/quranApi';
import { useAudioStore } from '@/store/useAudioStore';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AyahCardProps {
  ayah: Ayah;
}

export function AyahCard({ ayah }: AyahCardProps) {
  const { currentAyahId, playAyah, isPlaying, setIsPlaying } = useAudioStore();
  const isActive = currentAyahId === ayah.verse_key;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive) {
      setIsPlaying(!isPlaying);
    } else {
      playAyah(ayah.verse_key, 0);
    }
  };

  useEffect(() => {
    if (isActive && isPlaying) {
      cardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isActive, isPlaying]);

  return (
    <div
      ref={cardRef}
      onClick={handleTogglePlay}
      className={cn(
        "card-modern mb-6 group relative overflow-hidden transition-all duration-500 cursor-pointer",
        isActive ? "border-primary ring-1 ring-primary/20 bg-primary/[0.02]" : ""
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground uppercase tracking-widest">
          {ayah.verse_key}
        </span>
        <button
          onClick={handleTogglePlay}
          className={cn(
            "p-3 rounded-xl transition-all duration-300 cursor-pointer",
            isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110" : "bg-secondary text-muted-foreground hover:text-primary hover:bg-emerald-50"
          )}
        >
          {isActive && isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill={isActive ? "currentColor" : "none"} className={isActive ? "" : "translate-x-0.5"} />
          )}
        </button>
      </div>

      <div className="space-y-8">
        <p className="arabic-text text-3xl md:text-5xl text-right leading-[2.5] text-foreground font-medium">
          {ayah.text_uthmani}
        </p>

        <div className="space-y-6">
          {/* Pronunciation block */}
          {ayah.pronunciation && (
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50">
              <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2 opacity-70">Pronunciation</p>
              <p className="text-lg text-foreground/80 leading-relaxed italic font-medium">
                {ayah.pronunciation}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] opacity-70">Translation</p>
            <p className="text-xl font-bold text-foreground leading-relaxed font-bengali">
              {ayah.translations[0].text.replace(/<[^>]*>?/gm, '')}
            </p>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      )}
    </div>
  );
}
