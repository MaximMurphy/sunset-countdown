import Sky from "./components/Sky";
import Countdown from "./components/Countdown";
import LocationSunsetTime from "./components/LocationSunsetTime";
import { SunsetProvider } from "./context/SunsetContext";
import TimeDisplay from "./components/TimeDisplay";
import Sun from "./components/Sun";

export default function Home() {
  return (
    <SunsetProvider>
      <div className="relative h-screen flex flex-col items-center justify-center">
        <LocationSunsetTime />
        <Sky />
        <Sun />
        <div className="z-20 absolute inset-0 flex flex-col items-center justify-center">
          <Countdown />
        </div>
        <div className="z-20 h-full w-full flex justify-start items-end p-12">
          <TimeDisplay />
        </div>
      </div>
    </SunsetProvider>
  );
}
