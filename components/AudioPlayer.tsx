'use client';

import { useAudioStore } from '@/store/useAudioStore';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function AudioPlayer() {
  const { 
    isPlaying, 
    setIsPlaying, 
    currentTime, 
    setCurrentTime, 
    duration, 
    setDuration,
    audioUrl,
    currentSurahId,
    currentAyahId,
    playNextAyah,
    playPreviousAyah,
    resetAudio
  } = useAudioStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioUrl]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  if (!audioUrl) return null;

  return (
    <div className={cn(
      "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md transition-all duration-500 ease-out transform",
      audioUrl ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
    )}>
      <div className="card-modern backdrop-blur-2xl bg-card/90 px-6 py-4 flex items-center gap-4 border border-border shadow-2xl relative">
        <button 
          onClick={() => resetAudio()}
          className="absolute -top-2 -right-2 p-1.5 bg-background border border-border rounded-full text-muted-foreground hover:text-foreground transition-all shadow-sm active:scale-90"
        >
          <X size={12} />
        </button>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => playNextAyah()}
          autoPlay={isPlaying}
        />
        
        <div className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center bg-secondary">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 btn-primary-modern rounded-full flex items-center justify-center text-primary-foreground transition-all active:scale-90"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="translate-x-0.5" fill="currentColor" />}
            </button>
        </div>

        <div className="flex-1 min-w-0">
           <div className="flex items-center justify-between mb-1.5 px-1">
             <p className="text-[10px] text-primary font-black uppercase tracking-widest truncate">
                Ayah {currentAyahId || '...'}
             </p>
             <div className="flex items-center gap-3">
               <button 
                 onClick={() => playPreviousAyah()}
                 className="text-muted-foreground hover:text-primary transition-colors"
               >
                 <SkipBack size={14} fill="currentColor" />
               </button>
               <button 
                 onClick={() => playNextAyah()}
                 className="text-muted-foreground hover:text-primary transition-colors"
               >
                 <SkipForward size={14} fill="currentColor" />
               </button>
             </div>
           </div>
           
           <div className="relative w-full h-1 bg-secondary rounded-full overflow-hidden">
             <div 
               className="absolute top-0 left-0 h-full bg-primary transition-linear duration-150" 
               style={{ width: `${(currentTime / duration) * 100}%` }}
             />
           </div>
        </div>

        <div className="flex-shrink-0 p-2.5 rounded-full bg-secondary text-muted-foreground">
           <Volume2 size={16} />
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
