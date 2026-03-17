'use client';

import { useEffect } from 'react';
import { useAudioStore } from '@/store/useAudioStore';
import { Ayah } from '@/lib/quranApi';

export function AudioInitializer({ ayahs, surahId }: { ayahs: Ayah[], surahId: number }) {
  const { setAudioUrl, setCurrentSurah, setPlaylist } = useAudioStore();

  useEffect(() => {
    setPlaylist(ayahs);
    setCurrentSurah(surahId);
  }, [ayahs, surahId, setCurrentSurah, setPlaylist]);

  return null;
}
