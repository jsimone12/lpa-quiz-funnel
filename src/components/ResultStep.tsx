'use client';

import { useQuiz } from '@/lib/context';

const GIFT_URL = 'https://businessideagenerator.jsimonesolutions.com/getstarted';
const SKOOL_URL = 'https://www.skool.com/credit-cleaners-2490/about';
const WEBINAR_URL = 'https://webinar.jsimonesolutions.com/confirmation-page';

const OUTCOMES = {
  qualified: {
  label: "✦ Qualified",
  badge: "✦ Qualified",
  headline: "Your results are in.",
  body: "In my opinion, you're less than 12 months away from the life you truly want to live. Quitting corporate doesn't have to be a dream, because you have more than the required skills and resources you just need a simple roadmap to follow. That's exactly what I cover in my free When Should You Quit Webinar. It's a simple straight forward session where I walk you through the exact steps I took to quit my own corporate job and start the business that now lets me live and work from anywhere in the world making more money than I did before. Click the button below to confirm your registration and I'll see you there.",
  cta: "Confirm My Registration",
  ctaUrl: WEBINAR_URL,
  secondaryCta: "",
  secondaryCtaUrl: "",
  accent: 'var(--gold)',
},
'nurture': {
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
  'no-idea': {
    label: 'Start With The Idea',
    headline: 'Your results are in.',
    body: "You've got the right mindset about money, you just don't know what to do with it yet. And that's exactly why I built the Business Idea Generator for early entrepreneurs in your exact position. In just a couple of minutes it will give you personalized business ideas that leverage your existing skills and interest to create a product or service you can actually sell. Tap the button below and let's figure out what's the best fit for you.",
    cta: 'Get My Free Business Idea Generator',
    ctaUrl: GIFT_URL,
    secondaryCta: "",
    secondaryCtaUrl: "",
    accent: 'var(--gold)',
    badge: '✦ Start With The Idea',
  },
};

const PROCESSOR_NOTE: Record<string, string> = {
  'has-processor': 'You\'re already set up to take payments, that tells me you\'re serious about your business.',
  'zelle-cashapp': 'Zelle and CashApp work, and when you\'re ready to scale, we\'ll build out a real checkout flow for you.',
};

export default function ResultStep() {
  const { result, contact, setStep } = useQuiz();

  if (!result) return null;

  const outcome = OUTCOMES[result.outcome];
  const processorNote =
    result.outcome === 'nurture' ? PROCESSOR_NOTE[result.paymentProcessor] || '' : '';

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

        {result.outcome === 'no-idea' && (
          <button
            onClick={() => setStep(0)}
            className="block w-full mt-4 text-xs underline opacity-40 hover:opacity-70 transition-opacity text-center"
            style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif", background: 'transparent' }}
          >
            No thanks, I'm not interested
          </button>
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
