import { Button } from '@/components/ui/button'
import {FcGoogle} from 'react-icons/fc'

export const Social = () =>{
    return (
        <>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-100 text-gray-500">
                            Or continue with
                        </span>
                    </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 mb-6">
                <Button 
                    className='w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                    size={'lg'}
                    variant={'outline'}
                    onClick={() => {}}
                    >
                    <FcGoogle className="h-6 w-6"/>
                </Button>
        </div>
        </>
    )

}