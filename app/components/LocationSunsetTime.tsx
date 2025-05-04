"use client";
import { useState, useEffect } from "react";

interface SunsetData {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: string;
  civil_twilight_begin: string;
  civil_twilight_end: string;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
  astronomical_twilight_begin: string;
  astronomical_twilight_end: string;
}

export default function LocationComponent() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sunsetData, setSunsetData] = useState<SunsetData | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);

          // Fetch sunset data
          try {
            const response = await fetch(
              `/api/sunset?lat=${newLocation.latitude}&lng=${newLocation.longitude}`
            );
            const data = await response.json();
            if (data.results) {
              setSunsetData(data.results);
            } else {
              setError("Failed to fetch sunset data");
            }
          } catch (err) {
            console.error("Error fetching sunset data:", err);
            setError("Failed to fetch sunset data");
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (location && sunsetData) {
    return <div>Sunset today: {sunsetData.sunset}</div>;
  }

  return <div>Loading...</div>;
}
