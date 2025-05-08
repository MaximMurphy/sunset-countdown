"use client";

import { useSimCycle } from "../../context/SimCycleContext";
import { useEffect, useState } from "react";

export default function Sky() {
  const { starOpacity } = useSimCycle();
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>(
    []
  );

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // Random size between 1-3px
    }));
    setStars(newStars);
  }, []);

  return (
    <div
      className="absolute w-full h-full transition-colors duration-1000 overflow-hidden"
      style={{
        opacity: starOpacity / 100,
      }}
    >
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
}
