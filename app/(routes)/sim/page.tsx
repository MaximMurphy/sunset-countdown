import SunSim from "../../components/sim/SunSim";
import SkySim from "../../components/sim/SkySim";
import GrainySVG from "../../components/GrainySVG";
import FontProvider from "../../components/FontProvider";
import GradientsSim from "../../components/sim/GradientsSim";
import { SimCycleProvider } from "../../context/SimCycleContext";
import StarsSim from "../../components/sim/StarsSim";
import MoonSim from "../../components/sim/MoonSim";

export default function Home() {
  return (
    <SimCycleProvider>
      <FontProvider>
        <div className="relative h-svh md:h-screen flex flex-col items-center justify-center">
          <GrainySVG />
          <SkySim />
          <GradientsSim />
          <StarsSim />
          <MoonSim />
          <SunSim />
        </div>
      </FontProvider>
    </SimCycleProvider>
  );
}
