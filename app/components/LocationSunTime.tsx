"use client";

import { useEffect } from "react";
import { useSun } from "../context/SunContext";

export default function LocationSunTime() {
  const { setSunData, setLocationName } = useSun();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          try {
            // Fetch sun data
            const response = await fetch(
              `/api/sun?lat=${newLocation.latitude}&lng=${newLocation.longitude}`
            );
            const data = await response.json();
            if (data.results) {
              setSunData(data.results);
            } else {
              console.log("Failed to fetch sun data");
            }

            // Fetch location name using reverse geocoding
            const geoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLocation.latitude}&lon=${newLocation.longitude}`
            );
            const geoData = await geoResponse.json();
            if (geoData.address) {
              const cityName =
                geoData.address.city ||
                geoData.address.town ||
                geoData.address.village ||
                geoData.address.county;
              setLocationName(cityName);
            }
          } catch (err) {
            console.error("Error fetching data:", err);
          }
        },
        (error) => {
          console.log("Error fetching location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [setSunData, setLocationName]);

  return null;
}
