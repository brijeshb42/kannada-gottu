import React, { useState } from 'react';
import type { LessonData } from '../types';
import { WordCard } from './WordCard';
import { ComboCard } from './ComboCard';
import { ArrowLeft, Sparkles, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

interface LessonDetailProps {
  lesson: LessonData;
  onBack: () => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    lesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Navigation & Header */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-amber-400 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lessons</span>
        </button>

        <div className="glass-card p-6 md:p-8 border border-slate-700/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {lesson.stage}
            </span>
            <span className="text-xs text-slate-400 font-mono">Lesson {lesson.number}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{lesson.title}</h1>
          <p className="text-sm font-semibold text-amber-400 mb-4">{lesson.topic}</p>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">{lesson.intro}</p>
        </div>
      </div>

      {/* 1. Core Words Grid */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Core Kannada Sounds</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lesson.words.map((word, idx) => (
            <WordCard key={word.id} word={word} index={idx} />
          ))}
        </div>
      </section>

      {/* 2. Mix & Match Combos */}
      {lesson.combos && lesson.combos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Mix & Match Combos</h2>
            </div>
            <span className="text-xs text-slate-400">Compounding words naturally</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {lesson.combos.map((combo, idx) => (
              <ComboCard key={idx} combo={combo} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Spaced Repetition Practice Quiz */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">1-Minute Recall Quiz</h2>
            </div>
            {showResults && (
              <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Score: {calculateScore()} / {lesson.quiz.length}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lesson.quiz.map((q, idx) => (
              <div key={q.id} className="glass-card p-6 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Scenario #{idx + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-200 mb-3">{q.scenario}</p>
                  <p className="text-xs text-slate-400 font-semibold mb-4">{q.question}</p>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt) => {
                      const active = selectedAnswers[q.id] === opt;
                      let optionStyle = "bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700";
                      if (showResults) {
                        if (opt === q.answer) {
                          optionStyle = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold";
                        } else if (active && opt !== q.answer) {
                          optionStyle = "bg-rose-500/20 text-rose-300 border-rose-500/50";
                        }
                      } else if (active) {
                        optionStyle = "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold";
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption(q.id, opt)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && opt === q.answer && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {showResults && active && opt !== q.answer && <XCircle className="w-4 h-4 text-rose-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showResults && (
                  <p className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-900 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
            >
              {showResults ? 'Hide Results & Try Again' : 'Check Answers'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
