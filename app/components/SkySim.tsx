"use client";

import { useSimCycle } from "../context/SimCycleContext";

export default function Sky() {
  const { skySaturation, skyLightness } = useSimCycle();

  return (
    <div
      className="absolute w-full h-full transition-colors duration-1000"
      style={{
        background: `hsl(200deg ${skySaturation}% ${skyLightness}%)`,
      }}
    />
  );
}
