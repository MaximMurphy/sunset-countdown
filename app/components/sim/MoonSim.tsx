"use client";

import { useSimCycle } from "../../context/SimCycleContext";

export default function Moon() {
  const { moonOpacity } = useSimCycle();

  //console.log(moonOpacity);

  return (
    <div className="absolute h-full w-full overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/3 transition-all duration-1000 ease-in-out"
        style={{
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
