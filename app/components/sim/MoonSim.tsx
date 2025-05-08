"use client";

import { useSimCycle } from "../../context/SimCycleContext";

export default function Moon() {
  const { moonXPosition, moonYPosition, moonOpacity } = useSimCycle();

  //console.log(moonXPosition, moonYPosition, moonOpacity);

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
        <div className="w-60 md:w-80 h-60 md:h-80 bg-slate-300 rounded-full" />
        <div className="absolute top-4 w-60 md:w-80 h-60 md:h-80 bg-slate-400 rounded-full opacity-70" />
        <div className="absolute top-8 w-60 md:w-80 h-60 md:h-80 bg-slate-500 rounded-full opacity-50" />
      </div>
    </div>
  );
}
