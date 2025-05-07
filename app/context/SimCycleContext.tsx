"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useSun } from "./SunContext";

interface SimCycleContextType {
  sunPosition: number;
  skySaturation: number;
  skyLightness: number;
}

const SimCycleContext = createContext<SimCycleContextType | undefined>(
  undefined
);

export function SimCycleProvider({ children }: { children: ReactNode }) {
  const { sunData } = useSun();

  const [sunPosition, setSunPosition] = useState(0);
  const [skySaturation, setSkySaturation] = useState(0);
  const [skyLightness, setSkyLightness] = useState(0);

  // Use useRef to track simulation time without triggering re-renders
  const simulationTimeRef = useRef(0);

  useEffect(() => {
    if (!sunData) return;

    // Calculate total day duration in milliseconds
    const dayDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const simulationDuration = 24 * 1000; // 24 seconds for simulation

    const updateSimCycle = () => {
      // Update simulation time using ref
      simulationTimeRef.current =
        (simulationTimeRef.current + 1000) % simulationDuration;

      // Calculate progress through the day (0 to 1)
      const progress = simulationTimeRef.current / simulationDuration;

      // Calculate simulated date based on progress
      const simulatedDate = new Date(
        sunData.sunrise.getTime() + progress * dayDuration
      );

      let position, skySaturation, skyLightness;

      // Sunrise to sunriseEnd (0-10%)
      if (
        simulatedDate >= sunData.sunrise &&
        simulatedDate < sunData.sunriseEnd
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.sunrise.getTime()) /
          (sunData.sunriseEnd.getTime() - sunData.sunrise.getTime());
        position = 100 - progress * (100 - 55);
        skySaturation = 70 - progress * (70 - 65);
        skyLightness = 15 + progress * (25 - 15);
      }

      // sunriseEnd to goldenHourEnd (10-20%)
      else if (
        simulatedDate >= sunData.sunriseEnd &&
        simulatedDate < sunData.goldenHourEnd
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.sunriseEnd.getTime()) /
          (sunData.goldenHourEnd.getTime() - sunData.sunriseEnd.getTime());
        position = 55 - progress * (55 - 35);
        skySaturation = 65 - progress * (65 - 60);
        skyLightness = 25 + progress * (45 - 25);
      }

      // goldenHourEnd to midpoint1 (20-35%)
      else if (
        simulatedDate >= sunData.goldenHourEnd &&
        simulatedDate <
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          )
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.goldenHourEnd.getTime()) /
          ((sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2 -
            sunData.goldenHourEnd.getTime());
        position = 35 - progress * (35 - 15);
        skySaturation = 60 + progress * (85 - 60);
        skyLightness = 45;
      }

      // midpoint1 to solarNoon (35-50%)
      else if (
        simulatedDate >=
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          ) &&
        simulatedDate < sunData.solarNoon
      ) {
        const progress =
          (simulatedDate.getTime() -
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) /
              2) /
          (sunData.solarNoon.getTime() -
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) /
              2);
        position = 15 - progress * (15 - 2);
        skySaturation = 85 + progress * (100 - 85);
        skyLightness = 45;
      }

      // solarNoon to midpoint2 (50-65%)
      else if (
        simulatedDate >= sunData.solarNoon &&
        simulatedDate <
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          )
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.solarNoon.getTime()) /
          ((sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2 -
            sunData.solarNoon.getTime());
        position = 2;
        skySaturation = 100;
        skyLightness = 45 - progress * (45 - 40);
      }

      // midpoint2 to goldenHour (65-80%)
      else if (
        simulatedDate >=
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          ) &&
        simulatedDate < sunData.goldenHour
      ) {
        const progress =
          (simulatedDate.getTime() -
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2) /
          (sunData.goldenHour.getTime() -
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2);
        position = 2 + progress * (15 - 2);
        skySaturation = 100;
        skyLightness = 40 - progress * (40 - 35);
      }

      // goldenHour to sunsetStart (80-90%)
      else if (
        simulatedDate >= sunData.goldenHour &&
        simulatedDate < sunData.sunsetStart
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.goldenHour.getTime()) /
          (sunData.sunsetStart.getTime() - sunData.goldenHour.getTime());
        position = 15 + progress * (55 - 15);
        skySaturation = 100;
        skyLightness = 35 - progress * (35 - 20);
      }

      // sunsetStart to sunset (90-100%)
      else if (
        simulatedDate >= sunData.sunsetStart &&
        simulatedDate < sunData.sunset
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.sunsetStart.getTime()) /
          (sunData.sunset.getTime() - sunData.sunsetStart.getTime());
        position = 55 + progress * (100 - 55);
        skySaturation = 100 - progress * (100 - 90);
        skyLightness = 20 - progress * (20 - 15);
      }

      // sunset to dusk (100-110%)
      else if (
        simulatedDate >= sunData.sunset &&
        simulatedDate < sunData.dusk
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.sunset.getTime()) /
          (sunData.dusk.getTime() - sunData.sunset.getTime());
        position = 100;
        skySaturation = 90 - progress * (90 - 85);
        skyLightness = 15 - progress * (15 - 10);
      }

      // dusk to nauticalDusk (110-120%)
      else if (
        simulatedDate >= sunData.dusk &&
        simulatedDate < sunData.nauticalDusk
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.dusk.getTime()) /
          (sunData.nauticalDusk.getTime() - sunData.dusk.getTime());
        position = 100;
        skySaturation = 85 - progress * (85 - 80);
        skyLightness = 10 - progress * (10 - 5);
      }

      // nauticalDusk to night (120-130%)
      else if (
        simulatedDate >= sunData.nauticalDusk &&
        simulatedDate < sunData.night
      ) {
        position = 100;
        skySaturation = 80;
        skyLightness = 5;
      }

      // night to nauticalDawn (130-140%)
      else if (
        simulatedDate >= sunData.night &&
        simulatedDate < sunData.nauticalDawn
      ) {
        position = 100;
        skySaturation = 80;
        skyLightness = 5;
      }

      // nauticalDawn to dawn (140-150%)
      else if (
        simulatedDate >= sunData.nauticalDawn &&
        simulatedDate < sunData.dawn
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.nauticalDawn.getTime()) /
          (sunData.dawn.getTime() - sunData.nauticalDawn.getTime());
        position = 100;
        skySaturation = 80 - progress * (80 - 75);
        skyLightness = 5 + progress * (10 - 5);
      }

      // dawn to sunrise (150-160%)
      else if (
        simulatedDate >= sunData.dawn &&
        simulatedDate < sunData.sunrise
      ) {
        const progress =
          (simulatedDate.getTime() - sunData.dawn.getTime()) /
          (sunData.sunrise.getTime() - sunData.dawn.getTime());
        position = 100;
        skySaturation = 75 - progress * (75 - 70);
        skyLightness = 10 + progress * (15 - 10);
      }

      // Default night values
      else {
        position = 100;
        skySaturation = 80;
        skyLightness = 5;
      }

      setSunPosition(position);
      setSkySaturation(skySaturation);
      setSkyLightness(skyLightness);
    };

    updateSimCycle();
    const interval = setInterval(updateSimCycle, 1000);

    return () => clearInterval(interval);
  }, [sunData]); // Remove simulationTime from dependencies

  return (
    <SimCycleContext.Provider
      value={{ sunPosition, skySaturation, skyLightness }}
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
