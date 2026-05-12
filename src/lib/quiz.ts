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
      { text: "I haven't started the business just yet but I plan to in the next 3 months", points: 1, flag: 'pre-business' },
    ],
  },
  {
    id: 'q3',
    bant: 'Need',
    question: 'What do you think is the biggest issue holding your business back?',
    answers: [
      { text: "I'm still not certain of my business idea", points: 0, flag: 'pre-business' },
      { text: "I don't know how to separate myself from the competition", points: 2 },
      { text: "I don't have systems for getting new clients or for managing my current ones", points: 3 },
    ],
  },
  {
    id: 'q4',
    bant: 'Budget',
    question: 'Is investing in your business a priority for you to solve this problem?',
    answers: [
      { text: 'Yes, I have a budget of up to $1,500 for the right solution', points: 3 },
      { text: 'Kind of, I could probably afford between $750 and $1,000 for a guaranteed result', points: 2 },
      { text: "Don't have any extra money right now but lots of drive and motivation", points: 0, flag: 'hard-disqualify' },
    ],
  },
  {
    id: 'q5',
    bant: 'Timing',
    question: 'How quickly do you need to be making more sales in your business?',
    answers: [
      { text: 'I need more sales now and a solution that can be implemented in 30 days or faster', points: 3 },
      { text: "I've got a little wiggle room but I would love to see improvements in the next 6 months", points: 1 },
      { text: 'I really want to see myself having started this business in the next 90 days', points: 2 },
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
  // Hard disqualify check first
  const budgetAnswer = answers['q4'];
  if (budgetAnswer?.flag === 'hard-disqualify') {
    return { outcome: 'nurture', score: 0, paymentProcessor: answers['q6']?.tag || '' };
  }

  let score = 0;
  for (const answer of Object.values(answers)) {
    if (answer.flag !== 'hard-disqualify') {
      score += answer.points;
    }
  }

  const paymentProcessor = answers['q6']?.tag || '';

  // Check if they have strong budget + timing despite pre-business flags
  const budgetPoints = answers['q4']?.points || 0;
  const timingPoints = answers['q5']?.points || 0;
  const strongBudgetTiming = budgetPoints >= 2 && timingPoints >= 2;

  if (score >= 10) {
    return { outcome: 'qualified', score, paymentProcessor };
  } else if (strongBudgetTiming) {
    return { outcome: 'ready-to-start', score, paymentProcessor };
  } else {
    return { outcome: 'nurture', score, paymentProcessor };
  }
}
