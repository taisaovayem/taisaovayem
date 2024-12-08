import { CSSProperties } from "react";
import styles from "./audio-player.module.css";

type AudioPlayerProps = {
  source: string;
  color?: string | null;
};
export function AudioPlayer({ source, color }: AudioPlayerProps) {
  const audio = new Audio(source);
  const customStyle: CSSProperties = {
    backgroundColor: "pink",
  };
  if (color) {
    console.log(color)
    customStyle.backgroundColor = color;
  }
  return (
    <button
      className={`w-[88px] h-[81px] rounded-full ${styles["play-button"]}`}
      style={customStyle}
      onClick={() => audio.play()}
    ></button>
  );
}

export default AudioPlayer;
