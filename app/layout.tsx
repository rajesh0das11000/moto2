import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/use-auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'MotoGlow - Premium Wash & Repair',
  description: 'Book the best car wash, bike wash, and bike repair services in your area.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#05070a] text-slate-100">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
