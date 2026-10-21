"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [animation, setAnimation] = React.useState<"sun" | "moon" | null>(null);
  const [animationKey, setAnimationKey] = React.useState(0);

  const changeTheme = (theme: "light" | "dark" | "system") => {
    setTheme(theme);

    if (theme === "system") {
      setAnimation(null);
      return;
    }

    setAnimation(theme === "light" ? "sun" : "moon");
    setAnimationKey((key) => key + 1);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} className="rounded-md" size="icon">
          <Sun
            key={`sun-${animationKey}`}
            className={`h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90 ${
              animation === "sun"
                ? "animate-[spin_2s_linear_1]"
                : "rotate-0 scale-100"
            }`}
          />
          <Moon
            key={`moon-${animationKey}`}
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all dark:scale-100 dark:rotate-0 ${
              animation === "moon"
                ? "animate-[pulse_2s_ease-in-out_1]"
                : "scale-0 rotate-90"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
