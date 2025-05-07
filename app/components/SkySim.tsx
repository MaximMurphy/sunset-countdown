"use client";

import { useSimCycle } from "../context/SimCycleContext";

const skyColors = [
  "#000717", // Night
  "#000c26",
  "#01123b",
  "#011a54",
  "#00216e",
  "#0032a3",
  "#023cbf",
  "#0246e0",
  "#004eff", // Day
];

export default function Sky() {
  const { skyColorIndex } = useSimCycle();

  return (
    <div
      className="absolute w-full h-full transition-colors duration-1000"
      style={{ background: skyColors[skyColorIndex] }}
    />
  );
}
