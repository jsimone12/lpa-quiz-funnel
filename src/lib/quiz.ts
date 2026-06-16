export interface Answer {
  text: string;
  points: number;
  flag?: 'hard-disqualify' | 'pre-business';
  tag?: string;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    question: 'Are you running a business online?',
    answers: [
      { text: 'Yes and I want to make enough money from it to quit my 9-5', points: 2 },
      { text: 'No, but I want to start one', points: 1, flag: 'pre-business' },
    ],
  },
  {
    id: 'q2',
    question: 'What is your current or ideal business structure?',
    answers: [
      { text: 'Just me on my own calling the shots and making my own money', points: 2 },
      { text: 'Me and a business partner splitting everything 50/50', points: 2 },
      { text: 'A full team where money and responsibilities are divided equally', points: 2 },
    ],
  },
  {
    id: 'q3',
    question: 'What is your biggest fear or challenge when it comes to running a business?',
    answers: [
      { text: 'Not having enough customers to actually make a profit.', points: 2 },
      { text: 'Not knowing enough about marketing and sales', points: 2 },
      { text: 'Getting clients, but not having the time or resources to deliver the experience they deserve', points: 2 },
    ],
  },
  {
    id: 'q4',
    question: 'How much revenue would your own digital business need to make in a year to match or even exceed your current salary?',
    answers: [
      { text: '$40,000 - $70,000', points: 0 },
      { text: '$70,000 - $100,000', points: 2 },
      { text: '$100,000+', points: 3 },
    ],
  },
  {
    id: 'q5',
    question: 'How quickly would you like to see your own business producing real profits?',
    answers: [
      { text: 'I would love to see my business with improved profits within the next 7 days', points: 3 },
      { text: "I'm just getting started with my business so if I was able to turn a profit in 14 days that would be amazing", points: 2 },
      { text: 'I want to be able to start my own business from scratch with the potential for profits in the next 30 days.', points: 1, flag: 'pre-business' },
    ],
  },
  {
    id: 'q6',
    question: 'What level of time and money could you reasonably invest in building a business that lets you quit corporate?',
    answers: [
      { text: 'I can spend up to $100 and probably have 6-10 hours a week I can spare', points: 0, flag: 'hard-disqualify' },
      { text: '$300-$500 is doable but I probably only have 4-5 hours a week that are really my own', points: 2 },
      { text: "$750-$1,000 is my budget but I doubt I even have 2-3 hours of real free time", points: 3 },
    ],
  },
];

export type Outcome = 'qualified' | 'nurture' | 'no-idea';

export interface ScoreResult {
  outcome: Outcome;
  score: number;
  paymentProcessor: string;
}

export function calculateOutcome(answers: Record<string, Answer>): ScoreResult {
  const paymentProcessor = answers['q6']?.tag || '';

  // Time + money (q6) is the sole qualifier. The "up to $100" tier does not
  // qualify. Both higher tiers qualify and route to webinar registration.
  const invest = answers['q6'];
  const disqualified = invest?.flag === 'hard-disqualify';

  if (!disqualified) {
    return { outcome: 'qualified', score: 0, paymentProcessor };
  }

  // Did not qualify. If the remaining signals point to no business yet
  // (no business, building from scratch), offer the Business Idea Generator.
  // Otherwise nurture via the free community.
  const noBusiness =
    answers['q1']?.flag === 'pre-business' &&
    answers['q5']?.flag === 'pre-business';

  if (noBusiness) {
    return { outcome: 'no-idea', score: 0, paymentProcessor };
  }
  return { outcome: 'nurture', score: 0, paymentProcessor };
}
