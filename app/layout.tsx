import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'

export const metadata: Metadata = {
  title: "Memoji-my",
  description: "Memory game made by Jimy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="container mx-auto p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">memoji-my</h1>
              <div className="flex items-center space-x-4">
                <Link href="https://github.com/jlm109-ua/hangman" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                  <IoLogoGithub size={24} />
                </Link>
                <ThemeToggle />
              </div>
            </header>
            <main className="container mx-auto p-4 flex-grow">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}