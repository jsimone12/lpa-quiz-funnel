'use client';

import { useQuiz } from '@/lib/context';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/bookings/systems-strategy-session-1234';
const SKOOL_URL = 'https://www.skool.com/credit-cleaners-2490/about';

const OUTCOMES = {
  qualified: {
    label: 'You\'re Ready to Scale',
    headline: 'Your results are in.',
    body: "Based on your answers you already have what it takes to scale, you're missing the systems to really succeed. Let's get on a strategy call and map out a gameplan that would get you exactly where you're trying to go.",
    cta: 'Book Your Strategy Call',
    ctaUrl: BOOKING_URL,
    accent: 'var(--gold)',
    badge: '✦ Qualified',
  },
  'ready-to-start': {
    label: 'Your Timing Is Perfect',
    headline: 'Your results are in.',
    body: "You're not behind, you're actually right on time. The hardest part of starting a business online is knowing exactly what to do first, but don't worry I got you. Let's map out your path together.",
    cta: 'Book Your Strategy Call',
    ctaUrl: BOOKING_URL,
    accent: 'var(--sage)',
    badge: '✦ Let\'s Build',
  },
  nurture: {
    label: 'Your Journey Starts Here',
    headline: 'Your results are in.',
    body: "Looks like you're off to a solid start and I want to help you build some momentum. I've got a FREE Skool community where I'm dropping gems everyday for early stage entrepreneurs. I think it would be a great fit. Click the link below to join.",
    cta: 'Join the Free Community',
    ctaUrl: SKOOL_URL,
    accent: 'var(--cream)',
    badge: '✦ Keep Growing',
  },
};

const PROCESSOR_NOTE: Record<string, string> = {
  stripe: 'You\'re already set up with Stripe — that tells me you\'re serious about your business.',
  paypal: 'PayPal is a solid start. We\'ll level up your payment infrastructure as you scale.',
  'zelle-cashapp': 'Zelle and CashApp work — and when you\'re ready to scale, we\'ll build out a real checkout flow for you.',
};

export default function ResultStep() {
  const { result, contact } = useQuiz();

  if (!result) return null;

  const outcome = OUTCOMES[result.outcome];
  const processorNote = PROCESSOR_NOTE[result.paymentProcessor] || '';

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
        className="rounded-2xl p-8 mb-6"
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

        {processorNote && (
          <div
            className="rounded-xl px-5 py-4 mb-6 text-sm"
            style={{
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.15)',
              color: 'var(--cream)',
              fontFamily: "'DM Sans', sans-serif",
              opacity: 0.8,
            }}
          >
            {processorNote}
          </div>
        )}

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
