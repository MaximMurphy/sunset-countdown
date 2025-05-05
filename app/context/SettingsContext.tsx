"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Font = "Geist" | "IBM Plex" | "Roboto";
type TimeFormat = "12h" | "24h";
type Countdown = "ON" | "OFF";

interface SettingsContextType {
  font: Font;
  timeFormat: TimeFormat;
  countdown: Countdown;
  setFont: (font: Font) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setCountdown: (countdown: Countdown) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<Font>("Geist");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [countdown, setCountdown] = useState<Countdown>("ON");

  return (
    <SettingsContext.Provider
      value={{
        font,
        timeFormat,
        countdown,
        setFont,
        setTimeFormat,
        setCountdown,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
