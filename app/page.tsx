import Sky from "./components/Sky";
import Countdown from "./components/Countdown";
import LocationSunTime from "./components/LocationSunTime";
import TimeDisplay from "./components/TimeDisplay";
import Sun from "./components/Sun";
import Settings from "./components/Settings";
import GrainySVG from "./components/GrainySVG";

export default function Home() {
  return (
    <div className="relative h-svh md:h-screen flex flex-col items-center justify-center">
      <GrainySVG />
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
  );
}
