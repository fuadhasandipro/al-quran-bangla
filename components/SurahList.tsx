'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Surah } from '@/lib/quranApi';
import { Play, Search } from 'lucide-react';

interface SurahCardProps {
  surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.id}`} onClick={() => {
      // Save current scroll position before navigating
      sessionStorage.setItem('surah-list-scroll', window.scrollY.toString());
    }}>
      <div className="card-modern h-full flex flex-col group cursor-pointer border-transparent hover:border-emerald-500/30">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-black px-3 py-1 bg-secondary text-secondary-foreground rounded-full uppercase tracking-widest">
            Chapter {surah.id}
          </span>
          <span className="arabic-text text-2xl text-primary group-hover:scale-110 transition-transform">
            {surah.name_arabic}
          </span>
        </div>
        <div className="mt-auto">
          <h3 className="text-xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">{surah.name_complex}</h3>
          <p className="text-sm text-muted-foreground font-medium font-bengali">{surah.translated_name.name}</p>
          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              {surah.verses_count} Verses
            </span>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <Play size={14} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function SurahList({ surahs }: { surahs: Surah[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Restore scroll position
    const savedScroll = sessionStorage.getItem('surah-list-scroll');
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll));
        // Optional: clear it after restore if you want it to reset on manual refresh
        // sessionStorage.removeItem('surah-list-scroll');
      }, 100);
    }
  }, []);

  const normalize = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const filteredSurahs = surahs.filter((surah) => {
    const query = normalize(searchQuery);
    if (!query) return true;
    
    return (
      normalize(surah.name_complex).includes(query) ||
      surah.id.toString().includes(query) ||
      normalize(surah.translated_name.name).includes(query)
    );
  });

  return (
    <div className="space-y-8">
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search Surah (name or number)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurahs.map((surah) => (
          <SurahCard key={surah.id} surah={surah} />
        ))}
      </div>
      
      {filteredSurahs.length === 0 && (
        <div className="text-center py-20 bg-secondary/20 rounded-[2rem] border border-dashed border-border">
          <p className="text-muted-foreground font-medium">No surahs found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
