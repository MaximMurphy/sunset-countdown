"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Font = "Geist" | "IBM Plex" | "Roboto";
type TimeFormat = "12h" | "24h";

interface SettingsContextType {
  font: Font;
  timeFormat: TimeFormat;
  setFont: (font: Font) => void;
  setTimeFormat: (format: TimeFormat) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<Font>("Geist");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");

  return (
    <SettingsContext.Provider
      value={{
        font,
        timeFormat,
        setFont,
        setTimeFormat,
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
