import React, { useState } from 'react';
import type { ComboItem } from '../types';
import { Volume2, Layers } from 'lucide-react';
import { speakKannada } from '../services/speech';

interface ComboCardProps {
  combo: ComboItem;
  index: number;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudio = () => {
    setIsPlaying(true);
    speakKannada(combo.transliteration);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  return (
    <div className="glass-card p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-500/30">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
            Combo #{index + 1}
          </span>
        </div>

        <button
          onClick={handleAudio}
          className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-900 border border-slate-700 transition-all"
          title="Play combination sound"
        >
          <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
        </button>
      </div>

      <div className="space-y-2">
        <h3 lang="kn" className="text-2xl font-bold text-amber-200 kannada-text">
          {combo.kannada}
        </h3>
        <p className="text-base font-semibold text-white">{combo.transliteration}</p>
        <p className="text-sm font-medium text-emerald-400">"{combo.meaning}"</p>
        <p className="text-xs text-slate-400 bg-slate-950/40 p-2 rounded-lg border border-slate-800">
          💡 {combo.context}
        </p>
      </div>
    </div>
  );
};
