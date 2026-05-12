'use client';

import { useState } from 'react';
import { useQuiz } from '@/lib/context';

interface Props {
  resultStep: number;
}

export default function ContactStep({ resultStep }: Props) {
  const { saveContact, setStep, result } = useQuiz();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const valid = form.firstName && form.lastName && form.email && form.phone;

  const handleSubmit = async () => {
    if (!valid || !result) return;
    setLoading(true);
    setError('');

    try {
      saveContact(form);
      // GHL webhook will be wired here after build
      // await fetch('/api/submit', { method: 'POST', body: JSON.stringify({ ...form, ...result }) });
      setStep(resultStep);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="mb-2">
        <span
          className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)', fontFamily: "'DM Sans', sans-serif" }}
        >
          Almost There
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl mb-3 mt-4" style={{ color: 'var(--cream)' }}>
        Where should we send your results?
      </h2>
      <p className="text-sm mb-8 opacity-60" style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>
        Your results are ready on the next screen, but since we both know once you close this tab you'll forget all about them, I'll shoot them to your inbox for safe keeping.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-3">
          <input
            className="quiz-input flex-1 rounded-xl px-4 py-3 text-sm"
            placeholder="First name"
            value={form.firstName}
            onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
          />
          <input
            className="quiz-input flex-1 rounded-xl px-4 py-3 text-sm"
            placeholder="Last name"
            value={form.lastName}
            onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
          />
        </div>
        <input
          className="quiz-input rounded-xl px-4 py-3 text-sm"
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
        />
        <input
          className="quiz-input rounded-xl px-4 py-3 text-sm"
          placeholder="Phone number"
          type="tel"
          value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
        />
      </div>

      {error && (
        <p className="text-sm mb-4 text-red-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!valid || loading}
        className="btn-gold w-full rounded-xl py-4 text-sm uppercase tracking-widest"
      >
        {loading ? 'Loading...' : 'Show My Results'}
      </button>

      <p className="text-xs text-center mt-4 opacity-30" style={{ color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>
        No spam. Ever.
      </p>
    </div>
  );
}
