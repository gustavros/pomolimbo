"use client";

import { useContext, useRef, useState } from "react";
import { PlayIcon, PauseIcon, CircleStopIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function BrownNoise() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(5);

  const handlePlay = () => {
    if (audioRef.current) {
      setIsPlaying(true);

      audioRef.current.volume = volume / 100;

      audioRef.current.play();

      console.log(audioRef.current.volume);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      setIsPlaying(false);

      audioRef.current.pause();

      console.log("paused");
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      setVolume(value[0]);

      audioRef.current.volume = value[0] / 100;
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 flex flex-col items-center justify-center gap-6 w-full">
      <audio ref={audioRef} src="/brown-noise.mp3" loop />

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleToggle}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>

      <div className="flex flex-col items-start gap-4">
        <Slider
          min={0}
          max={100}
          step={1}
          defaultValue={[5]}
          value={[volume]}
          onValueChange={handleVolumeChange}
        />

        <div className="flex flex-col gap-1">
          <small className="text-muted-foreground">
            It's recommended to use a volume of 5% or less while focusing.
          </small>
        </div>
      </div>
    </div>
  );
}
