import Image from "next/image";
import Hero from '@/components/ui/hero'
import About from '@/components/ui/about'
import Features from '@/components/ui/features'
import FeatureList from '@/components/ui/feature-list'
import Contact from '@/components/ui/contact'
import  Navbar  from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Products from '@/components/ui/products'
//import WaitListBanner from '@/components/ui/waitlist-banner'

//import BackgroundImage from '../app/assets/logo/background-image-sample-svg.svg'
//v2 components

export default function Home() {
  return (
    <>
      
        <main 
        //className="h-screen bg-gradient-to-t from-[#593690] to-[#9A1AAF]"
        className="!scroll-smooth"
        >
          
          <Navbar/>
          {/* <NavbarV2 /> */}
          <Hero />
          <About />
          <Features />
          <FeatureList />
          <Products />
          <Contact />
          {/* <WaitListBanner /> */}
          <Footer />
      </main>

    </>
    
  );
}
