"use client";

import { useDayCycle } from "../context/DayCycleContext";

export default function Moon() {
  const { moonXPosition, moonYPosition, moonOpacity } = useDayCycle();

  return (
    <div className="absolute h-full w-full overflow-hidden">
      <div
        className="absolute right-0 transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateY(${moonYPosition}vh)`,
          left: `calc(${moonXPosition}vw - 7.5rem)`,
          opacity: moonOpacity / 100,
        }}
      >
        <div className="w-60 md:w-80 h-60 md:h-80 bg-gray-300 rounded-full" />
        <div className="absolute top-2 md:top-4 w-60 md:w-80 h-60 md:h-80 bg-gray-400 rounded-full opacity-70" />
        <div className="absolute top-4 md:top-8 w-60 md:w-80 h-60 md:h-80 bg-gray-500 rounded-full opacity-50" />
      </div>
    </div>
  );
}
