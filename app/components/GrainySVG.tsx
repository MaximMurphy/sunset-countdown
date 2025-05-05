export default function GrainySVG() {
  return (
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
  );
}
