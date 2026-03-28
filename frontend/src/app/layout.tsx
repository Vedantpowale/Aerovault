import type { Metadata } from "next";
import "./globals.css";
import GlobalBlurredBackground from "@/components/global-blurred-background";
import { AivaChatbot } from "@/components/aiva-chatbot";
import { Analytics } from "@vercel/analytics/react"; // ADDED

export const metadata: Metadata = {
  title: "Aerovault",
  description: "Book flights, track live status, and manage your travel with Aerovault Airlines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <GlobalBlurredBackground />
        {children}
        <AivaChatbot />
        <Analytics /> {/* ADDED */}
      </body>
    </html>
  );
}