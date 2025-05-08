"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
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
  const [sunData, setSunData] = useState<SunData | null>(null);
  const { latitude, longitude } = useLocation();

  useEffect(() => {
    const updateSunData = () => {
      if (latitude && longitude) {
        const now = new Date();
        const times = SunCalc.getTimes(now, latitude, longitude);
        setSunData(times);
      }
    };

    updateSunData();
    // Update sun data every minute
    const interval = setInterval(updateSunData, 60000);
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  //console.log(sunData);

  const getNextEvent = () => {
    if (!sunData) return null;

    const now = new Date();
    const sunriseTime = sunData.sunrise;
    const sunsetTime = sunData.sunset;

    // If both times are in the past, get tomorrow's sunrise
    if (sunriseTime < now && sunsetTime < now) {
      if (latitude && longitude) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowTimes = SunCalc.getTimes(tomorrow, latitude, longitude);
        return { type: "sunrise" as const, time: tomorrowTimes.sunrise };
      }
    }

    // If both times are in the future, return the earlier one
    if (sunriseTime > now && sunsetTime > now) {
      return sunriseTime < sunsetTime
        ? { type: "sunrise" as const, time: sunriseTime }
        : { type: "sunset" as const, time: sunsetTime };
    }

    // If we get here, one time is in the past and one is in the future
    return sunriseTime > now
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
