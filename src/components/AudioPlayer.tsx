"use client";
import { CSSProperties, useEffect, useState } from "react";
import styles from "./AudioPlayer.module.css";

type AudioPlayerProps = {
  source: string;
  color?: string | null;
};
export function AudioPlayer({ source, color }: AudioPlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const customStyle: CSSProperties = {
    backgroundColor: "magenta",
  };
  if (color && /^(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
    customStyle.backgroundColor = "#" + color;
  }
  if (color && !/^(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
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
      className={`w-[88px] h-[82px] rounded-full ${styles["play-button"]}`}
      style={customStyle}
      onClick={playAudio}
    ></button>
  ) : null;
}

export default AudioPlayer;
