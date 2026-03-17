'use client';

import { useEffect } from 'react';
import { useAudioStore } from '@/store/useAudioStore';
import { Ayah } from '@/lib/quranApi';

export function AudioInitializer({ ayahs, surahId }: { ayahs: Ayah[], surahId: number }) {
  const { setAudioUrl, setCurrentSurah, setPlaylist } = useAudioStore();

  useEffect(() => {
    setPlaylist(ayahs);
    if (ayahs.length > 0) {
      setAudioUrl(ayahs[0].audio_url || '');
    }
    setCurrentSurah(surahId);
  }, [ayahs, surahId, setAudioUrl, setCurrentSurah, setPlaylist]);

  return null;
}
