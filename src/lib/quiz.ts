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
      { text: 'No, but I want to learn how to start one', points: 1 },
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
    question: 'Is investing in your business a priority for you to solve this problem?',
    answers: [
      { text: 'Yes, I have a budget of up to $500 for the right solution', points: 3 },
      { text: 'Kind of, I could probably afford between $150 and $300 for a guaranteed result', points: 2 },
      { text: "Don't have any extra money right now but lots of drive and motivation", points: 0, flag: 'hard-disqualify' },
    ],
  },
  {
    id: 'q5',
    bant: 'Timing',
    question: 'How quickly do you need to be making more sales in your business?',
    answers: [
      { text: "I need more sales now and a solution that can be implemented in the next 7 business days is what I'm looking for", points: 3 },
      { text: "I've got wiggle room but need to see my current business make some money in the next two weeks", points: 2 },
      { text: 'I want to see myself having this business up and running within the next 30 days', points: 1 },
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

export type Outcome = 'qualified' | 'ready-to-start' | 'nurture';

export interface ScoreResult {
  outcome: Outcome;
  score: number;
  paymentProcessor: string;
}

export function calculateOutcome(answers: Record<string, Answer>): ScoreResult {
  const paymentProcessor = answers['q6']?.tag || '';

  // Budget (q4) is the only gate. The no-money answer is the single path to nurture.
  const budgetAnswer = answers['q4'];
  if (budgetAnswer?.flag === 'hard-disqualify') {
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
