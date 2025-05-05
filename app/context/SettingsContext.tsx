"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Font = "Geist" | "IBM Plex" | "Space";
type TimeFormat = "12h" | "24h";
type Countdown = "ON" | "OFF";
type CountdownPosition = "left" | "middle" | "right";
type CountdownSize = "sm" | "md" | "lg";

interface SettingsContextType {
  font: Font;
  timeFormat: TimeFormat;
  countdown: Countdown;
  countdownPosition: CountdownPosition;
  countdownSize: CountdownSize;
  setFont: (font: Font) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setCountdown: (countdown: Countdown) => void;
  setCountdownPosition: (position: CountdownPosition) => void;
  setCountdownSize: (size: CountdownSize) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<Font>("Geist");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");
  const [countdown, setCountdown] = useState<Countdown>("ON");
  const [countdownPosition, setCountdownPosition] =
    useState<CountdownPosition>("middle");
  const [countdownSize, setCountdownSize] = useState<CountdownSize>("lg");

  return (
    <SettingsContext.Provider
      value={{
        font,
        timeFormat,
        countdown,
        countdownPosition,
        countdownSize,
        setFont,
        setTimeFormat,
        setCountdown,
        setCountdownPosition,
        setCountdownSize,
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
