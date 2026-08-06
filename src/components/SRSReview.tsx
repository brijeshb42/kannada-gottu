import React, { useState } from 'react';
import type { LessonData } from '../types';
import { RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { speakKannada } from '../services/speech';

interface SRSReviewProps {
  lessonsData: LessonData[];
  onBack: () => void;
}

export const SRSReview: React.FC<SRSReviewProps> = ({ lessonsData, onBack }) => {
  // Aggregate all words across all available lessons
  const allWords = lessonsData.flatMap((l) => l.words.map((w) => ({ ...w, lessonTitle: l.title })));
  const allCombos = lessonsData.flatMap((l) => l.combos || []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentWord = allWords[currentIndex % allWords.length];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % allWords.length);
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentWord) {
      speakKannada(currentWord.transliteration);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-card p-6 border border-slate-700/80 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Spaced Repetition Algorithm Active</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Mixed Revision Flashcards</h2>
        <p className="text-sm text-slate-300">
          Shuffling core sounds across all lessons to build permanent long-term memory.
        </p>
      </div>

      {/* Interactive Flashcard */}
      {currentWord && (
        <div className="perspective-1000">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="glass-card p-8 min-h-[320px] cursor-pointer flex flex-col justify-between border border-amber-500/30 hover:border-amber-500/60 transition-all text-center relative group"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Card {currentIndex + 1} of {allWords.length}</span>
              <span className="text-amber-400 font-semibold">{currentWord.lessonTitle}</span>
            </div>

            {/* Front / Back Card Content */}
            {!isFlipped ? (
              <div className="my-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">
                  CAN YOU RECALL THIS SOUND?
                </span>
                <h3 className="text-5xl font-extrabold text-white kannada-text tracking-wide">
                  {currentWord.kannada}
                </h3>
                <p className="text-sm text-slate-400">Click or tap card to flip & reveal meaning</p>
              </div>
            ) : (
              <div className="my-auto space-y-4 animate-fade-in">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                  REVEALED MEANING
                </span>
                <h3 className="text-4xl font-extrabold text-amber-300">
                  {currentWord.transliteration}
                </h3>
                <p className="text-lg font-medium text-slate-100">{currentWord.english}</p>

                <div className="inline-flex items-center justify-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 font-mono">/{currentWord.phonetic}/</span>
                  <button
                    onClick={handlePlayAudio}
                    className="p-1.5 rounded-lg bg-amber-500 text-slate-900 hover:scale-110 transition-transform"
                    title="Play sound"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Card Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={handlePlayAudio}
                className="flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen Audio</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Click to {isFlipped ? 'hide' : 'reveal'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm font-semibold transition-all"
        >
          Back to Lessons
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-900 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
        >
          <span>Next Flashcard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mixed Combos Showcase */}
      {allCombos.length > 0 && (
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Unlocked Mixed Combos</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allCombos.map((c, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-base font-bold text-amber-300 kannada-text mr-2">{c.kannada}</span>
                  <span className="text-xs text-slate-300 font-medium">({c.transliteration})</span>
                  <p className="text-xs text-emerald-400 font-semibold">{c.meaning}</p>
                </div>
                <button
                  onClick={() => speakKannada(c.transliteration)}
                  className="p-1.5 rounded-lg bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-900 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
