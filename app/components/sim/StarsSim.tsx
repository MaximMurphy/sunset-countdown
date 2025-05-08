"use client";

import { useSimCycle } from "../../context/SimCycleContext";

export default function Sky() {
  const { starOpacity } = useSimCycle();

  return (
    <div
      className="absolute w-full h-full transition-colors duration-1000"
      style={{
        background: `opacity: ${starOpacity}%`,
      }}
    />
  );
}
