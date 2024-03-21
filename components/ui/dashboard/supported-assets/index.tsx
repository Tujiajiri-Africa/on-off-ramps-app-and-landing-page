'use client'

import React,{useState} from 'react'
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {supportedAssets, Asset} from '@/helpers/data'
import {Button} from '@/components/ui/button'

export const AssetList = () => {
    const [open, setOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(
      null
    )
   
    return (
      <div className="flex items-center space-x-4">
        <p className="text-sm text-muted-foreground">Status</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-[150px] justify-start"
            >
              {selectedAsset ? (
                <>
                  <selectedAsset.icon className="mr-2 h-4 w-4 shrink-0" />
                  {selectedAsset.label}
                </>
              ) : (
                <>+ Set Asset</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {supportedAssets.map((asset) => (
                    <CommandItem
                      key={asset.value}
                      value={asset.value}
                      onSelect={(value) => {
                        setSelectedAsset(
                            supportedAssets.find((priority) => priority.value === value) ||
                            null
                        )
                        setOpen(false)
                      }}
                    >
                      <asset.icon
                        className={cn(
                          "mr-2 h-4 w-4",
                          asset.value === selectedAsset?.value
                            ? "opacity-100"
                            : "opacity-40"
                        )}
                      />
                      <span>{asset.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
}