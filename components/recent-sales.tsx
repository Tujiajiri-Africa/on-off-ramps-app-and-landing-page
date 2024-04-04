import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Button} from '@/components/ui/button'
import {PlusIcon, MinusIcon, Cross1Icon} from '@radix-ui/react-icons'
import { ArrowUpRight } from "lucide-react";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>
              <PlusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Deposit</p>
          <p className="text-sm  text-green-600"
          //text-muted-foreground
          >
            Success
          </p>
        </div>
        <div className="ml-auto font-medium">KES 1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>
            <PlusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Buy USDT</p>
          <p className="text-sm text-green-600"
          //text-muted-foreground
          >
            Success
            </p>
        </div>
        <div className="ml-auto font-medium">KES 39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>
            <MinusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Withdraw cUSD</p>
          <p className="text-sm text-green-600"
          //text-muted-foreground
          >
            Success
          </p>
        </div>
        <div className="ml-auto font-medium">KES 299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>
            <PlusIcon className="w-4 h-4"  />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Buy BTC</p>
          <p className="text-sm text-green-600"
          //text-muted-foreground
            >
              Success
            </p>
        </div>
        <div className="ml-auto font-medium">KES 5,300.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>
            <Cross1Icon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sell USDC</p>
          <p className="text-sm text-red-700">Insufficient Balance</p>
        </div>
        <div className="ml-auto font-medium">KES 3,039.00</div>
      </div>
      <div className="flex items-center">
        <Button className=" bg-orange-600 text-white hover:bg-orange-500 hover:text-white">
          <div className="flex gap-2 items-center">
            View More <ArrowUpRight className="h-6 w-6" />
          </div>
        </Button>
      </div>
    </div>
  );
}
