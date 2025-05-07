import Countdown from "../../components/Countdown";
import LocationSunTime from "../../components/LocationSunTime";
import TimeDisplay from "../../components/TimeDisplay";
import SunSim from "../../components/SunSim";
import SkySim from "../../components/SkySim";
import Settings from "../../components/Settings";
import GrainySVG from "../../components/GrainySVG";
import FontProvider from "../../components/FontProvider";
import Gradients from "../../components/Gradients";
import { SimCycleProvider } from "../../context/SimCycleContext";

export default function Home() {
  return (
    <SimCycleProvider>
      <FontProvider>
        <div className="relative h-svh md:h-screen flex flex-col items-center justify-center">
          <GrainySVG />
          <LocationSunTime />
          <SkySim />
          <Gradients />
          <SunSim />
          <Countdown />
          <div className="z-20 h-full w-full flex justify-between items-end px-6 py-8 md:px-12 md:py-12">
            <TimeDisplay />
            <Settings />
          </div>
        </div>
      </FontProvider>
    </SimCycleProvider>
  );
}
