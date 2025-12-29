import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProviders";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickSuite | Privacy-First Utilities",
  description: "100% Client-side PDF and Image tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          {/* Header stays at the top of every page */}
          <Header />

          {/* The flex-grow ensures the footer stays at the bottom */}
          <div className="grow">{children}</div>

          {/* Footer stays at the bottom of every page */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
