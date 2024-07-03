import { Separator } from "@/components/ui/separator";

import BrownNoise from "@/components/brown-noise";
import Pomodoro from "@/components/pomodoro";
import { SelectSeparator } from "@/components/ui/select";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center mt-auto">
        <Pomodoro />

        <SelectSeparator className="my-8" />

        <BrownNoise />
      </div>

      <div className="text-sm text-foreground border-t-2 w-full py-4 mt-auto text-center">
        Made with ❤ and ☕ by{" "}
        <a href="https://github.com/gustavros" className="underline">
          Gustavo Santana
        </a>
      </div>
    </div>
  );
}
