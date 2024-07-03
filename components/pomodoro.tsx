'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Sun, Moon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Pomodoro() {
  const [storedValue, setStoredValue] = useLocalStorage("pomodoro-minutes", 30);

  const { setTheme } = useTheme();

  const [finishedSound, setFinishedAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [buttonClickSound, setButtonClickAudio] =
    useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const finishedAudio = new Audio("/mixkit-tick-tock-clock-timer-1045.wav");
    finishedAudio.volume = 0.4;
    setFinishedAudio(finishedAudio);

    const buttonClickAudio = new Audio(
      "/mixkit-retro-game-notification-212.wav"
    );
    buttonClickAudio.volume = 0.2;
    setButtonClickAudio(buttonClickAudio);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMinutes, setNewMinutes] = useState("");

  // Atualiza initialMinutes quando storedValue mudar
  useEffect(() => {
    setInitialMinutes(storedValue);
  }, [storedValue]);

  // Atualiza secondsAmount quando storedValue mudar
  useEffect(() => {
    setSecondsAmount(storedValue * 60);
  }, [storedValue]);

  const [initialMinutes, setInitialMinutes] = useState(storedValue);
  const [secondsAmount, setSecondsAmount] = useState(storedValue * 60);

  const seconds = secondsAmount % 60;
  const minutes = Math.floor(secondsAmount / 60);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (secondsAmount === 0) {
      setIsPlaying(false);

      finishedSound?.play();

      toast("Your pomodoro has finished", {
        description: "You can now take a short break",
        action: {
          label: "Dismiss",
          onClick: () => finishedSound?.pause(),
        },
      });

      return;
    }

    if (isPlaying) {
      const intervalId = setInterval(() => {
        setSecondsAmount((prevSecondsAmount) => prevSecondsAmount - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isPlaying, secondsAmount, setSecondsAmount, finishedSound]);

  const toggle = () => {
    setIsPlaying(!isPlaying);

    buttonClickSound?.play();
  };

  const handleChangeMinutes = () => {
    const minutes = Number(newMinutes);

    setStoredValue(minutes);

    setInitialMinutes(minutes); // Atualiza o estado de initialMinutes
    setSecondsAmount(minutes * 60); // Atualiza o estado de secondsAmount

    setIsDialogOpen(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center pb-4">
        Pomolimbo - The Pomodoro Timer
      </h1>

      <div className="flex flex-col items-center gap-8">
        <div className="text-8xl font-bold text-primary w-96 flex items-center justify-center">
          <span>{minutes.toString().padStart(2, "0")}</span>:
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>

        <Progress
          value={(secondsAmount / (initialMinutes * 60)) * 100}
          max={100}
          className="w-96"
        />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button className="w-32" onClick={toggle}>
              {isPlaying ? "Pause" : "Start"}
            </Button>

            <Button
              className="w-fit"
              variant="outline"
              onClick={() => setSecondsAmount(initialMinutes * 60)}
            >
              Reset
            </Button>
          </div>

          <Separator orientation="vertical" />

          <Button
            className="w-32"
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
          >
            Settings
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2 text-left">
                  <Label className="text-left">Minutes to focus</Label>

                  <Input
                    id="minutes"
                    className="col-span-3"
                    type="text"
                    placeholder="30"
                    defaultValue={initialMinutes}
                    min={1}
                    max={60}
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(e.target.value)}
                  />

                  <small className="text-muted-foreground">
                    The min and max values are 1 and 60
                  </small>
                </div>

                <div className="flex flex-col gap-2 text-lef">
                  <Label>Theme</Label>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-full">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" onClick={handleChangeMinutes}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
