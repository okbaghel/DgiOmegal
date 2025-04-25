import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StrangerChat - Anonymous Video Chat',
  description: 'Connect with random strangers through video and text chat, no login required.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SocketProvider>
            {children}
          </SocketProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}