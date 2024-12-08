"use client";
import AudioPlayer from "@/components/AudioPlayer";
import { Box, Code, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmmedAudio() {
  const searchParams = useSearchParams();
  const audioSource = searchParams.get("source");
  const backgroundColor = searchParams.get("color");
  if (!audioSource) {
    return (
      <Box>
        <Text>Chưa gắn link audio</Text>
        <Text>Vui lòng gắn link dạng:</Text>
        <Code>https://taisaovayem/embed/audio?source=/onii-chan.mp3</Code>
      </Box>
    );
  }

  return <AudioPlayer source={audioSource} color={backgroundColor} />;
}

export default function EmmedAudioPage() {
  return (
    <Suspense>
      <EmmedAudio />
    </Suspense>
  );
}
