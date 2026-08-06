import React from 'react';
import { BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'lessons' | 'quiz';
  setActiveTab: (tab: 'lessons' | 'quiz') => void;
  onSelectLesson: (id: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onSelectLesson }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => { onSelectLesson(null); setActiveTab('lessons'); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
            ಕ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-wide">
                Kannada Gottu <span className="kannada-text text-amber-400 font-semibold text-lg ml-1">(ಕನ್ನಡ ಗೊತ್ತು)</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">Natural Language Immersion for Beginners</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/50 self-start md:self-auto">
          <button
            onClick={() => { onSelectLesson(null); setActiveTab('lessons'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'lessons'
                ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>SRS Revision</span>
            <span className="bg-amber-400/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-400/30">
              Mix
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
