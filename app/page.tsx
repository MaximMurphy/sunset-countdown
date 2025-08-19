import Sky from "./components/Sky";
import Countdown from "./components/Countdown";
import TimeDisplay from "./components/TimeDisplay";
import Sun from "./components/Sun";
import Settings from "./components/Settings";
import GrainySVG from "./components/GrainySVG";
import FontProvider from "./components/FontProvider";
import SunriseGradient from "./components/SunriseGradient";
import SunsetGradient from "./components/SunsetGradient";
import Stars from "./components/Stars";
import Moon from "./components/Moon";
import { DayCycleProvider } from "./context/DayCycleContext";

export default function Home() {
  return (
    <DayCycleProvider>
      <FontProvider>
        <div className="relative h-dvh md:h-screen flex flex-col items-center justify-center">
          <GrainySVG />
          <Sky />
          <SunriseGradient />
          <SunsetGradient />
          <Sun />
          <Stars />
          <Moon />
          <Countdown />
          <div className="z-20 h-full w-full flex justify-between items-end px-6 py-8 md:px-12 md:py-12">
            <TimeDisplay />
            <Settings />
          </div>
        </div>
      </FontProvider>
    </DayCycleProvider>
  );
}
