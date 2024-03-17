"use client";
import React from "react";
import { SparklesCore } from "../ui/Sparkles";

export function SparklesPreview() {
  return (
    <div className="h-[62rem] relative w-full  bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl  lg:text-6xl text-7xl  text-center text-white relative z-20">
      Event Registration System
      </h1>
      <h2 className="mt-1">
      We are a system developed to register users for events
      </h2>
    </div>
  );
}