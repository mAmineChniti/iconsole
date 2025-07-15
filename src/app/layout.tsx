import "@/styles/globals.css";

import { Providers } from "@/components/providers";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "IConsole",
  description: "Infrastructure Console",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full bg-gradient-to-br from-background via-background/95 to-muted/30 relative overflow-hidden">
        <div className="fixed inset-0 opacity-5 pointer-events-none" />
        <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-chart-1/20 via-chart-2/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-chart-5/20 via-chart-4/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 h-full">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
