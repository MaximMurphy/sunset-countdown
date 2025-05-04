"use client";

import { useEffect } from "react";
import { useSun } from "../context/SunContext";

export default function LocationSunTime() {
  const { setSunData } = useSun();

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
              `/api/sun?lat=${newLocation.latitude}&lng=${newLocation.longitude}`
            );
            const data = await response.json();
            if (data.results) {
              setSunData(data.results);
            } else {
              console.log("Failed to fetch sun data");
            }
          } catch (err) {
            console.error("Error fetching sun data:", err);
          }
        },
        (error) => {
          console.log("Error fetching location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [setSunData]);

  return null;
}
