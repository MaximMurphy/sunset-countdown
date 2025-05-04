"use client";
import { useEffect } from "react";
import { useSunset } from "../context/SunsetContext";

export default function LocationSunsetTime() {
  const { setSunsetData } = useSunset();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          try {
            const response = await fetch(
              `/api/sunset?lat=${newLocation.latitude}&lng=${newLocation.longitude}`
            );
            const data = await response.json();
            if (data.results) {
              setSunsetData(data.results);
            } else {
              console.log("Failed to fetch sunset data");
            }
          } catch (err) {
            console.error("Error fetching sunset data:", err);
          }
        },
        (error) => {
          console.log("Error fetching location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [setSunsetData]);

  return null;
}
