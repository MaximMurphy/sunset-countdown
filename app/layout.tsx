import type { Metadata } from "next";
import { Geist, Geist_Mono, Chivo_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SunProvider } from "./context/SunContext";
import { SettingsProvider } from "./context/SettingsContext";
import { LocationProvider } from "./context/LocationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sunset Countdown",
  description: "Displaying the sunset time for your location",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chivoMono.variable} ${ibmPlexMono.variable} antialiased h-[100dvh] overflow-hidden`}
      >
        <SettingsProvider>
          <LocationProvider>
            <SunProvider>{children}</SunProvider>
          </LocationProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
