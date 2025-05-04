"use client";

import { useSun } from "../context/SunContext";

export default function TimeDisplay() {
  const { sunData } = useSun();

  const timePretty =
    sunData?.sunset.split(" ")[0].split(":").slice(0, 2).join(":") +
    " " +
    sunData?.sunset.split(" ")[1];

  if (!sunData) {
    return (
      <div className="font-mono font-medium text-sm text-amber-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-mono font-medium text-sm text-amber-100">
      Sunset at {timePretty}
    </div>
  );
}
