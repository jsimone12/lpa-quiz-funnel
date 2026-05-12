import type { Metadata } from 'next';
import './globals.css';
import { QuizProvider } from '@/lib/context';

export const metadata: Metadata = {
  title: 'Find Your Path | J Simone Solutions',
  description: 'Discover the right strategy to start or scale your online business.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}
