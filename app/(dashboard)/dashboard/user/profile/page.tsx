import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
  } from "@/components/ui/sheet"
import { UserProfileUpdateForm } from '@/app/(dashboard)/dashboard/user/profileUpdateForm'
import {UserPasswordUpdateForm} from '@/app/(dashboard)/dashboard/user/passwordChangeForm'
import {UserAddPhoneForm} from '@/app/(dashboard)/dashboard/user/addPhoneForm'

export default function Profile(){
    return (
        <>
        <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Profile
          </h2>
          
          <div className="hidden sm:flex items-center space-x-2 ">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button
                className="bg-[#16a34a] dark:text-white"
            >
                Send/Receive
            </Button> */}

                <Sheet>
                    <SheetTrigger asChild>
                        <Button >Add Mobile Money Number</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserAddPhoneForm />
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                        <Button>Edit Profile</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserProfileUpdateForm />
                    </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                          <Button>Change Password</Button>
                      </SheetTrigger>
                      <SheetContent>
                          <UserPasswordUpdateForm />
                      </SheetContent>
                    </Sheet>
          </div>
        </div>

        <div className="sm:hidden grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"> 
        <Sheet>
                    <SheetTrigger asChild>
                        <Button >Add Mobile Money Number</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserAddPhoneForm />
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                        <Button>Edit Profile</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <UserProfileUpdateForm />
                    </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                          <Button>Change Password</Button>
                      </SheetTrigger>
                      <SheetContent>
                          <UserPasswordUpdateForm />
                      </SheetContent>
                    </Sheet>
          
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                <div className="flex items-center justify-between space-y-2">
                    <div className="md:flex items-center space-x-2">
                    <CardTitle>
                      {/* Income Overview */}
                    </CardTitle>
                    {/* <CalendarDateRangePicker /> */}
                    </div>
                  </div>   
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview />  */}
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  {/* <CardTitle>Recent Transactions</CardTitle> */}
                  <CardDescription>
                      {/* Your transactions history */}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <RecentSales /> */}
                </CardContent>
              </Card>
            </div>
        </div>
   
        </ScrollArea>


        </>
    )
}