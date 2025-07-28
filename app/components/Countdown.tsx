"use client";

import { useState, useEffect } from "react";
import { useSun } from "../context/SunContext";
import { useSettings } from "../context/SettingsContext";

export default function Countdown() {
  const { sunData, getNextEvent } = useSun();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { countdown, countdownPosition, countdownSize, countdownFormat } =
    useSettings();

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

      const sunEventTime = nextEvent.time;
      const diff = sunEventTime.getTime() - now.getTime();

      if (diff <= 0) {
        // If the current event has passed, get the next event and recalculate
        const nextEvent = getNextEvent();
        if (!nextEvent) {
          setTimeLeft("Error");
          return;
        }

        const nextEventTime = nextEvent.time;
        const nextDiff = nextEventTime.getTime() - now.getTime();

        const hoursDiff = Math.floor(nextDiff / (1000 * 60 * 60));
        const minutesDiff = Math.floor(
          (nextDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsDiff = Math.floor((nextDiff % (1000 * 60)) / 1000);

        if (countdownFormat === "colons") {
          setTimeLeft(
            `${hoursDiff.toString().padStart(2, "0")}:${minutesDiff
              .toString()
              .padStart(2, "0")}:${secondsDiff.toString().padStart(2, "0")}`
          );
        } else {
          setTimeLeft(
            `${hoursDiff}h ${minutesDiff
              .toString()
              .padStart(2, "0")}m ${secondsDiff.toString().padStart(2, "0")}s`
          );
        }
        return;
      }

      const hoursDiff = Math.floor(diff / (1000 * 60 * 60));
      const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsDiff = Math.floor((diff % (1000 * 60)) / 1000);

      if (countdownFormat === "colons") {
        setTimeLeft(
          `${hoursDiff.toString().padStart(2, "0")}:${minutesDiff
            .toString()
            .padStart(2, "0")}:${secondsDiff.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft(
          `${hoursDiff}h ${minutesDiff
            .toString()
            .padStart(2, "0")}m ${secondsDiff.toString().padStart(2, "0")}s`
        );
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [sunData, getNextEvent, countdownFormat]);

  if (!sunData) {
    return (
      <div className="text-[2rem] md:text-[4rem] lg:text-[6rem] font-medium text-amber-50">
        Loading...
      </div>
    );
  }

  return (
    <section
      className={`z-20 absolute inset-0 flex flex-col items-center justify-center px-6 py-8 md:px-12 md:py-12 overflow-hidden ${
        countdownPosition === "left"
          ? "items-start"
          : countdownPosition === "right"
          ? "items-end"
          : "items-center"
      }`}
    >
      <div
        className={`flex flex-row items-center justify-center gap-4 font-medium text-amber-50 transition-all duration-500 ease-in-out ${
          countdown === "ON" ? "opacity-100" : "opacity-0"
        } ${
          countdownSize === "sm"
            ? "text-[1rem] md:text-[1rem] lg:text-[1rem]"
            : countdownSize === "md"
            ? "text-[2rem] md:text-[4rem] lg:text-[6rem]"
            : "text-[4rem] md:text-[10rem] lg:text-[14rem]"
        }`}
      >
        {countdownFormat === "colons" ? (
          <>
            <div className="w-[1.2em] text-right">{timeLeft.split(":")[0]}</div>
            <div>:</div>
            <div className="w-[1.2em] text-center">
              {timeLeft.split(":")[1]}
            </div>
            <div>:</div>
            <div className="w-[1.2em] text-left">{timeLeft.split(":")[2]}</div>
          </>
        ) : (
          <div className="text-center">{timeLeft}</div>
        )}
      </div>
    </section>
  );
}
