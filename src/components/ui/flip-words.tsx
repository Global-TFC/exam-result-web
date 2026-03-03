"use client";
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 2500,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [prev, setPrev] = useState<string | null>(null);

  useEffect(() => {
    if (safeWords.length <= 1) return;

    const interval = window.setInterval(() => {
      setPrev(safeWords[index]);
      setExiting(true);

      window.setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % safeWords.length);
        setExiting(false);
      }, 260);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, index, safeWords]);

  const current = safeWords[index] ?? "";

  return (
    <span className="relative inline-flex px-1 align-baseline">
      {prev ? (
        <WordLetters
          word={prev}
          state="out"
          active={exiting}
          absolute
          wordClass={className}
        />
      ) : null}
      <WordLetters word={current} state="in" active={!exiting} wordClass={className} />
    </span>
  );
};

const WordLetters = ({
  word,
  state,
  active,
  absolute = false,
  wordClass,
}: {
  word: string;
  state: "in" | "out";
  active: boolean;
  absolute?: boolean;
  wordClass?: string;
}) => {
  return (
    <span
      className={cn(
        absolute ? "absolute left-0 top-0 inline-flex" : "inline-flex",
        state === "out" ? "flip-word-out" : "flip-word-in",
        active ? "is-active" : "is-idle"
      )}
      aria-hidden={state === "out"}
    >
      {word.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={cn(
            "flip-letter bg-clip-text text-transparent",
            wordClass,
            "bg-gradient-to-b from-blue-600 via-blue-500 to-blue-800 shadow-smoke-500/50 pb-4"
          )}
          style={{ animationDelay: `${index * 40}ms` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
};
