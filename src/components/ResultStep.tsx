'use client';

import { useQuiz } from '@/lib/context';

const WEBINAR_URL = 'https://webinar.jsimonesolutions.com/confirmation-page-954321';

const OUTCOMES = {
  'six-months': {
    badge: '✦ 6 Months',
    headline: 'Your results are in.',
    body: "You're less than 6 months away from the life you truly want to live. Quitting corporate doesn't have to be a dream, you just need a simple roadmap to follow to make it a reality. If that feels like a practical next step you should check out my free When Should You Quit Webinar. In it I walk you through the exact steps I took to quit my own corporate job and start the business that now lets me live and work from anywhere in the world. Click the button below to confirm your registration and I'll see you there.",
    cta: 'Confirm My Registration',
    ctaUrl: WEBINAR_URL,
    accent: 'var(--gold)',
  },
  'one-year': {
    badge: '✦ 1 Year Max',
    headline: 'Your results are in.',
    body: "You're less than 12 months away from the life you truly want to live. Quitting corporate doesn't have to be a dream, you just need a simple roadmap to follow to make it a reality. If that feels like a practical next step you should check out my free When Should You Quit Webinar. In it I walk you through the exact steps I took to quit my own corporate job and start the business that now lets me live and work from anywhere in the world. Click the button below to confirm your registration and I'll see you there.",
    cta: 'Confirm My Registration',
    ctaUrl: WEBINAR_URL,
    accent: 'var(--gold)',
  },
  'year-half': {
    badge: '✦ Year and Half TOPS',
    headline: 'Your results are in.',
    body: "You're less than 18 months away from the life you truly want to live. Quitting corporate doesn't have to be a dream, you just need a simple roadmap to follow to make it a reality. If that feels like a practical next step you should check out my free When Should You Quit Webinar. In it I walk you through the exact steps I took to quit my own corporate job and start the business that now lets me live and work from anywhere in the world. Click the button below to confirm your registration and I'll see you there.",
    cta: 'Confirm My Registration',
    ctaUrl: WEBINAR_URL,
    accent: 'var(--gold)',
  },
};

export default function ResultStep() {
  const { result, contact } = useQuiz();

  if (!result) return null;

  const outcome = OUTCOMES[result.outcome];

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      {/* Badge */}
      <div className="mb-6 text-center">
        <span
          className="text-xs uppercase tracking-widest px-4 py-1.5 rounded-full"
          style={{
            color: outcome.accent,
            border: `1px solid ${outcome.accent}`,
            opacity: 0.9,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {outcome.badge}
        </span>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-6"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${outcome.accent}30`,
          boxShadow: `0 0 40px ${outcome.accent}10`,
        }}
      >
        {contact?.firstName && (
          <p
            className="text-sm mb-3 opacity-60"
            style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}
          >
            Hey {contact.firstName},
          </p>
        )}

        <h2
          className="font-display text-2xl md:text-3xl mb-2"
          style={{ color: outcome.accent }}
        >
          {outcome.headline}
        </h2>

        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif", opacity: 0.9 }}
        >
          {outcome.body}
        </p>

        <a
          href={outcome.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold block w-full rounded-xl py-4 text-sm uppercase tracking-widest text-center"
          style={{ textDecoration: 'none' }}
        >
          {outcome.cta}
        </a>
      </div>

      {/* Footer */}
      <p
        className="text-xs text-center opacity-30"
        style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}
      >
        J Simone Solutions &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
