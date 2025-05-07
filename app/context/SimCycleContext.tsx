"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSun } from "./SunContext";

interface SimCycleContextType {
  sunPosition: number;
  skySaturation: number;
  skyLightness: number;
  simTime: Date;
}

const SimCycleContext = createContext<SimCycleContextType | undefined>(
  undefined
);

export function SimCycleProvider({ children }: { children: ReactNode }) {
  const { sunData } = useSun();
  const [sunPosition, setSunPosition] = useState(0);
  const [skySaturation, setSkySaturation] = useState(0);
  const [skyLightness, setSkyLightness] = useState(0);
  const [simTime, setSimTime] = useState(new Date());

  const parseTimeString = (timeStr: string) => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(period === "PM" ? hours + 12 : hours, minutes, seconds, 0);
    return date;
  };

  useEffect(() => {
    if (!sunData) return;

    const solarNoon = parseTimeString(sunData.solar_noon);
    const sunrise = parseTimeString(sunData.sunrise);
    const sunset = parseTimeString(sunData.sunset);

    let position = 0;
    let skySaturation = 0;
    let skyLightness = 0;
    let simTime = new Date();

    const updateSimCycle = () => {
      const now = new Date();

      setSunPosition(position);
      setSkySaturation(skySaturation);
      setSkyLightness(skyLightness);
      setSimTime(simTime);
    };

    updateSimCycle();
  }, []);

  return (
    <SimCycleContext.Provider
      value={{ sunPosition, skySaturation, skyLightness, simTime }}
    >
      {children}
    </SimCycleContext.Provider>
  );
}

export function useSimCycle() {
  const context = useContext(SimCycleContext);
  if (context === undefined) {
    throw new Error("useSimCycle must be used within a SimCycleProvider");
  }
  return context;
}
