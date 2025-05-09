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
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
      };

      const successCallback = async (position: GeolocationPosition) => {
        console.log("Successfully got position:", position);
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLatitude(newLocation.latitude);
        setLongitude(newLocation.longitude);

        try {
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
      };

      const errorCallback = (error: GeolocationPositionError) => {
        console.log("Geolocation error code:", error.code);
        console.log("Is secure context:", window.isSecureContext);
        console.log("Current URL:", window.location.href);

        if (!window.isSecureContext) {
          setLocationName("Please use HTTPS or localhost");
          return;
        }

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationName("Location access denied");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationName("Location unavailable");
            break;
          case error.TIMEOUT:
            setLocationName("Location request timed out");
            break;
          default:
            setLocationName("Location error");
        }
      };

      // Direct geolocation request
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
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
