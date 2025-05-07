"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import SunCalc from "suncalc";
import { useLocation } from "./LocationContext";

interface SunData {
  sunrise: Date;
  sunriseEnd: Date;
  goldenHourEnd: Date;
  solarNoon: Date;
  goldenHour: Date;
  sunsetStart: Date;
  sunset: Date;
  dusk: Date;
  nauticalDusk: Date;
  night: Date;
  nadir: Date;
  nightEnd: Date;
  nauticalDawn: Date;
  dawn: Date;
}

interface SunContextType {
  sunData: SunData | null;
  getNextEvent: () => { type: "sunrise" | "sunset"; time: Date } | null;
}

const SunContext = createContext<SunContextType | undefined>(undefined);

export function SunProvider({ children }: { children: ReactNode }) {
  const { latitude, longitude } = useLocation();
  const [sunData, setSunData] = useState<SunData | null>(null);

  const updateSunData = () => {
    if (latitude && longitude) {
      const times = SunCalc.getTimes(new Date(), latitude, longitude);
      setSunData(times);
    }
  };

  updateSunData();

  const getNextEvent = () => {
    if (!sunData) return null;

    const now = new Date();
    const sunriseTime = sunData.sunrise;
    const sunsetTime = sunData.sunset;

    // If both times are in the past, get tomorrow's times
    if (sunriseTime < now && sunsetTime < now) {
      if (latitude && longitude) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowTimes = SunCalc.getTimes(tomorrow, latitude, longitude);
        return tomorrowTimes.sunrise < tomorrowTimes.sunset
          ? { type: "sunrise" as const, time: tomorrowTimes.sunrise }
          : { type: "sunset" as const, time: tomorrowTimes.sunset };
      }
    }

    return sunriseTime < sunsetTime
      ? { type: "sunrise" as const, time: sunriseTime }
      : { type: "sunset" as const, time: sunsetTime };
  };

  return (
    <SunContext.Provider
      value={{
        sunData,
        getNextEvent,
      }}
    >
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
