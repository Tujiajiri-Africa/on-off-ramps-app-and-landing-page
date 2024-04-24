import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import BackgroundIntroImage from '@/app/assets/backgrounds/auth/intro-page-image-1-svg.svg'

export function YCWidget(){
    const API_KEY = process.env.YC_WIDGET_SANDBOX_API_KEY
    const API_SECRET = process.env.YC_WIDGET_SANDBOX_API_SECRET
    const SANDBOX_BASE_URL = process.env.YC_WIDGET_SANDBOX_BASE_URL

    return (
      <>
        <div
        className="YCWidgetContainer flex h-full 2xl:min-h-screen flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
        >
          <div className="flex justify-center bg-transparent shadow-2xl rounded-md" 
            id="YCWidget">
                <iframe
                  src={`${SANDBOX_BASE_URL}/${API_KEY}`}
                  title="Buy Crypto with Ajira Pay Finance"
                  style={{
                    overflow: "hidden",
                    width: 800,
                    height: 900,
                    padding: 0,
                    margin: 'auto'
                  }}
                  
                  className="rounded-md overflow-hidden mx-auto"
                />
              </div>
      </div>
      </>


    )
}

