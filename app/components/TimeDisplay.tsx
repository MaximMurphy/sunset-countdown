"use client";

import { useSunset } from "../context/SunsetContext";

export default function TimeDisplay() {
  const { sunsetData } = useSunset();

  const timePretty =
    sunsetData?.sunset.split(" ")[0].split(":").slice(0, 2).join(":") +
    " " +
    sunsetData?.sunset.split(" ")[1];

  if (!sunsetData) {
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
