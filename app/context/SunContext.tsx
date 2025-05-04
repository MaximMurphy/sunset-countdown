"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface SunData {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: string;
  civil_twilight_begin: string;
  civil_twilight_end: string;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
  astronomical_twilight_begin: string;
  astronomical_twilight_end: string;
}

interface SunContextType {
  sunData: SunData | null;
  setSunData: (data: SunData | null) => void;
  getNextEvent: () => { type: "sunrise" | "sunset"; time: string } | null;
}

const SunContext = createContext<SunContextType | undefined>(undefined);

export function SunProvider({ children }: { children: ReactNode }) {
  const [sunData, setSunData] = useState<SunData | null>(null);

  const getNextEvent = () => {
    if (!sunData) return null;

    const now = new Date();

    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const date = new Date(now);
      date.setHours(period === "PM" ? hours + 12 : hours, minutes, seconds, 0);
      if (date < now) {
        date.setDate(date.getDate() + 1);
      }
      return date;
    };

    const sunriseTime = parseTime(sunData.sunrise);
    const sunsetTime = parseTime(sunData.sunset);

    return sunriseTime < sunsetTime
      ? { type: "sunrise" as const, time: sunData.sunrise }
      : { type: "sunset" as const, time: sunData.sunset };
  };

  return (
    <SunContext.Provider value={{ sunData, setSunData, getNextEvent }}>
      {children}
    </SunContext.Provider>
  );
}

export function useSun() {
  const context = useContext(SunContext);
  if (context === undefined) {
    throw new Error("useSun must be used within a SunProvider");
  }
  return context;
}
