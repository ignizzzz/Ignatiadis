import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "System — Personal OS",
  description: "Accountability. Execution. No excuses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-bg text-text-primary antialiased font-sans">
        <Sidebar />
        <main className="md:ml-56 min-h-screen pb-20 md:pb-0">
          <div className="max-w-3xl mx-auto px-5 py-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
