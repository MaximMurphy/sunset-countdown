"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SimCycleContextType {
  sunPosition: number;
  skyColorIndex: number;
  simTime: Date;
}

const SimCycleContext = createContext<SimCycleContextType | undefined>(
  undefined
);

export function SimCycleProvider({ children }: { children: ReactNode }) {
  const [sunPosition, setSunPosition] = useState(0);
  const [skyColorIndex, setSkyColorIndex] = useState(0);
  const [simTime, setSimTime] = useState(new Date());

  useEffect(() => {
    // Set initial time to 6 AM
    const initialTime = new Date();
    initialTime.setHours(6, 0, 0, 0);
    setSimTime(initialTime);

    const updateSimCycle = () => {
      setSimTime((prevTime) => {
        const newTime = new Date(prevTime);
        // Add 1 hour (3600000 ms) worth of time every second
        newTime.setTime(newTime.getTime() + 3600000);

        // If we've passed midnight, reset to 6 AM
        if (newTime.getHours() === 0) {
          newTime.setHours(6, 0, 0, 0);
        }

        const hours = newTime.getHours();
        const minutes = newTime.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        // Calculate sun position and sky color based on time
        let position;
        let colorIndex;

        // Night (10 PM - 4 AM)
        if (hours >= 22 || hours < 4) {
          position = 100;
          colorIndex = 0;
        }
        // Sunrise transition (4 AM - 6 AM)
        else if (hours >= 4 && hours < 6) {
          const progress = (totalMinutes - 240) / 120; // Progress through sunrise
          position = 100 - 70 * progress;
          colorIndex = Math.floor(progress * 4);
        }
        // Morning (6 AM - 10 AM)
        else if (hours >= 6 && hours < 10) {
          const progress = (totalMinutes - 360) / 240;
          position = 30 - 28 * progress;
          colorIndex = 6;
        }
        // Midday (10 AM - 2 PM)
        else if (hours >= 10 && hours < 14) {
          position = 2;
          colorIndex = 8;
        }
        // Afternoon (2 PM - 6 PM)
        else if (hours >= 14 && hours < 18) {
          const progress = (totalMinutes - 840) / 240;
          position = 2 + 28 * progress;
          colorIndex = 5;
        }
        // Sunset transition (6 PM - 8 PM)
        else if (hours >= 18 && hours < 20) {
          const progress = (totalMinutes - 1080) / 120;
          position = 30 + 70 * progress;
          colorIndex = 5 - Math.floor(progress * 4);
        }
        // Evening (8 PM - 10 PM)
        else {
          const progress = (totalMinutes - 1200) / 120;
          position = 100;
          colorIndex = Math.floor(progress * 2);
        }

        setSunPosition(position);
        setSkyColorIndex(colorIndex);
        return newTime;
      });
    };

    const interval = setInterval(updateSimCycle, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SimCycleContext.Provider value={{ sunPosition, skyColorIndex, simTime }}>
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
