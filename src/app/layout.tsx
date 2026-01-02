// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/providers/ThemeProviders";
// import Header from "@/components/layouts/Header";
// import Footer from "@/components/layouts/Footer";
// import Script from "next/script";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "QuickSuite | Privacy-First Utilities",
//   description: "100% Client-side PDF and Image tools.",
// };
// <Script src="https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm" />;

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} min-h-screen flex flex-col`}>
//         <ThemeProvider>
//           {/* Header stays at the top of every page */}
//           <Header />

//           {/* The flex-grow ensures the footer stays at the bottom */}
//           <div className="grow">{children}</div>

//           {/* Footer stays at the bottom of every page */}
//           <Footer />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata, Viewport } from "next"; // Added Viewport
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProviders";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import InstallPWA from "@/components/pwa/InstallPWA";

const inter = Inter({ subsets: ["latin"] });

// Viewport must be exported separately in Next.js 14/15
export const viewport: Viewport = {
  themeColor: "#38bdf8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "QuickSuite | Privacy-First Local File Tools",
    template: "%s | QuickSuite",
  },
  description:
    "Process PDFs, images, and documents 100% locally in your browser. No cloud uploads, industrial-grade privacy.",
  keywords: [
    "PDF compressor",
    "background remover",
    "image to pdf",
    "offline tools",
    "privacy tools",
    "Next.js PWA",
  ],
  manifest: "/manifest.json",
  authors: [{ name: "QuickSuite Team" }],

  // OpenGraph (Facebook/LinkedIn)
  openGraph: {
    title: "QuickSuite | Privacy-First Local File Tools",
    description: "100% Client-Side AI Background Remover & PDF Tools",
    url: "https://quicksuite.vercel.app",
    siteName: "QuickSuite",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Ensure this exists in your public folder
        width: 1200,
        height: 630,
        alt: "QuickSuite Tools Preview",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "QuickSuite | Local File Processing",
    description:
      "Stop uploading files to servers. Use QuickSuite for local processing.",
    images: ["/og-image.png"],
  },

  // PWA & Apple
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "QuickSuite",
  },

  // Search Engine Instructions
  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
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
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          <InstallPWA />
        </ThemeProvider>
      </body>
    </html>
  );
}
