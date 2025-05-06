"use client";

import { useSettings } from "../context/SettingsContext";

export default function FontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { font } = useSettings();

  const getFontStyle = () => {
    switch (font) {
      case "Geist":
        return { fontFamily: "Geist Mono" };
      case "Chivo":
        return { fontFamily: "Chivo Mono" };
      case "IBM Plex":
        return { fontFamily: "IBM Plex Mono" };
      default:
        return { fontFamily: "Geist Mono" };
    }
  };

  return <div style={getFontStyle()}>{children}</div>;
}
