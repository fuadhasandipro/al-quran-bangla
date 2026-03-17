import { getAyahs, getSurahDetails, getAudioTimestamps } from '@/lib/quranApi';
import { AyahCard } from '@/components/AyahCard';
import { AudioInitializer } from '@/components/AudioInitializer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { JumpToAyah } from '@/components/JumpToAyah';

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const surahId = parseInt(resolvedParams.id);
  const surah = await getSurahDetails(surahId);
  const ayahs = await getAyahs(surahId, surah.verses_count);

  return (
    <div className="py-8 px-4 max-w-screen-md mx-auto min-h-screen">
      <AudioInitializer ayahs={ayahs} surahId={surahId} />

      <header className="mb-12 space-y-8">
        {/* Sticky Sidebar Navigation (PC Only) */}
        <aside className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-50 hidden md:flex flex-col gap-4 pointer-events-none opacity-60 hover:opacity-100 transition-opacity duration-300">
          <div className="nm-flat bg-background/80 backdrop-blur-xl p-3 rounded-2xl flex flex-col items-center gap-4 border border-white/20 shadow-2xl pointer-events-auto">
            <Link href="/">
              <button className="flex flex-col items-center gap-1 group/back p-1 rounded-xl transition-all active:scale-90" title="Go Back">
                <div className="p-3 rounded-xl bg-background border border-border/50 text-gray-400 group-hover/back:text-primary group-hover/back:bg-primary/5 group-hover/back:border-primary/20 transition-all">
                  <ChevronLeft size={24} />
                </div>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover/back:text-primary transition-colors">
                  Back
                </span>
              </button>
            </Link>
            <div className="h-px w-full bg-border/50" />
            <div className="rotate-0">
              <JumpToAyah totalAyahs={surah.verses_count} isVertical={true} />
            </div>
          </div>
        </aside>

        {/* Floating Navigation (Mobile Only) */}
        <div className="fixed bottom-24 right-4 z-[60] md:hidden flex flex-col items-end gap-3 pointer-events-none">
           <div className="flex flex-col items-center gap-3 pointer-events-auto">
               <Link href="/">
                  <button className="w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center text-muted-foreground shadow-xl active:scale-90">
                    <ChevronLeft size={20} />
                  </button>
               </Link>
               <div className="p-2 bg-card/90 backdrop-blur-xl border border-border rounded-3xl shadow-2xl">
                  <JumpToAyah totalAyahs={surah.verses_count} isVertical={false} />
               </div>
           </div>
        </div>

        <div className="nm-convex p-8 rounded-3xl text-center space-y-4">
          <span className="inline-block nm-inset px-4 py-1 rounded-full text-xs font-bold text-emerald-600 uppercase">
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
