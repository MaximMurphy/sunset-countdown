"use client";

import { useSimCycle } from "../../context/SimCycleContext";

export default function Moon() {
  const { moonXPosition, moonYPosition } = useSimCycle();

  return (
    <div className="absolute h-full w-full overflow-hidden">
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          transform: `translate(${moonXPosition}vw, ${moonYPosition}vh)`,
        }}
      >
        <div className="w-60 md:w-80 h-60 md:h-80 bg-gray-300 rounded-full" />
        <div className="absolute top-2 w-60 md:w-80 h-60 md:h-80 bg-gray-400 rounded-full opacity-70" />
        <div className="absolute top-4 w-60 md:w-80 h-60 md:h-80 bg-gray-500 rounded-full opacity-50" />
      </div>
    </div>
  );
}
