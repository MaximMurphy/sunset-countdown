"use client";
import { createContext, useContext, ReactNode, useState } from "react";

interface SunsetData {
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

interface SunsetContextType {
  sunsetData: SunsetData | null;
  setSunsetData: (data: SunsetData | null) => void;
}

const SunsetContext = createContext<SunsetContextType | undefined>(undefined);

export function SunsetProvider({ children }: { children: ReactNode }) {
  const [sunsetData, setSunsetData] = useState<SunsetData | null>(null);

  return (
    <SunsetContext.Provider value={{ sunsetData, setSunsetData }}>
      {children}
    </SunsetContext.Provider>
  );
}

export function useSunset() {
  const context = useContext(SunsetContext);
  if (context === undefined) {
    throw new Error("useSunset must be used within a SunsetProvider");
  }
  return context;
}
