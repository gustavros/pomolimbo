import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pomolimbo",
  description: "Pomolimbo is a Pomodoro timer with brown noise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon.png" />
      </head>
      <body className={grotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableColorScheme>
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
