import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function correctTimezone(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
}
