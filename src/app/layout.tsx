import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amour Affairs | Studio Dashboard",
  description: "Client and operations management dashboard for Amour Affairs Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex bg-background text-foreground h-screen overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Sidebar Container */}
          <div className="p-3 pr-0 h-full flex shrink-0">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative h-full flex flex-col min-w-0">
            {/* Floating Header */}
            <div className="absolute top-0 left-0 right-0 z-50 p-3 pl-3">
              <Header />
            </div>

            {/* Scrollable Content */}
            <main className="flex-1 h-full overflow-y-auto pt-[92px] px-8 pb-12">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
