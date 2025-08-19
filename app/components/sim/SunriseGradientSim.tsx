"use client";

import { useSimCycle } from "../../context/SimCycleContext";

const TOP_COLOR = "#e68a99";
const BOTTOM_COLOR = "#ffab19";

export default function SunriseGradientSim() {
  const { sunriseGradientOpacity } = useSimCycle();

  return (
    <div
      className="absolute w-full h-full flex flex-col items-center justify-between transition-all duration-1000 ease-in-out"
      style={{
        opacity: sunriseGradientOpacity / 100,
      }}
    >
      <div
        className="w-full h-2/3 bg-gradient-to-b"
        style={{
          background: `linear-gradient(to bottom, transparent 50%, ${TOP_COLOR})`,
        }}
      />
      <div
        className="w-full h-1/3 bg-gradient-to-b"
        style={{
          background: `linear-gradient(to bottom, ${TOP_COLOR}, ${BOTTOM_COLOR})`,
        }}
      />
    </div>
  );
}
