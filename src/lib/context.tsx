'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Answer, ScoreResult } from './quiz';

interface QuizState {
  currentStep: number;
  answers: Record<string, Answer>;
  contact: { firstName: string; lastName: string; email: string; phone: string } | null;
  result: ScoreResult | null;
  setStep: (step: number) => void;
  saveAnswer: (questionId: string, answer: Answer) => void;
  saveContact: (contact: QuizState['contact']) => void;
  saveResult: (result: ScoreResult) => void;
}

const QuizContext = createContext<QuizState | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [contact, setContact] = useState<QuizState['contact']>(null);
  const [result, setResult] = useState<ScoreResult | null>(null);

  return (
    <QuizContext.Provider value={{
      currentStep,
      answers,
      contact,
      result,
      setStep: setCurrentStep,
      saveAnswer: (id, answer) => setAnswers(prev => ({ ...prev, [id]: answer })),
      saveContact: setContact,
      saveResult: setResult,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}
