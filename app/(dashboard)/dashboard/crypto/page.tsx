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

export default function Profile(){
    return (
        <>
        <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Buy/Sell
          </h2>
          
          <div className="md:flex items-center space-x-2">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button
                className="bg-[#16a34a] dark:text-white"
            >
                Send/Receive
            </Button> */}
              {/* <Dialog>
                            <DialogTrigger asChild>
                                    <Button variant="outline">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                        Name
                                        </Label>
                                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                        Username
                                        </Label>
                                        <Input id="username" value="@peduarte" className="col-span-3" />
                                    </div>
                                    </div>
                                    <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                        </Dialog> */}
                    <Sheet>
                    {/* <SheetTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </SheetTrigger> */}
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                        </div>
                        <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                    </Sheet>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
              <CardHeader>
                  <CardTitle>Buy Crypto</CardTitle>
                  <CardDescription>
                    Buy your favourite crypto asset and pay with KES
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview />  */}
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Sell Crypto</CardTitle>
                  <CardDescription>
                    Sell crypto and receive KES
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <RecentSales /> */}
                </CardContent>
              </Card>
            </div>
        </div>
        {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7"> */}

        {/* </div> */}
        </ScrollArea>


        </>
    )
}