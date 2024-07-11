'use client'

//import PageNotFound from '@/components/ui/not-found'
import ServerErrorPageV2 from '@/components/ui/home-page-v2/500'

export default function ServerError(){
    return (<>
        {/* <PageNotFound /> */}
        <ServerErrorPageV2 />
    </>)
}