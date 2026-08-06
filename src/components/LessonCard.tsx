import React from 'react';
import type { LessonIndexItem } from '../types';
import { ChevronRight, Hash } from 'lucide-react';

interface LessonCardProps {
  lesson: LessonIndexItem;
  onSelect: (id: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(lesson.id)}
      className="glass-card p-6 cursor-pointer group flex flex-col justify-between hover:scale-[1.01] transition-all relative overflow-hidden"
    >
      {/* Top Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 opacity-75 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Stage & Number */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {lesson.stage}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
            <Hash className="w-3.5 h-3.5" />
            <span>Lesson {lesson.number}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
          {lesson.title}
        </h3>
        <p className="text-xs font-medium text-amber-400 mb-3">{lesson.topic}</p>

        {/* Description */}
        <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {lesson.description}
        </p>

        {/* Words Pill list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lesson.words.map((w, idx) => (
            <span 
              key={idx} 
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-amber-200 border border-slate-700/60 font-medium"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>{lesson.wordCount} Core Sounds</span>
        <div className="flex items-center gap-1 text-amber-400 group-hover:translate-x-1 transition-transform font-bold">
          <span>Start Lesson</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
