"use client";

import { useState, useEffect } from "react";
import { useSun } from "../context/SunContext";
import { useSettings } from "../context/SettingsContext";

export default function Countdown() {
  const { sunData, getNextEvent } = useSun();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { countdown, countdownPosition } = useSettings();

  useEffect(() => {
    if (!sunData) return;

    const updateCountdown = () => {
      const nextEvent = getNextEvent();
      const now = new Date();

      if (!nextEvent) {
        console.error("No next event found despite having sunData");
        setTimeLeft("Error");
        return;
      }

      // Parse the sunset time string (e.g., "8:28:38 PM")
      const [time, period] = nextEvent.time.split(" ");
      const [hours, minutes, seconds] = time.split(":").map(Number);

      // Create a new date for today with the sun event time
      const sunEventTime = new Date(now);
      sunEventTime.setHours(
        period === "PM" ? hours + 12 : hours,
        minutes,
        seconds,
        0
      );

      const diff = sunEventTime.getTime() - now.getTime();

      if (diff <= 0) {
        // If the current event has passed, get the next event and recalculate
        const nextEvent = getNextEvent();
        if (!nextEvent) {
          setTimeLeft("Error");
          return;
        }

        const [nextTime, nextPeriod] = nextEvent.time.split(" ");
        const [nextHours, nextMinutes, nextSeconds] = nextTime
          .split(":")
          .map(Number);

        const nextEventTime = new Date(now);
        nextEventTime.setHours(
          nextPeriod === "PM" ? nextHours + 12 : nextHours,
          nextMinutes,
          nextSeconds,
          0
        );

        // If the next event is tomorrow, add a day
        if (nextEventTime < now) {
          nextEventTime.setDate(nextEventTime.getDate() + 1);
        }

        const nextDiff = nextEventTime.getTime() - now.getTime();

        const hoursDiff = Math.floor(nextDiff / (1000 * 60 * 60));
        const minutesDiff = Math.floor(
          (nextDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsDiff = Math.floor((nextDiff % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hoursDiff.toString().padStart(2, "0")}:${minutesDiff
            .toString()
            .padStart(2, "0")}:${secondsDiff.toString().padStart(2, "0")}`
        );
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
  }, [sunData, getNextEvent]);

  if (!sunData) {
    return (
      <div className="font-mono text-[4rem] md:text-[10rem] lg:text-[14rem] font-medium text-amber-50">
        Loading...
      </div>
    );
  }

  return (
    <section
      className={`z-20 absolute inset-0 flex flex-col items-center justify-center ${
        countdownPosition === "left"
          ? "items-start"
          : countdownPosition === "right"
          ? "items-end"
          : "items-center"
      }`}
    >
      <div
        className={`flex flex-row items-center justify-center gap-4 font-mono text-[4rem] md:text-[10rem] lg:text-[14rem] font-medium text-amber-50 transition-all duration-500 ease-in-out ${
          countdown === "ON" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-[1.2em] text-right">{timeLeft.split(":")[0]}</div>
        <div>:</div>
        <div className="w-[1.2em] text-center">{timeLeft.split(":")[1]}</div>
        <div>:</div>
        <div className="w-[1.2em] text-left">{timeLeft.split(":")[2]}</div>
      </div>
    </section>
  );
}
