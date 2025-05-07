"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSun } from "./SunContext";

interface DayCycleContextType {
  sunPosition: number;
  skyColorIndex: number;
}

const DayCycleContext = createContext<DayCycleContextType | undefined>(
  undefined
);

export function DayCycleProvider({ children }: { children: ReactNode }) {
  const { sunData } = useSun();
  const [sunPosition, setSunPosition] = useState(0);
  const [skyColorIndex, setSkyColorIndex] = useState(0);

  useEffect(() => {
    if (!sunData) return;

    const updateDayCycle = () => {
      const now = new Date();
      const solarNoon = new Date(sunData.solarNoon);
      const sunrise = new Date(sunData.sunrise);
      const sunset = new Date(sunData.sunset);

      const transitionPeriod = 7200000; // 2 hours
      const noonTransitionPeriod = 3600000; // 1 hour

      const isRising = now < new Date(sunrise.getTime() + transitionPeriod);
      const isSetting = now > new Date(sunset.getTime() - transitionPeriod);
      const isBeforeNoon =
        now < new Date(solarNoon.getTime() - noonTransitionPeriod);
      const isAfterNoon =
        now > new Date(solarNoon.getTime() + noonTransitionPeriod);
      const isAtNoon = !isBeforeNoon && !isAfterNoon;

      let position;
      let colorIndex;

      if (now < sunrise || now > sunset) {
        position = 100;
        colorIndex = 0; // Night
      } else if (isRising) {
        const riseProgress =
          (now.getTime() - sunrise.getTime()) / transitionPeriod;
        position = 100 - 70 * riseProgress;
        colorIndex = Math.floor(riseProgress * 4); // Transition from night to morning
      } else if (isSetting) {
        const setProgress =
          (now.getTime() - (sunset.getTime() - transitionPeriod)) /
          transitionPeriod;
        position = 30 + 70 * setProgress;
        colorIndex = 5 - Math.floor(setProgress * 4); // Transition from day to night
      } else if (isAtNoon) {
        position = 2;
        colorIndex = 8; // Midday
      } else if (isBeforeNoon) {
        const noonProgress =
          (now.getTime() - (sunrise.getTime() + transitionPeriod)) /
          (solarNoon.getTime() -
            noonTransitionPeriod -
            (sunrise.getTime() + transitionPeriod));
        position = 30 - 28 * noonProgress;
        colorIndex = 6; // Day
      } else {
        const noonProgress =
          (now.getTime() - (solarNoon.getTime() + noonTransitionPeriod)) /
          (sunset.getTime() -
            transitionPeriod -
            (solarNoon.getTime() + noonTransitionPeriod));
        position = 2 + 28 * noonProgress;
        colorIndex = 5; // Day
      }

      setSunPosition(position);
      setSkyColorIndex(colorIndex);
    };

    updateDayCycle();
    const interval = setInterval(updateDayCycle, 1000);

    return () => clearInterval(interval);
  }, [sunData]);

  return (
    <DayCycleContext.Provider value={{ sunPosition, skyColorIndex }}>
      {children}
    </DayCycleContext.Provider>
  );
}

export function useDayCycle() {
  const context = useContext(DayCycleContext);
  if (context === undefined) {
    throw new Error("useDayCycle must be used within a DayCycleProvider");
  }
  return context;
}
