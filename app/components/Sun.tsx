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
      const sunrise = parseTimeString(sunData.sunrise);
      const sunset = parseTimeString(sunData.sunset);

      // If it's before sunrise or after sunset, sun should be below screen
      if (now < sunrise || now > sunset) {
        setPosition(100);
        return;
      }

      // Calculate position between sunrise and sunset
      const totalDayLength = sunset.getTime() - sunrise.getTime();
      const currentTime = now.getTime() - sunrise.getTime();
      const progress = currentTime / totalDayLength;

      // Convert progress to position using a quadratic function
      // This will keep the sun higher for longer and accelerate its descent
      const position =
        progress < 0.5
          ? 32 + (progress * 2) ** 2 * 8 // First half of the day: slow descent
          : 32 + 8 + (progress - 0.5) ** 2 * 60; // Second half: accelerating descent

      setPosition(position);
    };

    updatePosition();
    const interval = setInterval(updatePosition, 1000);

    return () => clearInterval(interval);
  }, [sunData]);

  return (
    <div className="absolute inset-0 flex justify-center overflow-hidden">
      <div
        className="w-75 h-75 bg-amber-500 rounded-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateY(${position}vh)`,
          marginTop: "32px",
        }}
      />
    </div>
  );
}
