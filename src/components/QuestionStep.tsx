'use client';

import { useState } from 'react';
import { useQuiz } from '@/lib/context';
import { Question, Answer } from '@/lib/quiz';

interface Props {
  question: Question;
  stepIndex: number;
  totalQuestions: number;
  calculatingStep: number;
}

export default function QuestionStep({ question, stepIndex, totalQuestions, calculatingStep }: Props) {
  const { saveAnswer, setStep, answers } = useQuiz();
  const [selected, setSelected] = useState<Answer | null>(answers[question.id] || null);

  const handleSelect = (answer: Answer) => {
    setSelected(answer);
  };

  const handleNext = () => {
    if (!selected) return;
    saveAnswer(question.id, selected);
    const nextStep = stepIndex + 1;
    setStep(nextStep >= totalQuestions ? calculatingStep : nextStep);
  };

  const handleBack = () => {
    if (selected) saveAnswer(question.id, selected);
    setStep(stepIndex - 1);
  };

  const isYesNo = question.answers.length === 2 && stepIndex === 0;

  return (
    <div className="w-full max-w-xl animate-fade-in-up">
      {stepIndex === 0 && (
        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight"
          style={{ color: 'var(--gold)' }}
        >
          When Should You Quit Your Job Quiz
        </h1>
      )}

      <h2
        className="font-display text-2xl sm:text-2xl md:text-3xl mb-8 leading-snug"
        style={{ color: 'var(--cream)' }}
      >
        {question.question}
      </h2>

      <div className={`flex flex-col gap-3 mb-8 ${isYesNo ? 'md:flex-row' : ''}`}>
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleSelect(answer)}
            className={`answer-card rounded-xl px-6 py-4 text-left ${isYesNo ? 'md:flex-1' : ''} ${selected?.text === answer.text ? 'selected' : ''}`}
            style={{ color: 'var(--cream)' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  border: selected?.text === answer.text
                    ? '2px solid var(--gold)'
                    : '2px solid rgba(201,168,76,0.3)',
                  background: selected?.text === answer.text
                    ? 'var(--gold)'
                    : 'transparent',
                }}
              >
                {selected?.text === answer.text && (
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--navy)' }} />
                )}
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: '1.5' }}>
                {answer.text}
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="btn-gold w-full rounded-xl py-4 text-sm uppercase tracking-widest"
      >
        {stepIndex === totalQuestions - 1 ? 'See My Results' : 'Next'}
      </button>

      {stepIndex > 0 && (
        <button
          onClick={handleBack}
          className="w-full mt-3 py-3 text-xs uppercase tracking-widest opacity-50 hover:opacity-90 transition-opacity"
          style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif", background: 'transparent' }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}
