"use client";

import { useDayCycle } from "../context/DayCycleContext";

export default function Sky() {
  const { skySaturation, skyLightness } = useDayCycle();

  return (
    <div
      className="absolute w-full h-full transition-colors duration-1000"
      style={{
        background: `hsl(222deg ${skySaturation}% ${skyLightness}%)`,
      }}
    />
  );
}
