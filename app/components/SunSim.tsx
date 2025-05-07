"use client";

import { useSimCycle } from "../context/SimCycleContext";

export default function Sun() {
  const { sunPosition } = useSimCycle();

  return (
    <div className="absolute inset-0 flex justify-center overflow-hidden">
      <div
        className="w-60 md:w-80 h-60 md:h-80 bg-amber-300 rounded-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateY(${sunPosition}vh)`,
        }}
      />
      <div
        className="absolute w-60 md:w-80 h-60 md:h-80 bg-amber-400 rounded-full transition-transform duration-1000 ease-in-out opacity-70"
        style={{
          transform: `translateY(${sunPosition + 2}vh)`,
        }}
      />
      <div
        className="absolute w-60 md:w-80 h-60 md:h-80 bg-amber-500 rounded-full transition-transform duration-1000 ease-in-out opacity-50"
        style={{
          transform: `translateY(${sunPosition + 4}vh)`,
        }}
      />
    </div>
  );
}
