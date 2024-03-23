"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import {getUserNameFromEmail} from '@/lib/utils'
import Link from "next/link";
import { LogOut, Settings , User2Icon} from 'lucide-react'

export function UserNav() {
  const { data: session } = useSession();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage
                src={session.user?.image ?? ""}
                alt={session.user?.name ?? ""}
              /> */}
              <AvatarFallback>
                 {`${session.user?.first_name?.[0].toUpperCase()}${session.user?.last_name?.[0].toUpperCase()}`} 
                 {/**+ session.user?.email?.[1].toUpperCase() */}
                {/* DO */}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
              { session.user?.name ? session.user?.name: getUserNameFromEmail(session.user?.email)}
                {/* Dickens Odera */}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                  {session.user?.email} 
                {/* dickensodera9@gmail.com */}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <User2Icon className="mr-2 h-4 w-4" />
              <Link href='/dashboard/user/profile'>Profile</Link>
              {/* <Drop>downMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> 
            </DropdownMenuItem> */}
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>  */}
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              Support
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
              Sign out
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
   }
}
