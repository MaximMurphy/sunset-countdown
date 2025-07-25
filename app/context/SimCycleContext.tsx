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
  moonOpacity: number;
  gradientOpacity: number;
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
  const [moonOpacity, setMoonOpacity] = useState(0);
  const [gradientOpacity, setGradientOpacity] = useState(0);

  // Use useRef to track current phase
  const phaseIndexRef = useRef(0);
  const phaseTimeRef = useRef(0);

  useEffect(() => {
    if (!sunData) return;

    // Define all phases in order
    const phases = [
      // Sunrise to sunriseEnd
      {
        name: "Sunrise to Sunrise End",
        getValues: (progress: number) => ({
          position: 100 - progress * (100 - 55),
          skySaturation: 70 - progress * (70 - 65),
          skyLightness: 15 + progress * (25 - 15),
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: 100 - progress * (100 - 55),
        }),
      },
      // sunriseEnd to goldenHourEnd
      {
        name: "Sunrise End to Golden Hour End",
        getValues: (progress: number) => ({
          position: 55 - progress * (55 - 35),
          skySaturation: 65 - progress * (65 - 60),
          skyLightness: 25 + progress * (45 - 25),
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: 55 - progress * 55,
        }),
      },
      // goldenHourEnd to midpoint1
      {
        name: "Golden Hour End to Midpoint 1",
        getValues: (progress: number) => ({
          position: 35 - progress * (35 - 15),
          skySaturation: 60 + progress * (85 - 60),
          skyLightness: 45,
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: 0,
        }),
      },
      // midpoint1 to solarNoon
      {
        name: "Midpoint 1 to Solar Noon",
        getValues: (progress: number) => ({
          position: 15 - progress * (15 - 2),
          skySaturation: 85 + progress * (100 - 85),
          skyLightness: 45,
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: 0,
        }),
      },
      // solarNoon to midpoint2
      {
        name: "Solar Noon to Midpoint 2",
        getValues: (progress: number) => ({
          position: 2,
          skySaturation: 100,
          skyLightness: 45 - progress * (45 - 40),
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: 0,
        }),
      },
      // midpoint2 to goldenHour
      {
        name: "Midpoint 2 to Golden Hour",
        getValues: (progress: number) => ({
          position: 2 + progress * (55 - 2),
          skySaturation: 100,
          skyLightness: 40 - progress * (40 - 35),
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: progress * 25,
        }),
      },
      // goldenHour to sunsetStart
      {
        name: "Golden Hour to Sunset Start",
        getValues: (progress: number) => ({
          position: 55 + progress * (98 - 55),
          skySaturation: 100,
          skyLightness: 35 - progress * (35 - 20),
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: 25 + progress * (100 - 25),
        }),
      },
      // sunsetStart to sunset
      {
        name: "Sunset Start to Sunset",
        getValues: (progress: number) => ({
          position: 98 + progress * (100 - 98),
          skySaturation: 100 - progress * (100 - 90),
          skyLightness: 20 - progress * (20 - 15),
          starOpacity: 0,
          moonOpacity: 0,
          gradientOpacity: 100 - progress * (100 - 50),
        }),
      },
      // sunset to nauticalDusk
      {
        name: "Sunset to Nautical Dusk",
        getValues: (progress: number) => ({
          position: 100,
          skySaturation: 90 - progress * (90 - 80),
          skyLightness: 15 - progress * (15 - 5),
          starOpacity: progress * 50,
          moonOpacity: progress * 50,
          gradientOpacity: 50 - progress * 50,
        }),
      },
      // nauticalDusk to nadir
      {
        name: "Nautical Dusk to Nadir",
        getValues: (progress: number) => ({
          position: 100,
          skySaturation: 80,
          skyLightness: 5,
          starOpacity: 50 + progress * (100 - 50),
          moonOpacity: 50 + progress * (100 - 50),
          gradientOpacity: 0,
        }),
      },
      // nadir to nauticalDawn
      {
        name: "Nadir to Nautical Dawn",
        getValues: (progress: number) => ({
          position: 100,
          skySaturation: 80 - progress * (80 - 75),
          skyLightness: 5 + progress * (10 - 5),
          starOpacity: 100 - progress * (100 - 30),
          moonOpacity: 100 - progress * 100,
          gradientOpacity: 0,
        }),
      },
      // nauticalDawn to sunrise
      {
        name: "Nautical Dawn to Sunrise",
        getValues: (progress: number) => ({
          position: 100,
          skySaturation: 75 - progress * (75 - 70),
          skyLightness: 10 + progress * (15 - 10),
          starOpacity: 30 - progress * 30,
          moonOpacity: 0,
          gradientOpacity: progress * 100,
        }),
      },
    ];

    const updateSimCycle = () => {
      // Update phase time
      phaseTimeRef.current += 1000;

      // If we've spent 2 seconds in this phase, move to the next phase
      if (phaseTimeRef.current >= 2000) {
        phaseTimeRef.current = 0;
        phaseIndexRef.current = (phaseIndexRef.current + 1) % phases.length;
      }

      // Calculate progress within current phase (0 to 1)
      const progress = phaseTimeRef.current / 2000;

      // Get current phase
      const currentPhase = phases[phaseIndexRef.current];
      console.log(currentPhase.name);

      // Get values for current phase
      const values = currentPhase.getValues(progress);

      // Update state
      setSunPosition(values.position);
      setSkySaturation(values.skySaturation);
      setSkyLightness(values.skyLightness);
      setStarOpacity(values.starOpacity);
      setMoonOpacity(values.moonOpacity);
      setGradientOpacity(values.gradientOpacity);
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
        moonOpacity,
        gradientOpacity,
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
