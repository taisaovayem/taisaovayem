"use client";
import { CSSProperties, useEffect, useState } from "react";
import styles from "./audio-player.module.css";

type AudioPlayerProps = {
  source: string;
  color?: string | null;
};
export function AudioPlayer({ source, color }: AudioPlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const customStyle: CSSProperties = {
    backgroundColor: "magenta",
  };
  if (color) {
    customStyle.backgroundColor = color;
  }

  function playAudio() {
    const audio = new Audio(source);
    audio.play();
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <button
      className={`w-[88px] h-[81px] rounded-full ${styles["play-button"]}`}
      style={customStyle}
      onClick={playAudio}
    ></button>
  ) : null;
}

export default AudioPlayer;
