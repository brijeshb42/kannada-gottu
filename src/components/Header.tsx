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
        <button
          type="button"
          onClick={() => { onSelectLesson(null); setActiveTab('lessons'); }}
          className="flex items-center gap-3 cursor-pointer group text-left"
        >
          <div lang="kn" className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-xl kannada-text group-hover:scale-105 transition-transform">
            ಕ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-wide">
                Kannada Gottu <span lang="kn" className="kannada-text text-amber-400 font-semibold text-lg ml-1">(ಕನ್ನಡ ಗೊತ್ತು)</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">Natural Language Immersion for Beginners</p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/50 self-start md:self-auto">
          <button
            onClick={() => { onSelectLesson(null); setActiveTab('lessons'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'lessons'
                ? 'bg-amber-500 text-slate-900 font-semibold'
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
                ? 'bg-amber-500 text-slate-900 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>SRS Revision</span>
          </button>
        </div>
      </div>
    </header>
  );
};
