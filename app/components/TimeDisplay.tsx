"use client";

import { useSun } from "../context/SunContext";
import { useSettings } from "../context/SettingsContext";

export default function TimeDisplay() {
  const { sunData, getNextEvent, locationName } = useSun();
  const { timeFormat, locationVisible } = useSettings();
  const nextEvent = getNextEvent();

  let timePretty =
    nextEvent?.time.split(" ")[0].split(":").slice(0, 2).join(":") +
    " " +
    nextEvent?.time.split(" ")[1];

  // Convert 12h to 24h format
  const timePretty24 = (() => {
    const [time, period] = timePretty.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  })();

  if (timeFormat === "24h") {
    timePretty = timePretty24;
  }

  if (!sunData) {
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
