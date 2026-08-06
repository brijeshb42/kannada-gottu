export interface LessonIndexItem {
  id: string;
  number: number;
  title: string;
  stage: string;
  topic: string;
  description: string;
  wordCount: number;
  words: string[];
  createdDate: string;
}

export interface LessonIndex {
  title: string;
  subtitle: string;
  quietHours: string;
  lessons: LessonIndexItem[];
}

export interface WordItem {
  id: string;
  kannada: string;
  transliteration: string;
  phonetic: string;
  english: string;
  babyAnalogy: string;
  actionTag: string;
}

export interface ComboItem {
  kannada: string;
  transliteration: string;
  meaning: string;
  context: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface LessonData {
  id: string;
  number: number;
  title: string;
  stage: string;
  topic: string;
  intro: string;
  words: WordItem[];
  combos: ComboItem[];
  quiz: QuizQuestion[];
}
