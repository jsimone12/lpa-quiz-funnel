'use client';

import { useEffect, useState } from 'react';
import { useQuiz } from '@/lib/context';
import { calculateOutcome } from '@/lib/quiz';

const METRICS = [
  'Analyzing business profile...',
  'Evaluating growth potential...',
  'Scoring readiness indicators...',
  'Mapping your ideal path...',
  'Personalizing your results...',
];

interface Props {
  contactStep: number;
}

export default function CalculatingStep({ contactStep }: Props) {
  const { answers, saveResult, setStep } = useQuiz();
  const [metricIndex, setMetricIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Cycle through metrics
    const metricInterval = setInterval(() => {
      setMetricIndex(prev => {
        if (prev < METRICS.length - 1) return prev + 1;
        clearInterval(metricInterval);
        return prev;
      });
    }, 700);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);

    // Done after ~3.8s
    const doneTimeout = setTimeout(() => {
      const result = calculateOutcome(answers);
      saveResult(result);
      setDone(true);
    }, 3800);

    return () => {
      clearInterval(metricInterval);
      clearInterval(progressInterval);
      clearTimeout(doneTimeout);
    };
  }, [answers, saveResult]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setStep(contactStep), 800);
      return () => clearTimeout(t);
    }
  }, [done, contactStep, setStep]);

  return (
    <div className="w-full max-w-md text-center">
      {/* Animated orb */}
      <div className="relative mx-auto mb-10" style={{ width: 160, height: 160 }}>
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            animation: 'spin 8s linear infinite',
          }}
        />
        {/* Middle ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 16,
            border: '1px solid rgba(201,168,76,0.35)',
            animation: 'spin 5s linear infinite reverse',
          }}
        />
        {/* Inner glow */}
        <div
          className="absolute rounded-full animate-pulse-gold"
          style={{
            inset: 32,
            background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.05) 70%)',
            boxShadow: '0 0 40px rgba(201,168,76,0.3)',
          }}
        />
        {/* Center icon */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display text-3xl"
          style={{ color: 'var(--gold)' }}
        >
          ◈
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>

      <h2
        className="font-display text-2xl mb-3"
        style={{ color: 'var(--cream)' }}
      >
        {done ? 'Analysis Complete' : 'Calculating Your Results'}
      </h2>

      {/* Cycling metric */}
      <p
        className="text-sm mb-8 h-5 transition-all duration-300"
        style={{ color: 'var(--gold)', fontFamily: "'DM Sans', sans-serif", opacity: done ? 0 : 1 }}
      >
        {METRICS[metricIndex]}
      </p>

      {/* Progress bar */}
      <div
        className="w-full rounded-full overflow-hidden mb-2"
        style={{ height: 4, background: 'rgba(201,168,76,0.15)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${done ? 100 : progress}%`,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            boxShadow: '0 0 8px rgba(201,168,76,0.6)',
          }}
        />
      </div>

      <p className="text-xs opacity-30" style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>
        {done ? '100%' : `${progress}%`}
      </p>
    </div>
  );
}
