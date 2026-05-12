'use client';

import { useQuiz } from '@/lib/context';
import { questions } from '@/lib/quiz';
import QuestionStep from '@/components/QuestionStep';
import CalculatingStep from '@/components/CalculatingStep';
import ContactStep from '@/components/ContactStep';
import ResultStep from '@/components/ResultStep';

// Steps: 0-5 = questions, 6 = calculating, 7 = contact, 8 = result
const TOTAL_QUESTIONS = questions.length;
const CALCULATING_STEP = TOTAL_QUESTIONS;
const CONTACT_STEP = TOTAL_QUESTIONS + 1;
const RESULT_STEP = TOTAL_QUESTIONS + 2;
const TOTAL_STEPS = TOTAL_QUESTIONS + 3;

export default function QuizPage() {
  const { currentStep } = useQuiz();

  const progressPercent = Math.min((currentStep / (TOTAL_STEPS - 1)) * 100, 100);

  return (
    <main className="min-h-screen flex flex-col" style={{ background: 'var(--navy)' }}>
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between max-w-2xl mx-auto w-full">
        <span className="font-display text-lg" style={{ color: 'var(--gold)' }}>
          J Simone Solutions
        </span>
        {currentStep < CALCULATING_STEP && (
          <span className="text-sm opacity-40" style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>
            {currentStep + 1} of {TOTAL_QUESTIONS}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {currentStep < RESULT_STEP && (
        <div className="w-full h-px" style={{ background: 'rgba(201,168,76,0.1)' }}>
          <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {currentStep < CALCULATING_STEP && (
          <QuestionStep
            question={questions[currentStep]}
            stepIndex={currentStep}
            totalQuestions={TOTAL_QUESTIONS}
            calculatingStep={CALCULATING_STEP}
          />
        )}
        {currentStep === CALCULATING_STEP && <CalculatingStep contactStep={CONTACT_STEP} />}
        {currentStep === CONTACT_STEP && <ContactStep resultStep={RESULT_STEP} />}
        {currentStep === RESULT_STEP && <ResultStep />}
      </div>
    </main>
  );
}
