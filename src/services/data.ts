import type { LessonIndex, LessonData } from '../types';

let cachedIndex: LessonIndex | null = null;
const cachedLessons: Record<string, LessonData> = {};

export async function fetchLessonIndex(): Promise<LessonIndex> {
  if (cachedIndex) return cachedIndex;
  const response = await fetch('/data/index.json');
  if (!response.ok) {
    throw new Error('Failed to load lesson index');
  }
  const data: LessonIndex = await response.json();
  cachedIndex = data;
  return data;
}

export async function fetchLesson(id: string): Promise<LessonData> {
  if (cachedLessons[id]) return cachedLessons[id];
  const response = await fetch(`/data/lessons/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load lesson ${id}`);
  }
  const data: LessonData = await response.json();
  cachedLessons[id] = data;
  return data;
}
