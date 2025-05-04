export default function Gradients() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();

  return (
    <div className="absolute w-full h-96 opacity-50">
      <div
        className="w-full h-full opacity-50"
        style={{
          background: `linear-gradient(to bottom, ${color1}, ${color2})`,
        }}
      />
    </div>
  );
}

function getRandomColor() {
  // Define color ranges for warm colors
  const colorRanges = [
    // Red range
    { min: [255, 0, 0], max: [255, 100, 100] },
    // Orange range
    { min: [255, 100, 0], max: [255, 165, 0] },
    // Pink range
    { min: [255, 100, 150], max: [255, 200, 200] },
    // Yellow range
    { min: [255, 200, 0], max: [255, 255, 100] },
  ];

  // Pick a random color range
  const range = colorRanges[Math.floor(Math.random() * colorRanges.length)];

  // Generate random RGB values within the selected range
  const r =
    Math.floor(Math.random() * (range.max[0] - range.min[0] + 1)) +
    range.min[0];
  const g =
    Math.floor(Math.random() * (range.max[1] - range.min[1] + 1)) +
    range.min[1];
  const b =
    Math.floor(Math.random() * (range.max[2] - range.min[2] + 1)) +
    range.min[2];

  // Convert to hex
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
