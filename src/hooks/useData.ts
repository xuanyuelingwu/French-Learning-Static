import { useState, useEffect } from 'react';

export interface Vocabulary {
  id: number;
  unit: string;
  lesson: string;
  french: string;
  partOfSpeech: string | null;
  chinese: string;
  phonetic: string | null;
  exampleFr: string | null;
  exampleZh: string | null;
  createdAt: string;
}

export interface Grammar {
  id: number;
  category: string;
  title: string;
  content: string;
  examples: string | null;
  unit: string | null;
  lesson: string | null;
  order: number;
  createdAt: string;
}

export interface VerbConjugation {
  id: number;
  verb: string;
  chinese: string;
  group: 'first' | 'second' | 'third';
  je: string | null;
  tu: string | null;
  il: string | null;
  nous: string | null;
  vous: string | null;
  ils: string | null;
  notes: string | null;
  createdAt: string;
}

export interface Text {
  id: number;
  unit: string;
  lesson: string;
  section: string | null;
  title: string | null;
  frenchText: string;
  chineseText: string;
  order: number;
  createdAt: string;
}

function useJsonData<T>(filename: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`/French-Learning-Static/data/${filename}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [filename]);

  return { data, loading, error };
}

export function useVocabulary() {
  return useJsonData<Vocabulary>('vocabulary.json');
}

export function useGrammar() {
  return useJsonData<Grammar>('grammar.json');
}

export function useVerbs() {
  return useJsonData<VerbConjugation>('verbs.json');
}

export function useTexts() {
  return useJsonData<Text>('texts.json');
}
