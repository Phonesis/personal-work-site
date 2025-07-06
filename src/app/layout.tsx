import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Martin Poole - Lead Quality Engineer / SDET",
  description:
    "Martin Poole is a certified Lead Quality Engineer / SDET with 12+ years of experience in Playwright, Cypress, Selenium, and modern CI/CD. Explore skills, projects, and contact info.",
  openGraph: {
    title:
      "Martin Poole - Lead Quality Engineer / SDET",
    description:
      "Martin Poole is a certified Lead Quality Engineer / SDET with 12+ years of experience in Playwright, Cypress, Selenium, and modern CI/CD. Explore skills, projects, and contact info.",
    url: "https://martinpoole.cv/",
    siteName: "Martin Poole's Work Portfolio",
    images: [
      {
        url: "/profile.jpeg",
        width: 800,
        height: 800,
        alt: "Martin Poole profile photo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  keywords: [
    "Martin Poole",
    "Lead Quality Engineer",
    "SDET",
    "Test Automation",
    "Playwright",
    "Cypress",
    "Selenium",
    "CI/CD",
    "Portfolio",
    "Resume",
    "Mentoring",
    "Quality Assurance",
  ],
  authors: [
    {
      name: "Martin Poole",
      url: "https://www.linkedin.com/in/martin-poole-6b9b762b/",
    },
  ],
  creator: "Martin Poole",
  publisher: "Martin Poole",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
