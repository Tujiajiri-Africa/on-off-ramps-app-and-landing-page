import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export function YCWidget(){
    const API_KEY = process.env.YC_WIDGET_SANDBOX_API_KEY
    const API_SECRET = process.env.YC_WIDGET_SANDBOX_API_SECRET
    const SANDBOX_BASE_URL = process.env.YC_WIDGET_SANDBOX_BASE_URL

    return (
        <div
        className="flex  w-full h-full 2xl:h-screen flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
          <div className="flex justify-center bg-transparent shadow-2xl rounded-md"
            >
                <iframe
                  //src="https://pagedone.io/asset/uploads/1691054543.png"
                  src={`${SANDBOX_BASE_URL}/${API_KEY}`}
                  width={1024}
                  height={800}
                  style={{
                    overflow: "hidden"
                  }}
                  
                  className="rounded-md overflow-hidden "
                />
              </div>
      </div>
    )
}

