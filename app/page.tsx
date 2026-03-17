import { getSurahs } from '@/lib/quranApi';
import { SurahList } from '@/components/SurahList';

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="space-y-12 py-12 px-6 max-w-screen-xl mx-auto">
      <section className="relative overflow-hidden p-12 rounded-[2rem] bg-slate-900 text-white dark:bg-emerald-950 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Read, Listen, <br/>
            <span className="text-emerald-400">Experience.</span>
          </h1>
          <p className="text-xl text-slate-300 font-medium max-w-lg leading-relaxed font-bengali uppercase tracking-wide">
            পবিত্র কোরআন - আপনার আধ্যাত্মিক যাত্রার সঙ্গী।
          </p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
      </section>

      <section>
        <div className="mb-10 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-foreground">Explore Surahs</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Dive into the Word of Allah</p>
          </div>
          <div className="px-5 py-2 rounded-2xl bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-widest">
            {surahs.length} Chapters
          </div>
        </div>
        <SurahList surahs={surahs} />
      </section>
    </div>
  );
}
