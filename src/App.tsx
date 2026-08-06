import { useEffect, useState } from 'react';
import type { LessonIndex, LessonData } from './types';
import { fetchLessonIndex, fetchLesson } from './services/data';
import { Header } from './components/Header';
import { LessonCard } from './components/LessonCard';
import { LessonDetail } from './components/LessonDetail';
import { SRSReview } from './components/SRSReview';
import { Sparkles, BookOpen, Layers, ShieldAlert, Heart } from 'lucide-react';

export function App() {
  const [indexData, setIndexData] = useState<LessonIndex | null>(null);
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [allLessonsData, setAllLessonsData] = useState<LessonData[]>([]);
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz'>('lessons');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const index = await fetchLessonIndex();
        setIndexData(index);

        // Preload all lessons for SRS review mode
        const lessons = await Promise.all(
          index.lessons.map((item) => fetchLesson(item.id))
        );
        setAllLessonsData(lessons);
      } catch (err: any) {
        setError(err.message || 'Failed to load lesson index');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectLesson = async (id: string | null) => {
    if (id) {
      try {
        const lesson = await fetchLesson(id);
        setCurrentLesson(lesson);
      } catch (err: any) {
        setError(err.message || 'Failed to load lesson');
      }
    } else {
      setCurrentLesson(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-900 font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectLesson={handleSelectLesson}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
            <p className="text-sm font-medium text-slate-400">Loading Kannada lessons...</p>
          </div>
        ) : error ? (
          <div className="glass-card p-8 text-center max-w-md mx-auto my-12 border-rose-500/30">
            <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Lessons</h3>
            <p className="text-sm text-slate-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-rose-500 text-white font-semibold text-sm rounded-xl"
            >
              Retry
            </button>
          </div>
        ) : activeTab === 'quiz' ? (
          <SRSReview
            lessonsData={allLessonsData}
            onBack={() => {
              setActiveTab('lessons');
              handleSelectLesson(null);
            }}
          />
        ) : currentLesson ? (
          <LessonDetail
            lesson={currentLesson}
            onBack={() => handleSelectLesson(null)}
          />
        ) : (
          /* Main Lessons Index */
          <div className="space-y-8 animate-fade-in">
            {/* Banner */}
            <div className="glass-card p-6 md:p-8 relative overflow-hidden border-amber-500/20">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3 inline-block">
                  👶 Baby & Toddler Natural Immersion
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                  {indexData?.title}
                </h2>
                <p className="text-base text-slate-300 leading-relaxed mb-4">
                  {indexData?.subtitle}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{indexData?.lessons.length} Micro Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>Spaced Repetition (SRS) Shuffling</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Available Lessons</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {indexData?.lessons.length} Modules Total
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {indexData?.lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onSelect={(id) => handleSelectLesson(id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Kannada Gottu</span>
            <span>•</span>
            <span>Built for everyday learning in Karnataka</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for natural language acquisition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
