import LocationSunTime from "../../components/LocationSunTime";
import SunSim from "../../components/SunSim";
import SkySim from "../../components/SkySim";
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
        </div>
      </FontProvider>
    </SimCycleProvider>
  );
}
