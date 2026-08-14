"use client";

import { cn } from "@/lib/utils";

import { iconMap, type IconName } from "./iconsMap";

interface IconProps {
  name: IconName;

  className?: string;

  size?: number;
}

export function Icon({ name, className, size = 28 }: IconProps) {
  const Component = iconMap[name];

  return <Component size={size} className={cn(className)} />;
}
