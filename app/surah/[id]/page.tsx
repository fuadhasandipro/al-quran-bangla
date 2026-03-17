import { getAyahs, getSurahDetails, getAudioTimestamps } from '@/lib/quranApi';
import { AyahCard } from '@/components/AyahCard';
import { AudioInitializer } from '@/components/AudioInitializer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const surahId = parseInt(resolvedParams.id);
  const surah = await getSurahDetails(surahId);
  const ayahs = await getAyahs(surahId, surah.verses_count);

  return (
    <div className="py-8 px-4 max-w-screen-md mx-auto min-h-screen">
      <AudioInitializer ayahs={ayahs} surahId={surahId} />

      <header className="mb-12 space-y-8">
        <Link href="/">
          <button className="nm-flat p-3 rounded-2xl text-gray-500 hover:nm-inset transition-all active:scale-90">
            <ChevronLeft size={24} />
          </button>
        </Link>

        <div className="nm-convex p-8 rounded-3xl text-center space-y-4">
          <span className="nm-inset px-4 py-1 rounded-full text-xs font-bold text-emerald-600 uppercase">
            Surah {surah.id}
          </span>
          <h1 className="text-3xl font-black text-gray-800">{surah.name_complex}</h1>
          <p className="arabic-text text-4xl text-emerald-600">{surah.name_arabic}</p>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">
            {surah.translated_name.name} • {surah.verses_count} Verses
          </p>
        </div>
      </header>

      <div className="space-y-4">
        {ayahs.map((ayah) => (
          <AyahCard key={ayah.id} ayah={ayah} />
        ))}
      </div>
    </div>
  );
}
