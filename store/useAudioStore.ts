import { create } from 'zustand';

interface AudioState {
  isPlaying: boolean;
  currentSurahId: number | null;
  currentAyahId: string | null;
  currentTime: number;
  duration: number;
  playlist: any[];
  audioUrl: string | null;
  
  // Actions
  setIsPlaying: (playing: boolean) => void;
  setCurrentSurah: (id: number) => void;
  setCurrentAyah: (id: string) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPlaylist: (playlist: any[]) => void;
  setAudioUrl: (url: string | null) => void;
  playAyah: (ayahId: string, startTime: number) => void;
  playNextAyah: () => void;
  playPreviousAyah: () => void;
  resetAudio: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isPlaying: false,
  currentSurahId: null,
  currentAyahId: null,
  currentTime: 0,
  duration: 0,
  playlist: [],
  audioUrl: null,

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentSurah: (id) => set({ currentSurahId: id }),
  setCurrentAyah: (id) => set({ currentAyahId: id }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setPlaylist: (playlist) => set({ playlist }),
  setAudioUrl: (url) => set({ audioUrl: url }),
  playAyah: (ayahId, startTime) => {
    const { playlist } = get();
    const ayah = playlist.find(a => a.verse_key === ayahId);
    if (ayah) {
      set({ 
        currentAyahId: ayahId, 
        audioUrl: ayah.audio_url,
        currentTime: 0,
        isPlaying: true 
      });
    }
  },
  playNextAyah: () => {
    const { currentAyahId, playlist } = get();
    if (!currentAyahId) return;
    
    const currentIndex = playlist.findIndex(a => a.verse_key === currentAyahId);
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      const nextAyah = playlist[currentIndex + 1];
      set({
        currentAyahId: nextAyah.verse_key,
        audioUrl: nextAyah.audio_url,
        currentTime: 0,
        isPlaying: true
      });
    } else {
      set({ isPlaying: false });
    }
  },
  playPreviousAyah: () => {
    const { currentAyahId, playlist } = get();
    if (!currentAyahId) return;
    
    const currentIndex = playlist.findIndex(a => a.verse_key === currentAyahId);
    if (currentIndex > 0) {
      const prevAyah = playlist[currentIndex - 1];
      set({
        currentAyahId: prevAyah.verse_key,
        audioUrl: prevAyah.audio_url,
        currentTime: 0,
        isPlaying: true
      });
    }
  },
  resetAudio: () => set({ 
    audioUrl: null, 
    currentAyahId: null, 
    isPlaying: false, 
    currentTime: 0 
  })
}));
