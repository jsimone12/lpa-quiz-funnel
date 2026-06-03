'use client';

import { useQuiz } from '@/lib/context';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/bookings/systems-strategy-session-1234';
const BUILD_CALL_URL = 'https://api.leadconnectorhq.com/widget/bookings/business-ideas-brainstorming';
const GIFT_URL = 'https://businessideagenerator.jsimonesolutions.com/getstarted';
const SKOOL_URL = 'https://www.skool.com/credit-cleaners-2490/about';

const OUTCOMES = {
  qualified: {
  label: "✦ Qualified",
  badge: "✦ Qualified",
  headline: "Your results are in.",
  body: "Based on your answers you already have what it takes to scale. The missing piece is the system, and that is what we will map out together. Book your strategy call below.",
  cta: "Book Your Strategy Call",
  ctaUrl: BOOKING_URL,
  secondaryCta: "",
  secondaryCtaUrl: "",
  processor: "You're already set up with Stripe, that tells me you're serious about your business.",
  accent: 'var(--gold)',
},
'ready-to-start': {
  label: "✦ Let's Build",
  badge: "✦ Let's Build",
  headline: "Your results are in.",
  body: "You are not behind, you are right on time. The biggest win right now is knowing exactly what to do first, and that is what we will figure out on your call. As my bonus gift to you, you're also getting FREE access to my Business Idea Generator to give you some money making momentum before the call. I'll see you there.",
  cta: "Book Your Strategy Call",
  ctaUrl: BUILD_CALL_URL,
  secondaryCta: "Get the Free Business Idea Generator",
  secondaryCtaUrl: GIFT_URL,
  processor: "PayPal is a solid start. We'll level up your payment infrastructure as you scale.",
  accent: 'var(--gold)',
},
  nurture: {
    label: 'Your Journey Starts Here',
    headline: 'Your results are in.',
    body: "Looks like you're off to a solid start and I want to help you build some momentum. I've got a FREE Skool community where I'm dropping gems everyday for early stage entrepreneurs. I think it would be a great fit. Click the link below to join.",
    cta: 'Join the Free Community',
    ctaUrl: SKOOL_URL,
    secondaryCta: "",
    secondaryCtaUrl: "",
    accent: 'var(--cream)',
    badge: '✦ Keep Growing',
  },
};

const PROCESSOR_NOTE: Record<string, string> = {
  stripe: 'You\'re already set up with Stripe, that tells me you\'re serious about your business.',
  paypal: 'PayPal is a solid start. We\'ll level up your payment infrastructure as you scale.',
  'zelle-cashapp': 'Zelle and CashApp work, and when you\'re ready to scale, we\'ll build out a real checkout flow for you.',
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

        {outcome.secondaryCta && outcome.secondaryCtaUrl && (
          <a
            href={outcome.secondaryCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl py-4 mt-3 text-sm uppercase tracking-widest text-center"
            style={{
              textDecoration: 'none',
              color: outcome.accent,
              border: `1px solid ${outcome.accent}`,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {outcome.secondaryCta}
          </a>
        )}
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
