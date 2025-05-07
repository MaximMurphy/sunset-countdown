"use client";

import { useSun } from "../context/SunContext";
import { useLocation } from "../context/LocationContext";
import { useSettings } from "../context/SettingsContext";

export default function TimeDisplay() {
  const { sunData, getNextEvent } = useSun();
  const { timeFormat, locationVisible } = useSettings();
  const { locationName } = useLocation();

  const nextEvent = getNextEvent();

  let timePretty = nextEvent?.time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  if (timeFormat === "24h") {
    timePretty = timePretty?.replace("PM", "").replace("AM", "");
  }

  if (!sunData || !locationName) {
    return (
      <div className="font-medium text-sm md:text-[1rem] text-amber-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-medium text-sm md:text-[1rem] text-amber-100">
      {nextEvent?.type === "sunset" ? "Sunset" : "Sunrise at"} {timePretty}
      {locationName && locationVisible && " • " + locationName}
    </div>
  );
}
