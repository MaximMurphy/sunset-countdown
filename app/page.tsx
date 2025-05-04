import Sky from "./components/Sky";
import Countdown from "./components/Countdown";
import LocationSunsetTime from "./components/LocationSunsetTime";
import { SunsetProvider } from "./context/SunsetContext";

export default function Home() {
  return (
    <SunsetProvider>
      <div className="relative h-screen flex flex-col items-center justify-center">
        <LocationSunsetTime />
        <Sky />
        <div className="z-20 flex flex-col items-center gap-4">
          <Countdown />
        </div>
      </div>
    </SunsetProvider>
  );
}
