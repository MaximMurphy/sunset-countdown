"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Font = "Geist" | "Chivo" | "IBM Plex";
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
  locationVisible: boolean;
  setFont: (font: Font) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setCountdown: (countdown: Countdown) => void;
  setCountdownPosition: (position: CountdownPosition) => void;
  setCountdownSize: (size: CountdownSize) => void;
  setLocationVisible: (visible: boolean) => void;
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
  const [locationVisible, setLocationVisible] = useState<boolean>(false);

  return (
    <SettingsContext.Provider
      value={{
        font,
        timeFormat,
        countdown,
        countdownPosition,
        countdownSize,
        locationVisible,
        setFont,
        setTimeFormat,
        setCountdown,
        setCountdownPosition,
        setCountdownSize,
        setLocationVisible,
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
