"use client";

import { useSun } from "../context/SunContext";
import { useEffect, useState } from "react";

export default function Sun() {
  const { sunData } = useSun();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!sunData) return;

    const parseTimeString = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(period === "PM" ? hours + 12 : hours, minutes, seconds, 0);
      return date;
    };

    const updatePosition = () => {
      const now = new Date();
      const solarNoon = parseTimeString(sunData.solar_noon);
      const sunrise = parseTimeString(sunData.sunrise);
      const sunset = parseTimeString(sunData.sunset);

      // Define the transition periods (2 hours = 7200000 milliseconds)
      const transitionPeriod = 7200000;
      // Define the noon transition period (1 hour = 3600000 milliseconds)
      const noonTransitionPeriod = 3600000;

      const isRising = now < new Date(sunrise.getTime() + transitionPeriod);
      const isSetting = now > new Date(sunset.getTime() - transitionPeriod);
      const isBeforeNoon =
        now < new Date(solarNoon.getTime() - noonTransitionPeriod);
      const isAfterNoon =
        now > new Date(solarNoon.getTime() + noonTransitionPeriod);
      const isAtNoon = !isBeforeNoon && !isAfterNoon;

      let position;

      if (now < sunrise || now > sunset) {
        // If it's before sunrise or after sunset, sun should be below screen
        position = 100;
      } else if (isRising) {
        // During first 2 hours after sunrise, rise from 100 to 30
        const riseProgress =
          (now.getTime() - sunrise.getTime()) / transitionPeriod;
        position = 100 - 70 * riseProgress;
      } else if (isSetting) {
        // During last 2 hours before sunset, descend from 30 to 100
        const setProgress =
          (now.getTime() - (sunset.getTime() - transitionPeriod)) /
          transitionPeriod;
        position = 30 + 70 * setProgress;
      } else if (isAtNoon) {
        // During the 2-hour period around solar noon (1 hour before and after), stay at position 2
        position = 2;
      } else if (isBeforeNoon) {
        // Between sunrise transition and noon transition, rise from 30 to 2
        const noonProgress =
          (now.getTime() - (sunrise.getTime() + transitionPeriod)) /
          (solarNoon.getTime() -
            noonTransitionPeriod -
            (sunrise.getTime() + transitionPeriod));
        position = 30 - 28 * noonProgress;
      } else {
        // Between noon transition and sunset transition, descend from 2 to 30
        const noonProgress =
          (now.getTime() - (solarNoon.getTime() + noonTransitionPeriod)) /
          (sunset.getTime() -
            transitionPeriod -
            (solarNoon.getTime() + noonTransitionPeriod));
        position = 2 + 28 * noonProgress;
      }

      setPosition(position);
    };

    updatePosition();
    const interval = setInterval(updatePosition, 1000);

    return () => clearInterval(interval);
  }, [sunData]);

  return (
    <div className="absolute inset-0 flex justify-center overflow-hidden">
      <div
        className="w-60 md:w-80 h-60 md:h-80 bg-amber-300 rounded-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateY(${position}vh)`,
        }}
      />
      <div
        className="absolute w-60 md:w-80 h-60 md:h-80 bg-amber-400 rounded-full transition-transform duration-1000 ease-in-out opacity-70"
        style={{
          transform: `translateY(${position + 2}vh)`,
        }}
      />
      <div
        className="absolute w-60 md:w-80 h-60 md:h-80 bg-amber-500 rounded-full transition-transform duration-1000 ease-in-out opacity-50"
        style={{
          transform: `translateY(${position + 4}vh)`,
        }}
      />
    </div>
  );
}
