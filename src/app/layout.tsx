import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TerminalFrame from "@/components/TerminalFrame";
import { BackgroundEffect } from "@/components/BackgroundEffect";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OXOT Sovereign Intelligence Terminal",
  description: "Reliable Energy, Clean Water and Healthy Food for our (grand) children.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-charcoal text-white overflow-hidden`}>
        <BackgroundEffect />
        <TerminalFrame>
          {children}
        </TerminalFrame>
      </body>
    </html>
  );
}
