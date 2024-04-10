import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {supportedAssets} from '@/helpers/data'
import SOL_lOGO from '@/app/assets/logo/solana-sol-logo.svg'

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

export const getAssetImage = (label:string) =>{
 const asset = supportedAssets.find((value) => 
      value.label == label || 
      value.value == label ||
      value.label.slice(0,4) == label.slice(0,4) 
      //value.label.slice(0,3) == label.slice(0,3) ||
      //value.value.slice(0,3) == label.slice(0,3) ||
      //value.value.slice(0,4) == label.slice(0,4)
  )
  if(label.slice(0,3) == 'SOL'){
    return SOL_lOGO
  }
 return asset?.icon
}