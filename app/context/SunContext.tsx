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
}

const SunContext = createContext<SunContextType | undefined>(undefined);

export function SunProvider({ children }: { children: ReactNode }) {
  const [sunData, setSunData] = useState<SunData | null>(null);

  return (
    <SunContext.Provider value={{ sunData, setSunData }}>
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
