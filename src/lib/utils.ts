import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// مدیریت کلی کلاس ها ظاهر
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
