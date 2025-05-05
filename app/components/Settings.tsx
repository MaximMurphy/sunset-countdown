"use client";

import Link from "next/link";
import { useState } from "react";
import { useSettings } from "../context/SettingsContext";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center gap-2 text-amber-100 hover:text-amber-500 hover:scale-110 hover:cursor-pointer transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <SettingsIcon />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-amber-50 text-[#000717] p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-500 hover:scale-110 hover:cursor-pointer transition-all duration-300"
              >
                ✕
              </button>
            </div>
            <section className="font-mono h-full flex flex-col justify-between">
              <div className="font-mono flex flex-col gap-8 mb-12">
                <FontSelector />
                <TimeFormatSelector />
              </div>
              <Footer />
            </section>
          </div>
        </div>
      )}
    </>
  );
}

const FontSelector = () => {
  const { font, setFont } = useSettings();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Font</label>
      <div className="flex flex-row justify-between gap-4">
        <button
          onClick={() => setFont("Geist")}
          className={`h-full w-full border p-2 rounded-md hover:cursor-pointer hover:border-amber-500 transition-all duration-300 ${
            font === "Geist"
              ? "border-amber-500 bg-amber-100/50"
              : "border-amber-200"
          }`}
        >
          Geist
        </button>
        <button
          onClick={() => setFont("IBM Plex")}
          className={`h-full w-full border p-2 rounded-md hover:cursor-pointer hover:border-amber-500 transition-all duration-300 ${
            font === "IBM Plex"
              ? "border-amber-500 bg-amber-100/50"
              : "border-amber-200"
          }`}
        >
          IBM Plex
        </button>
        <button
          onClick={() => setFont("Roboto")}
          className={`h-full w-full border p-2 rounded-md hover:cursor-pointer hover:border-amber-500 transition-all duration-300 ${
            font === "Roboto"
              ? "border-amber-500 bg-amber-100/50"
              : "border-amber-200"
          }`}
        >
          Roboto
        </button>
      </div>
    </div>
  );
};

const TimeFormatSelector = () => {
  const { timeFormat, setTimeFormat } = useSettings();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Time Format</label>
      <div className="flex flex-row justify-between gap-4">
        <button
          onClick={() => setTimeFormat("12h")}
          className={`h-full w-full border p-2 rounded-md hover:cursor-pointer hover:border-amber-500 transition-all duration-300 ${
            timeFormat === "12h"
              ? "border-amber-500 bg-amber-100/50"
              : "border-amber-200"
          }`}
        >
          12h (AM/PM)
        </button>
        <button
          onClick={() => setTimeFormat("24h")}
          className={`h-full w-full border p-2 rounded-md hover:cursor-pointer hover:border-amber-500 transition-all duration-300 ${
            timeFormat === "24h"
              ? "border-amber-500 bg-amber-100/50"
              : "border-amber-200"
          }`}
        >
          24h
        </button>
      </div>
    </div>
  );
};

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m19.59 15.5l-1.82-1.3c.3-1.08.32-2.25 0-3.42l1.82-1.28L18.14 7l-2.03.92c-.79-.8-1.79-1.42-2.96-1.71L12.95 4h-2.9l-.2 2.21c-1.17.29-2.17.91-2.96 1.71L4.86 7L3.41 9.5l1.82 1.28c-.32 1.17-.3 2.34 0 3.42l-1.82 1.3L4.86 18l2.03-.93c.79.79 1.79 1.39 2.96 1.7l.2 2.23h2.9l.2-2.23c1.17-.31 2.17-.91 2.96-1.7l2.03.93zM13.5 3c.27 0 .5.2.5.46l.18 2.04c.76.28 1.44.69 2.05 1.18l1.85-.87c.23-.12.52-.04.66.19l2 3.5c.14.21.06.5-.16.65l-1.67 1.17c.13.8.12 1.59 0 2.36l1.67 1.17c.22.15.3.44.16.65l-2 3.5c-.14.21-.43.29-.66.17l-1.85-.86c-.61.49-1.29.89-2.05 1.19l-.18 2c0 .29-.23.5-.5.5h-4a.5.5 0 0 1-.5-.5l-.18-2c-.76-.3-1.44-.7-2.05-1.19l-1.85.86c-.23.12-.52.04-.66-.17l-2-3.5c-.14-.21-.06-.5.16-.65l1.67-1.17c-.12-.77-.13-1.56 0-2.36l-1.67-1.17c-.22-.15-.3-.44-.16-.65l2-3.5c.14-.23.43-.31.66-.19l1.85.87c.61-.49 1.29-.9 2.05-1.18L9 3.46c0-.26.23-.46.5-.46zm-2 6a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 12.5A3.5 3.5 0 0 1 11.5 9m0 1A2.5 2.5 0 0 0 9 12.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5"
    />
  </svg>
);

const Footer = () => (
  <p className="text-sm text-center">
    🌅 Made by{" "}
    <Link
      href="https://www.luminance.one/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-amber-500 transition-all duration-300"
    >
      Luminance
    </Link>{" "}
    🌇
  </p>
);
