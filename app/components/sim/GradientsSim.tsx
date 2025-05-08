"use client";

import { useSimCycle } from "../../context/SimCycleContext";

const TOP_COLOR = "#fd9a00";
const BOTTOM_COLOR = "#ca3500";

export default function Gradients() {
  const { gradientOpacity } = useSimCycle();

  return (
    <div
      className="absolute w-full h-full flex flex-col items-center justify-between transition-all duration-1000 ease-in-out"
      style={{
        opacity: gradientOpacity / 100,
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
