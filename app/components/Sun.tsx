"use client";

import { useDayCycle } from "../context/DayCycleContext";
import { useSettings } from "../context/SettingsContext";

export default function Sun() {
  const { sunPosition } = useDayCycle();
  const { sunSize } = useSettings();

  return (
    <div className="absolute inset-0 flex justify-center overflow-hidden">
      <div
        className={`bg-amber-300 rounded-full transition-all duration-1000 ease-in-out ${
          sunSize === "sm"
            ? "w-20 md:w-32 h-20 md:h-32"
            : sunSize === "md"
            ? "w-60 md:w-80 h-60 md:h-80"
            : "w-80 md:w-150 h-80 md:h-150"
        }`}
        style={{
          transform: `translateY(${sunPosition}vh)`,
        }}
      />
      <div
        className={`absolute bg-amber-400 rounded-full transition-all duration-1000 ease-in-out opacity-70 ${
          sunSize === "sm"
            ? "w-20 md:w-32 h-20 md:h-32"
            : sunSize === "md"
            ? "w-60 md:w-80 h-60 md:h-80"
            : "w-80 md:w-150 h-80 md:h-150"
        }`}
        style={{
          transform: `translateY(${
            sunPosition + (sunSize === "sm" ? 1 : 2)
          }vh)`,
        }}
      />
      <div
        className={`absolute bg-amber-500 rounded-full transition-all duration-1000 ease-in-out opacity-50 ${
          sunSize === "sm"
            ? "w-20 md:w-32 h-20 md:h-32"
            : sunSize === "md"
            ? "w-60 md:w-80 h-60 md:h-80"
            : "w-80 md:w-150 h-80 md:h-150"
        }`}
        style={{
          transform: `translateY(${
            sunPosition + (sunSize === "sm" ? 2 : 4)
          }vh)`,
        }}
      />
    </div>
  );
}
