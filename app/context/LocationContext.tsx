"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface LocationContextType {
  latitude: number | null;
  longitude: number | null;
  locationName: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLatitude(newLocation.latitude);
        setLongitude(newLocation.longitude);

        try {
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
          console.error("Error fetching location name:", err);
          setLocationName("Unknown");
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser");
      setLocationName("Unknown");
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        latitude,
        longitude,
        locationName,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
