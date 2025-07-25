import type { Metadata } from "next";
import '@/styles/globals.css'
import PageSwitcher from "@/components/PageSwitcher";
import Navbar from "@/components/UI/navbar/Navbar";

export const metadata: Metadata = {
  title: "Test",
  description: "Test metadata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='antialiased flex flex-col items-center justify-center'>
        <main className="w-full flex items-center justify-center">
          {children}
        </main>
        <Navbar/>
      </body>
    </html>
  );
}
