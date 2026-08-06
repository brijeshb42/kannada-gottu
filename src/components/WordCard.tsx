import React, { useState } from 'react';
import type { WordItem } from '../types';
import { Volume2, Baby, CheckCircle2 } from 'lucide-react';
import { speakKannada } from '../services/speech';

interface WordCardProps {
  word: WordItem;
  index: number;
}

export const WordCard: React.FC<WordCardProps> = ({ word, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudio = () => {
    setIsPlaying(true);
    speakKannada(word.transliteration);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  return (
    <div className="glass-card p-6 relative overflow-hidden group border border-slate-700/60 hover:border-red-500/40 transition-all">
      {/* Corner Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Word #{index + 1}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-4">
        {/* Kannada Script & Pronunciation */}
        <div className="flex items-start justify-between gap-4 pr-12">
          <div>
            <h2 className="text-4xl font-extrabold text-amber-300 kannada-text tracking-wide mb-1">
              {word.kannada}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-wide">
                {word.transliteration}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono border border-slate-700">
                /{word.phonetic}/
              </span>
            </div>
          </div>

          <button
            onClick={handleAudio}
            title="Listen to pronunciation"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-500 text-slate-900 scale-110'
                : 'bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-900 border border-slate-700'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
          </button>
        </div>

        {/* English Meaning */}
        <div className="bg-slate-950/40 rounded-xl p-3.5 border border-slate-800/80">
          <span className="text-xs tracking-wider text-slate-400 font-semibold block mb-0.5 uppercase">
            MEANING & INTENT
          </span>
          <p className="text-base font-medium text-slate-100">{word.english}</p>
        </div>

        {/* Baby Analogy */}
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5">
          <Baby className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-amber-300 block mb-0.5">
              👶 How kids acquire this sound
            </span>
            <p className="text-xs text-amber-100/90 leading-relaxed">{word.babyAnalogy}</p>
          </div>
        </div>

        {/* Real World Action Tag */}
        <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-emerald-300 block mb-0.5">
              📍 Real-world practice trigger
            </span>
            <p className="text-xs text-emerald-100/90 leading-relaxed">{word.actionTag}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
