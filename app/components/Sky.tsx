"use client";

import { useState, useEffect } from "react";

const skyColors = [
  "#000717",
  "#000c26",
  "#01123b",
  "#011a54",
  "#00216e",
  "#0032a3",
  "#023cbf",
  "#0246e0",
  "#004eff",
];

export default function Sky() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => {
        const nextIndex = prevIndex + direction;
        if (nextIndex >= skyColors.length - 1 || nextIndex <= 0) {
          setDirection(-direction);
        }
        return nextIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [direction]);

  console.log(currentColorIndex);

  return (
    <div className="absolute w-full h-full" style={{ background: "#004eff" }} />
  );
}
