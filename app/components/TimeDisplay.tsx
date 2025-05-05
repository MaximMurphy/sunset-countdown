"use client";

import { useSun } from "../context/SunContext";

export default function TimeDisplay() {
  const { sunData, getNextEvent } = useSun();
  const nextEvent = getNextEvent();

  const timePretty =
    nextEvent?.time.split(" ")[0].split(":").slice(0, 2).join(":") +
    " " +
    nextEvent?.time.split(" ")[1];

  if (!sunData) {
    return (
      <div className="font-mono font-medium text-sm md:text-[1rem] text-amber-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-mono font-medium text-sm md:text-[1rem] text-amber-100">
      {nextEvent?.type === "sunset" ? "Sunset at" : "Sunrise at"} {timePretty}
    </div>
  );
}
