import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";

export default function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 text-center">
      <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-emerald-900 to-emerald-600 dark:from-emerald-400 dark:to-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight">
        Official Madrasa <br /> Result Portal
      </h2>

      <p className="max-w-xl mt-4 text-sm md:text-lg text-neutral-700 dark:text-neutral-400">
        Secure, verified and instant academic results publishing system for
        institutions and students.
      </p>

      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <Button className="px-6 py-6 text-lg rounded-2xl">
          Check Result
        </Button>
        <Button variant="outline" className="px-6 py-6 text-lg rounded-2xl">
          Institution Login
        </Button>
      </div>
    </BackgroundLines>
  );
}