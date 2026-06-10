export interface Answer {
  text: string;
  points: number;
  flag?: 'hard-disqualify' | 'pre-business';
  tag?: string;
}

export interface Question {
  id: string;
  bant?: string;
  question: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    question: 'Are you running a business online?',
    answers: [
      { text: 'Yes and I want to make more sales', points: 2 },
      { text: 'No, but I want to learn how to start one', points: 1, flag: 'pre-business' },
    ],
  },
  {
    id: 'q2',
    bant: 'Authority',
    question: 'What is your role in this business?',
    answers: [
      { text: "It's just me so I'm wearing all the hats", points: 2 },
      { text: 'I have a business partner and we collaborate together to make things go', points: 2 },
      { text: "I haven't started a business yet but I would love to have a digital product live in the next 30 days", points: 1, flag: 'pre-business' },
    ],
  },
  {
    id: 'q3',
    bant: 'Need',
    question: 'What do you think is the biggest issue holding your business back?',
    answers: [
      { text: "I don't have systems for getting new clients or for managing my current ones", points: 3 },
      { text: "I don't know how to separate myself from the competition", points: 2 },
      { text: "I still don't have a fully formed business idea or strategy", points: 0, flag: 'pre-business' },
    ],
  },
  {
    id: 'q4',
    bant: 'Budget',
    question: 'When you think about pulling the trigger on investing in starting/scaling your business what feels comfortable?',
    answers: [
      { text: '$500 for systems and strategies that produce results in 30 days or less would be an ideal investment', points: 3 },
      { text: 'Anywhere between $150 to $300 makes sense for my budget but I would need that to pay off within the first 90 days', points: 2 },
      { text: "I'm not ready to put any money behind this mission yet, but I do have plenty of motivation to learn.", points: 0, flag: 'hard-disqualify' },
    ],
  },
  {
    id: 'q5',
    bant: 'Timing',
    question: 'How quickly would you like to see your own business producing real profits?',
    answers: [
      { text: "I need more sales right now so a solution that can be executed and producing in 7 business days or less is what I'm looking for", points: 3 },
      { text: "I'm having some success in my own business already so growing my current profits in the next 2 weeks would be ideal", points: 2 },
      { text: 'I want to see my own business up and running with the potential for profit within the next 30 days.', points: 1 },
    ],
  },
  {
    id: 'q6',
    question: 'Which payment processor do you primarily use?',
    answers: [
      { text: 'Stripe', points: 1, tag: 'stripe' },
      { text: 'PayPal', points: 1, tag: 'paypal' },
      { text: 'Zelle / CashApp', points: 1, tag: 'zelle-cashapp' },
    ],
  },
];

export type Outcome = 'qualified' | 'ready-to-start' | 'nurture' | 'no-idea';

export interface ScoreResult {
  outcome: Outcome;
  score: number;
  paymentProcessor: string;
}

export function calculateOutcome(answers: Record<string, Answer>): ScoreResult {
  const paymentProcessor = answers['q6']?.tag || '';

  // Budget (q4) is the gate. A paying budget always routes to a paying bucket,
  // even with no idea yet (they get signed and the generator comes free).
  const budgetAnswer = answers['q4'];
  if (budgetAnswer?.flag === 'hard-disqualify') {
    // No-money group. Split off the true "no idea yet" people for the generator.
    const noIdea =
      answers['q1']?.flag === 'pre-business' &&
      answers['q2']?.flag === 'pre-business' &&
      answers['q3']?.flag === 'pre-business';
    if (noIdea) {
      return { outcome: 'no-idea', score: 0, paymentProcessor };
    }
    return { outcome: 'nurture', score: 0, paymentProcessor };
  }

  let score = 0;
  for (const answer of Object.values(answers)) {
    score += answer.points;
  }

  // Any paying budget routes to a call. Score only splits the tag.
  if (score >= 10) {
    return { outcome: 'qualified', score, paymentProcessor };
  } else {
    return { outcome: 'ready-to-start', score, paymentProcessor };
  }
}
