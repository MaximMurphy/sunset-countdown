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
  sunOpacity: number;
  skySaturation: number;
  skyLightness: number;
  starOpacity: number;
  moonOpacity: number;
  gradientOpacity: number;
}

const DayCycleContext = createContext<DayCycleContextType | undefined>(
  undefined
);

export function DayCycleProvider({ children }: { children: ReactNode }) {
  const { sunData } = useSun();
  const [sunPosition, setSunPosition] = useState(0);
  const [sunOpacity, setSunOpacity] = useState(0);
  const [skySaturation, setSkySaturation] = useState(0);
  const [skyLightness, setSkyLightness] = useState(0);
  const [starOpacity, setStarOpacity] = useState(0);
  const [moonOpacity, setMoonOpacity] = useState(0);
  const [gradientOpacity, setGradientOpacity] = useState(0);

  useEffect(() => {
    if (!sunData) return;

    const updateDayCycle = () => {
      const now = new Date();

      // Calculate time differences for smooth transitions
      const getTimeDiff = (start: Date, end: Date) => {
        return end.getTime() - start.getTime();
      };

      const getProgress = (current: Date, start: Date, end: Date) => {
        return (current.getTime() - start.getTime()) / getTimeDiff(start, end);
      };

      let position,
        sunOpacity,
        skySaturation,
        skyLightness,
        starOpacity,
        moonOpacity,
        gradientOpacity;

      // Sunrise to sunriseEnd (0-10%)
      if (now >= sunData.sunrise && now < sunData.sunriseEnd) {
        const progress = getProgress(now, sunData.sunrise, sunData.sunriseEnd);
        position = 100 - progress * (100 - 55); // From 100 to 55
        sunOpacity = 100;
        skySaturation = 70 - progress * (70 - 65); // From 70 to 65
        skyLightness = 15 + progress * (25 - 15); // From 15 to 25
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = 100 - progress * (100 - 55);
      }

      // sunriseEnd to goldenHourEnd (10-20%)
      else if (now >= sunData.sunriseEnd && now < sunData.goldenHourEnd) {
        const progress = getProgress(
          now,
          sunData.sunriseEnd,
          sunData.goldenHourEnd
        );
        position = 55 - progress * (55 - 35); // From 55 to 35
        sunOpacity = 100;
        skySaturation = 65 - progress * (65 - 60); // From 65 to 60
        skyLightness = 25 + progress * (45 - 25); // From 25 to 45
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = 55 - progress * 55;
      }

      // goldenHourEnd to midpoint1 (20-35%)
      else if (
        now >= sunData.goldenHourEnd &&
        now <
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          )
      ) {
        const progress = getProgress(
          now,
          sunData.goldenHourEnd,
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          )
        );
        position = 35 - progress * (35 - 15); // From 35 to 15
        sunOpacity = 100;
        skySaturation = 60 + progress * (85 - 60); // From 60 to 85
        skyLightness = 45; // From 45 to 45 (no change)
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = 0;
      }

      // midpoint1 to solarNoon (35-50%)
      else if (
        now >=
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          ) &&
        now < sunData.solarNoon
      ) {
        const progress = getProgress(
          now,
          new Date(
            (sunData.goldenHourEnd.getTime() + sunData.solarNoon.getTime()) / 2
          ),
          sunData.solarNoon
        );
        position = 15 - progress * (15 - 2); // From 15 to 2
        sunOpacity = 100;
        skySaturation = 85 + progress * (100 - 85); // From 85 to 100
        skyLightness = 45; // From 45 to 45 (no change)
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = 0;
      }

      // solarNoon to midpoint2 (50-65%)
      else if (
        now >= sunData.solarNoon &&
        now <
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          )
      ) {
        const progress = getProgress(
          now,
          sunData.solarNoon,
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          )
        );
        position = 2; // From 2 to 2 (no change)
        sunOpacity = 100;
        skySaturation = 100; // From 100 to 100 (no change)
        skyLightness = 45 - progress * (45 - 40); // From 45 to 40
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = 0;
      }

      // midpoint2 to goldenHour (65-80%)
      else if (
        now >=
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          ) &&
        now < sunData.goldenHour
      ) {
        const progress = getProgress(
          now,
          new Date(
            (sunData.solarNoon.getTime() + sunData.goldenHour.getTime()) / 2
          ),
          sunData.goldenHour
        );
        position = 2 + progress * (55 - 2); // From 2 to 55
        sunOpacity = 100;
        skySaturation = 100; // From 100 to 100 (no change)
        skyLightness = 40 - progress * (40 - 35); // From 40 to 35
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = progress * 25;
      }

      // goldenHour to sunsetStart (80-90%)
      else if (now >= sunData.goldenHour && now < sunData.sunsetStart) {
        const progress = getProgress(
          now,
          sunData.goldenHour,
          sunData.sunsetStart
        );
        position = 55 + progress * (98 - 55); // From 55 to 98
        sunOpacity = 100;
        skySaturation = 100; // From 100 to 100 (no change)
        skyLightness = 35 - progress * (35 - 20); // From 35 to 20
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = 25 + progress * (100 - 25);
      }

      // sunsetStart to sunset (90-100%)
      else if (now >= sunData.sunsetStart && now < sunData.sunset) {
        const progress = getProgress(now, sunData.sunsetStart, sunData.sunset);
        position = 98 + progress * (100 - 98); // From 98 to 100
        sunOpacity = 100;
        skySaturation = 100 - progress * (100 - 90); // From 100 to 90
        skyLightness = 20 - progress * (20 - 15); // From 20 to 15
        starOpacity = 0;
        moonOpacity = 0;
        gradientOpacity = 100 - progress * (100 - 75);
      }

      // sunset to nauticalDusk
      else if (now >= sunData.sunset && now < sunData.nauticalDusk) {
        const progress = getProgress(now, sunData.sunset, sunData.nauticalDusk);
        position = 100; // From 100 to 100 (no change)
        sunOpacity = 0;
        skySaturation = 90 - progress * (90 - 80); // From 90 to 80
        skyLightness = 15 - progress * (15 - 5); // From 15 to 5
        starOpacity = progress * 50; // From 0 to 30
        moonOpacity = progress * 100; // From 0 to 100
        gradientOpacity = 75 - progress * 75; // From 75 to 0
      }

      // nauticalDusk to nadir
      else if (
        (now >= sunData.nauticalDusk && now < sunData.nadir) || // Normal case
        (now >= sunData.nauticalDusk && sunData.nadir < sunData.nauticalDusk) || // After nauticalDusk and nadir is before nauticalDusk (crossing midnight)
        (now < sunData.nadir && sunData.nadir < sunData.nauticalDusk) // Before nadir and nadir is before nauticalDusk (crossing midnight)
      ) {
        const progress =
          sunData.nadir < sunData.nauticalDusk
            ? now < sunData.nadir
              ? getProgress(
                  now,
                  new Date(
                    sunData.nauticalDusk.getTime() - 24 * 60 * 60 * 1000
                  ),
                  sunData.nadir
                )
              : getProgress(
                  now,
                  sunData.nauticalDusk,
                  new Date(sunData.nadir.getTime() + 24 * 60 * 60 * 1000)
                )
            : getProgress(now, sunData.nauticalDusk, sunData.nadir);
        position = 100; // No Change
        sunOpacity = 0;
        skySaturation = 80; // No Change
        skyLightness = 5; // No Change
        starOpacity = 50 + progress * (100 - 50); // From 50 to 100
        moonOpacity = 100; // No Change
        gradientOpacity = 0; // No Change
      }

      // nadir to nauticalDawn
      else if (now >= sunData.nadir && now < sunData.nauticalDawn) {
        const progress = getProgress(now, sunData.nadir, sunData.nauticalDawn);
        position = 100; // No Change
        sunOpacity = 0;
        skySaturation = 80 - progress * (80 - 75); // From 80 to 75
        skyLightness = 5 + progress * (10 - 5); // From 5 to 10
        starOpacity = 100 - progress * (100 - 30); // From 100 to 30
        moonOpacity = 100 - progress * 100; // From 100 to 0
        gradientOpacity = 0; // No Change
      }

      // nauticalDawn to sunrise (150-160%)
      else if (now >= sunData.nauticalDawn && now < sunData.sunrise) {
        const progress = getProgress(
          now,
          sunData.nauticalDawn,
          sunData.sunrise
        );
        position = 100; // No Change
        sunOpacity = 0;
        skySaturation = 75 - progress * (75 - 70); // From 75 to 70
        skyLightness = 10 + progress * (15 - 10); // From 10 to 15
        starOpacity = 30 - progress * 30; // From 30 to 0
        moonOpacity = 0; // No Change
        gradientOpacity = progress * 100; // From 0 to 100
      }

      // Default night values
      else {
        position = 100;
        sunOpacity = 0;
        skySaturation = 80;
        skyLightness = 5;
        starOpacity = 100;
        moonOpacity = 100;
        gradientOpacity = 0;
      }

      setSunPosition(position);
      setSunOpacity(sunOpacity);
      setSkySaturation(skySaturation);
      setSkyLightness(skyLightness);
      setStarOpacity(starOpacity);
      setMoonOpacity(moonOpacity);
      setGradientOpacity(gradientOpacity);
    };

    updateDayCycle();
    const interval = setInterval(updateDayCycle, 1000);

    return () => clearInterval(interval);
  }, [sunData]);

  return (
    <DayCycleContext.Provider
      value={{
        sunPosition,
        sunOpacity,
        skySaturation,
        skyLightness,
        starOpacity,
        moonOpacity,
        gradientOpacity,
      }}
    >
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
