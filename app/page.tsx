import Sky from "./components/Sky";
import Countdown from "./components/Countdown";
import LocationSunTime from "./components/LocationSunTime";
import { SunProvider } from "./context/SunContext";
import TimeDisplay from "./components/TimeDisplay";
import Sun from "./components/Sun";
import Settings from "./components/Settings";

export default function Home() {
  return (
    <SunProvider>
      <div className="relative h-svh md:h-screen flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 450 450"
          xmlns="http://www.w3.org/2000/svg"
          className="z-50 absolute inset-0 w-full h-full opacity-50 mix-blend-multiply pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="9.32"
              numOctaves="1"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <LocationSunTime />
        <Sky />
        <Sun />
        <div className="z-20 absolute inset-0 flex flex-col items-center justify-center">
          <Countdown />
        </div>
        <div className="z-20 h-full w-full flex justify-between items-end p-12">
          <TimeDisplay />
          <Settings />
        </div>
      </div>
    </SunProvider>
  );
}
