// @ts-nocheck
// TypeScript checking is disabled for this file
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/main.scss';
import '../styles/normalize.scss';
import '../styles/variables.scss';

const inter = Inter({ subsets: ['latin'] });
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const metadata: Metadata = {
  title: 'DipoDirect',
  description: 'Moroccan Start Up',
  // icons: {
  //   icon: "/assets/logo.png",
  // },
};
import { Providers } from './providers';
import Footer from '@/components/layout/footer';
import { ReduxProvider } from './GlobalRedux/provider';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';
import CartNavDesktop from '@/components/layout/navbar';
import { Toaster } from 'react-hot-toast';
import MobileNavigationBar from '@/components/layout/mobileNavigationBar';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link rel="icon" href={'/assets/logo.png'} sizes="70x32" />
        <ClerkProvider>
          <ReduxProvider>
            <Providers>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: '',
                  duration: 5000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },

                  // Default options for specific types
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: 'green',
                      secondary: 'black',
                    },
                  },
                }}
              />
              <MobileNavigationBar />
              <CartNavDesktop />
              {children}
              <Footer />
            </Providers>
          </ReduxProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
