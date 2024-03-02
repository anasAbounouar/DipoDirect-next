import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/main.scss";
import "../styles/normalize.scss";
import "../styles/variables.scss";
import Navbar from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const metadata: Metadata = {
  title: "DipoDirect",
  description: "Generated by create next app",
};
import { Providers } from "./providers";
import Footer from "@/components/layout/footer";
import { ReduxProvider } from "./GlobalRedux/provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
