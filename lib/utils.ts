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

export function getUserNameFromEmail(emailAddress:string|undefined){
  if(emailAddress == undefined) return emailAddress
  return emailAddress.substring(0, emailAddress.indexOf("@"));
}

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);