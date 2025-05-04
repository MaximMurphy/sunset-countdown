"use client";
import { useState, useEffect } from "react";
import { useSunset } from "../context/SunsetContext";

export default function Countdown() {
  const { sunsetData } = useSunset();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!sunsetData) return;

    const updateCountdown = () => {
      // Get current time
      const now = new Date();

      // Parse the sunset time string (e.g., "8:28:38 PM")
      const [time, period] = sunsetData.sunset.split(" ");
      const [hours, minutes, seconds] = time.split(":").map(Number);

      // Create a new date for today with the sunset time
      const sunsetTime = new Date(now);
      sunsetTime.setHours(
        period === "PM" ? hours + 12 : hours,
        minutes,
        seconds,
        0
      );

      // If the sunset time is earlier than now, it means it's for tomorrow
      if (sunsetTime < now) {
        sunsetTime.setDate(sunsetTime.getDate() + 1);
      }

      const diff = sunsetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Sunset has passed");
        return;
      }

      const hoursDiff = Math.floor(diff / (1000 * 60 * 60));
      const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsDiff = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hoursDiff.toString().padStart(2, "0")}:${minutesDiff
          .toString()
          .padStart(2, "0")}:${secondsDiff.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [sunsetData]);

  if (!sunsetData) {
    return (
      <div className="font-mono text-5xl font-medium tracking-wider text-amber-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 font-mono text-7xl md:text-8xl lg:text-9xl font-medium text-amber-50">
      {timeLeft}

      <div className="text-sm text-amber-100">
        Sunset at {sunsetData.sunset}
      </div>
    </div>
  );
}
