"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Font = "Geist" | "Chivo" | "IBM Plex";
type TimeFormat = "12h" | "24h";
type Countdown = "ON" | "OFF";
type CountdownPosition = "left" | "middle" | "right";
type CountdownSize = "sm" | "md" | "lg";
type CountdownFormat = "colons" | "units";
type SunSize = "sm" | "md" | "lg";

interface SettingsContextType {
  font: Font;
  timeFormat: TimeFormat;
  countdown: Countdown;
  countdownPosition: CountdownPosition;
  countdownSize: CountdownSize;
  countdownFormat: CountdownFormat;
  locationVisible: boolean;
  sunSize: SunSize;
  setFont: (font: Font) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setCountdown: (countdown: Countdown) => void;
  setCountdownPosition: (position: CountdownPosition) => void;
  setCountdownSize: (size: CountdownSize) => void;
  setCountdownFormat: (format: CountdownFormat) => void;
  setLocationVisible: (visible: boolean) => void;
  setSunSize: (size: SunSize) => void;
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
  const [countdownFormat, setCountdownFormat] =
    useState<CountdownFormat>("colons");
  const [locationVisible, setLocationVisible] = useState<boolean>(false);
  const [sunSize, setSunSize] = useState<SunSize>("md");

  return (
    <SettingsContext.Provider
      value={{
        font,
        timeFormat,
        countdown,
        countdownPosition,
        countdownSize,
        countdownFormat,
        locationVisible,
        sunSize,
        setFont,
        setTimeFormat,
        setCountdown,
        setCountdownPosition,
        setCountdownSize,
        setCountdownFormat,
        setLocationVisible,
        setSunSize,
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
