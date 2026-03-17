const BASE_URL = 'https://api.quran.com/api/v4';

export interface Surah {
  id: number;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  translated_name: {
    name: string;
  };
}

export interface Ayah {
  id: number;
  verse_key: string;
  text_uthmani: string;
  translations: {
    text: string;
  }[];
  audio_url?: string;
  pronunciation?: string;
  timestamps?: {
    start_time: number;
    end_time: number;
  };
}

export const getSurahs = async (): Promise<Surah[]> => {
  const res = await fetch(`${BASE_URL}/chapters?language=bn`);
  const data = await res.json();
  return data.chapters;
};

export const getSurahDetails = async (id: number): Promise<Surah> => {
  const res = await fetch(`${BASE_URL}/chapters/${id}?language=bn`);
  const data = await res.json();
  return data.chapter;
};

export const getAyahs = async (surahId: number, count?: number): Promise<Ayah[]> => {
  // Fetch Ayahs with Uthmani text, Bangla translation (161), and word-by-word data
  const res = await fetch(
    `${BASE_URL}/verses/by_chapter/${surahId}?language=bn&words=true&translations=161&fields=text_uthmani&word_fields=transliteration&per_page=${count || 10}`
  );
  const data = await res.json();
  
  // Add audio URLs and construct pronunciation string
  return data.verses.map((v: any) => {
    const chapter = String(surahId).padStart(3, '0');
    const verse = String(v.verse_number).padStart(3, '0');
    
    // Construct phonetic pronunciation from word transliterations
    const pronunciation = v.words
      .filter((w: any) => w.char_type_name !== 'end')
      .map((w: any) => w.transliteration?.text || '')
      .join(' ');

    return {
      ...v,
      pronunciation,
      audio_url: `https://everyayah.com/data/Alafasy_128kbps/${chapter}${verse}.mp3`
    };
  });
};

export const getAudioTimestamps = async (reciterId: number, surahId: number) => {
  try {
    const res = await fetch(
      `${BASE_URL}/chapter_recitations/${reciterId}/${surahId}`
    );
    const data = await res.json();
    return data.audio_file ? data.audio_file : { audio_url: '' };
  } catch (error) {
    console.error("Error fetching audio timestamps:", error);
    return { audio_url: '' };
  }
};
