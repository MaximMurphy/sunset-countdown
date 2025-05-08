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
  starOpacity: number;
  moonXPosition: number;
  moonYPosition: number;
  moonOpacity: number;
}

const SimCycleContext = createContext<SimCycleContextType | undefined>(
  undefined
);

export function SimCycleProvider({ children }: { children: ReactNode }) {
  const { sunData } = useSun();

  const [sunPosition, setSunPosition] = useState(0);
  const [skySaturation, setSkySaturation] = useState(0);
  const [skyLightness, setSkyLightness] = useState(0);
  const [starOpacity, setStarOpacity] = useState(0);
  const [moonXPosition, setMoonXPosition] = useState(0);
  const [moonYPosition, setMoonYPosition] = useState(0);
  const [moonOpacity, setMoonOpacity] = useState(0);

  // Use useRef to track simulation time without triggering re-renders
  const simulationTimeRef = useRef(0);

  useEffect(() => {
    if (!sunData) return;

    // Calculate total day duration in milliseconds
    const simulationDuration = 24 * 1000; // 24 seconds for simulation

    const updateSimCycle = () => {
      // Update simulation time using ref
      simulationTimeRef.current =
        (simulationTimeRef.current + 1000) % simulationDuration;

      // Calculate progress through the day (0 to 1)
      const progress = simulationTimeRef.current / simulationDuration;

      // Calculate the simulated time within a 24-hour period
      const dayInMs = 24 * 60 * 60 * 1000;
      const simulatedTime = (progress * dayInMs) % dayInMs;

      // Create a base date at midnight
      const baseDate = new Date(sunData.sunrise);
      baseDate.setHours(0, 0, 0, 0);

      // Add the simulated time to get the current simulated date
      const simulatedDate = new Date(baseDate.getTime() + simulatedTime);

      let position = 1000;
      let skySaturation = 80;
      let skyLightness = 5;
      let starOpacity = 100;
      let moonXPosition = 0;
      let moonYPosition = 100;
      let moonOpacity = 0;

      // Helper function to check if a date is between two other dates
      const isBetween = (date: Date, start: Date, end: Date) => {
        const dateHours = date.getHours() + date.getMinutes() / 60;
        const startHours = start.getHours() + start.getMinutes() / 60;
        const endHours = end.getHours() + end.getMinutes() / 60;

        // Handle cases where the end time is on the next day
        if (endHours < startHours) {
          return dateHours >= startHours || dateHours < endHours;
        }

        return dateHours >= startHours && dateHours < endHours;
      };

      // Helper function to calculate progress between two dates
      const calculateProgress = (date: Date, start: Date, end: Date) => {
        const dateHours = date.getHours() + date.getMinutes() / 60;
        const startHours = start.getHours() + start.getMinutes() / 60;
        const endHours = end.getHours() + end.getMinutes() / 60;

        // Handle cases where the end time is on the next day
        if (endHours < startHours) {
          if (dateHours >= startHours) {
            return (dateHours - startHours) / (24 - startHours + endHours);
          } else {
            return (dateHours + 24 - startHours) / (24 - startHours + endHours);
          }
        }

        return (dateHours - startHours) / (endHours - startHours);
      };

      // Sunrise to sunriseEnd (0-10%)
      if (isBetween(simulatedDate, sunData.sunrise, sunData.sunriseEnd)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.sunrise,
          sunData.sunriseEnd
        );
        position = 100 - progress * (100 - 55);
        skySaturation = 70 - progress * (70 - 65);
        skyLightness = 15 + progress * (25 - 15);
        starOpacity = 0;
        moonXPosition = progress * 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Sunrise to Sunrise End");
      }

      // sunriseEnd to goldenHourEnd (10-20%)
      else if (
        isBetween(simulatedDate, sunData.sunriseEnd, sunData.goldenHourEnd)
      ) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.sunriseEnd,
          sunData.goldenHourEnd
        );
        position = 55 - progress * (55 - 35);
        skySaturation = 65 - progress * (65 - 60);
        skyLightness = 25 + progress * (45 - 25);
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Sunrise End to Golden Hour End");
      }

      // goldenHourEnd to midpoint1 (20-35%)
      else if (
        isBetween(
          simulatedDate,
          sunData.goldenHourEnd,
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          )
        )
      ) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.goldenHourEnd,
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          )
        );
        position = 35 - progress * (35 - 15);
        skySaturation = 60 + progress * (85 - 60);
        skyLightness = 45;
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Golden Hour End to Midpoint 1");
      }

      // midpoint1 to solarNoon (35-50%)
      else if (
        isBetween(
          simulatedDate,
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          ),
          sunData.solarNoon
        )
      ) {
        const progress = calculateProgress(
          simulatedDate,
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          ),
          sunData.solarNoon
        );
        position = 15 - progress * (15 - 2);
        skySaturation = 85 + progress * (100 - 85);
        skyLightness = 45;
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Midpoint 1 to Solar Noon");
      }

      // solarNoon to midpoint2 (50-65%)
      else if (
        isBetween(
          simulatedDate,
          sunData.solarNoon,
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          )
        )
      ) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.solarNoon,
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          )
        );
        position = 2;
        skySaturation = 100;
        skyLightness = 45 - progress * (45 - 40);
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Solar Noon to Midpoint 2");
      }

      // midpoint2 to goldenHour (65-80%)
      else if (
        isBetween(
          simulatedDate,
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          ),
          sunData.goldenHour
        )
      ) {
        const progress = calculateProgress(
          simulatedDate,
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          ),
          sunData.goldenHour
        );
        position = 2 + progress * (30 - 2);
        skySaturation = 100;
        skyLightness = 40 - progress * (40 - 35);
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Midpoint 2 to Golden Hour");
      }

      // goldenHour to sunsetStart (80-90%)
      else if (
        isBetween(simulatedDate, sunData.goldenHour, sunData.sunsetStart)
      ) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.goldenHour,
          sunData.sunsetStart
        );
        position = 30 + progress * (55 - 30);
        skySaturation = 100;
        skyLightness = 35 - progress * (35 - 20);
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Golden Hour to Sunset Start");
      }

      // sunsetStart to sunset (90-100%)
      else if (isBetween(simulatedDate, sunData.sunsetStart, sunData.sunset)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.sunsetStart,
          sunData.sunset
        );
        position = 55 + progress * (100 - 55);
        skySaturation = 100 - progress * (100 - 90);
        skyLightness = 20 - progress * (20 - 15);
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = 0;
        console.log("Sunset Start to Sunset");
      }

      // sunset to dusk (100-110%)
      else if (isBetween(simulatedDate, sunData.sunset, sunData.dusk)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.sunset,
          sunData.dusk
        );
        position = 100;
        skySaturation = 90 - progress * (90 - 85);
        skyLightness = 15 - progress * (15 - 10);
        starOpacity = 0;
        moonXPosition = 100;
        moonYPosition = 100;
        moonOpacity = progress * 50;
        console.log("Sunset to Dusk");
      }

      // dusk to nauticalDusk (110-120%)
      else if (isBetween(simulatedDate, sunData.dusk, sunData.nauticalDusk)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.dusk,
          sunData.nauticalDusk
        );
        position = 100;
        skySaturation = 85 - progress * (85 - 80);
        skyLightness = 10 - progress * (10 - 5);
        starOpacity = progress * 30;
        moonXPosition = 100 - progress * (100 - 75);
        moonYPosition = 100 - progress * (100 - 50);
        moonOpacity = 50 + progress * (100 - 50);
        console.log("Dusk to Nautical Dusk");
      }

      // nauticalDusk to night (120-130%)
      else if (isBetween(simulatedDate, sunData.nauticalDusk, sunData.night)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.nauticalDusk,
          sunData.night
        );
        position = 100;
        skySaturation = 80;
        skyLightness = 5;
        starOpacity = 30 + progress * (100 - 30);
        moonXPosition = 75 - progress * (75 - 50);
        moonYPosition = 50 - progress * (50 - 25);
        moonOpacity = 100;
        console.log("Nautical Dusk to Night");
      }

      // night to nauticalDawn (130-140%)
      else if (isBetween(simulatedDate, sunData.night, sunData.nauticalDawn)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.night,
          sunData.nauticalDawn
        );
        position = 100;
        skySaturation = 80;
        skyLightness = 5;
        starOpacity = 100;
        moonXPosition = 50 - progress * (50 - 25);
        moonYPosition = 25 + progress * (50 - 25);
        moonOpacity = 100;
        console.log("Night to Nautical Dawn");
      }

      // nauticalDawn to dawn (140-150%)
      else if (isBetween(simulatedDate, sunData.nauticalDawn, sunData.dawn)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.nauticalDawn,
          sunData.dawn
        );
        position = 100;
        skySaturation = 80 - progress * (80 - 75);
        skyLightness = 5 + progress * (10 - 5);
        starOpacity = 100 - progress * (100 - 30);
        moonXPosition = 25 - progress * 25;
        moonYPosition = 50 + progress * (100 - 50);
        moonOpacity = 100 - progress * (100 - 50);
        console.log("Nautical Dawn to Dawn");
      }

      // dawn to sunrise (150-160%)
      else if (isBetween(simulatedDate, sunData.dawn, sunData.sunrise)) {
        const progress = calculateProgress(
          simulatedDate,
          sunData.dawn,
          sunData.sunrise
        );
        position = 100;
        skySaturation = 75 - progress * (75 - 70);
        skyLightness = 10 + progress * (15 - 10);
        starOpacity = 30 - progress * 30;
        moonXPosition = 0;
        moonYPosition = 100;
        moonOpacity = 50 - progress * 50;
        console.log("Dawn to Sunrise");
      }

      // Default night values
      else {
        position = 100;
        skySaturation = 80;
        skyLightness = 5;
        starOpacity = 100;
        moonXPosition = 0;
        moonYPosition = 100;
        moonOpacity = 100;
        console.log("Default Night");
      }

      setSunPosition(position);
      setSkySaturation(skySaturation);
      setSkyLightness(skyLightness);
      setStarOpacity(starOpacity);
      setMoonXPosition(moonXPosition);
      setMoonYPosition(moonYPosition);
      setMoonOpacity(moonOpacity);
    };

    updateSimCycle();
    const interval = setInterval(updateSimCycle, 1000);

    return () => clearInterval(interval);
  }, [sunData]);

  return (
    <SimCycleContext.Provider
      value={{
        sunPosition,
        skySaturation,
        skyLightness,
        starOpacity,
        moonXPosition,
        moonYPosition,
        moonOpacity,
      }}
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
