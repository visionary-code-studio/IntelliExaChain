import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { i18n, Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CivicFlow — Your Election Education Guide",
  description:
    "CivicFlow is an interactive civic education assistant that helps you understand elections step by step — from voter registration to result declaration. Trusted, neutral, and easy to learn.",
  keywords: [
    "election guide",
    "civic education",
    "voter registration",
    "how elections work",
    "voting process",
    "election timeline",
    "first time voter",
    "civic assistant",
  ],
  authors: [{ name: "CivicFlow" }],
  openGraph: {
    title: "CivicFlow — Your Election Education Guide",
    description:
      "Understand elections from start to finish. Guided learning, visual timelines, and a conversational civic assistant.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicFlow — Your Election Education Guide",
    description: "Interactive civic education. Learn how elections work, step by step.",
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Navbar locale={locale} dict={dictionary.navigation} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} dict={dictionary} />
          <MobileBottomNav locale={locale} dict={dictionary.navigation} />
        </ThemeProvider>
      </body>
    </html>
  );
}
