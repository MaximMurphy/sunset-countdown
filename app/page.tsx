import Sky from "./components/Sky";
import LocationSunsetTime from "./components/LocationSunsetTime";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <Sky />
      <h1 className="z-20 text-5xl font-medium tracking-wider text-amber-50">
        <LocationSunsetTime />
      </h1>
    </div>
  );
}
