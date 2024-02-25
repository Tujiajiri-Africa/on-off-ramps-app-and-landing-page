import Image from "next/image";
import Hero from '@/components/ui/hero'
import About from '@/components/ui/about'
import Features from '@/components/ui/features'
import FeatureList from '@/components/ui/feature-list'
import Contact from '@/components/ui/contact'
//import WaitListBanner from '@/components/ui/waitlist-banner'

//import BackgroundImage from '../app/assets/logo/background-image-sample-svg.svg'

export default function Home() {
  return (
    <>
      
      <main 
      //className="h-screen bg-gradient-to-t from-[#593690] to-[#9A1AAF]"
    
      >
       
        <Hero />
        <About />
        <Features />
        <FeatureList />
        <Contact />
        {/* <WaitListBanner /> */}
        
    </main>
    </>
    
  );
}
