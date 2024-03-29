"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import {signOut} from 'next-auth/react'
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from 'lucide-react'
import {Separator} from '@/components/ui/separator'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter } from "@/components/ui/card";
import Image from 'next/image'
import {CheckCircle2,CheckCheck, CheckCircle2Icon} from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-1 2xl:gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-purple-600 text-primary-foreground dark:text-white" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
                //bg-[#4B49AC]
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}

      <Separator className="max-xl:my-6 my-1 2xl:my-6" />

      <span className="cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
        <Settings className="mr-2 h-4 w-4" />
        Settings
        
      </span>
      
      <span className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
      {/* <Button
        //className="content-start w-full group  rounded-md px-3 py-2 text-sm bg-[#00BF63] text-white font-medium hover:bg-accent hover:text-accent-foreground"
        variant={'outline'}
            onClick={() => {
              signOut()
            }}
          >
            <LogOut className="mr-2 h-4 w-4"/>  <span>Sign Out</span>
        </Button> */}
        <button 
          className="flex "
          onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4"/>  <span>Sign Out</span>
        </button>
      </span>

        {/* <LogOut className=" group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground mr-2 h-4 w-4"/>  <span>Sign Out</span> */}
        {/* <Separator className="my-3" /> */}

        {/* <Card
          //className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
          className="mt-8 flex flex-col justify-center items-center bg-gradient-to-b from-[#FDC707] via-[#F00FDA] to-[#00BF63] shadow-inner bg-opacity-50"
        >
              <CardHeader 
                //className="mt-8 flex justify-center items-center pb-2"
                >
                <CardTitle className="grid gap-4 place-items-center font-bold">
                   <span 
                        //className='bg-white w-auto h-auto overflow-hidden text-white font-semibold rounded-full'
                        >
                            <Image
                              src={MATIC_LOGO.src}
                              alt='logo'
                              className="absolute -top-12 w-24 h-24 aspect-square object-cover rounded-full"
                              width={60}
                              height={60}
                            />
                    </span> 
                    <span
                        className='text-white font-bold'
                    >
                        Verification
                    </span>
                </CardTitle>
             
              </CardHeader>

              <CardContent className="text-center pb-2 text-gray-200">
                <p>
                  Submit verification documents to unlock more features
                </p>
              </CardContent>

              <CardFooter>
                  <Button className="w-full bg-[#00BF63]">
                    Complete Verification
                  </Button>
              </CardFooter>
        </Card> */}
    </nav>
  );
}
