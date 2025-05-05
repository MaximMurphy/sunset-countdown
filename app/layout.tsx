import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SunProvider } from "./context/SunContext";
import { DayCycleProvider } from "./context/DayCycleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sunset Countdown",
  description: "A beautiful sunset countdown timer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SunProvider>
          <DayCycleProvider>{children}</DayCycleProvider>
        </SunProvider>
      </body>
    </html>
  );
}
