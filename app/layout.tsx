import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import TopSection from "@/components/TopSection";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skinstric",
  description: "Amazing Skin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} `}>
      <body className={`${roboto.className}`}>
        <TopSection />
        {children}
      </body>
    </html>
  );
}
