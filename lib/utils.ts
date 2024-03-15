import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface UserResponseDataProps{
  error: string;
  success: string;
  data: any
}

export function getUserNameFromEmail(emailAddress:string){
  return emailAddress.substring(0, emailAddress.indexOf("@"));
}