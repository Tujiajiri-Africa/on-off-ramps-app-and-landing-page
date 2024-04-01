import Image from "next/image";
import Hero from '@/components/ui/hero'
import About from '@/components/ui/about'
import Features from '@/components/ui/features'
import FeatureList from '@/components/ui/feature-list'
import Contact from '@/components/ui/contact'
import  Navbar  from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Products from '@/components/ui/products'
import SupportedAssets from '@/components/ui/supportedAssets'
import { DemoRequest } from '@/components/ui/demo-request'

//import WaitListBanner from '@/components/ui/waitlist-banner'

//import BackgroundImage from '../app/assets/logo/background-image-sample-svg.svg'
//v2 components
import HeroPage2  from '@/components/ui/home-page-v2/hero'
import NavbarPage2 from '@/components/ui/home-page-v2/navbar'
import { ProductsV2 } from '@/components/ui/home-page-v2/features'
import { SupportedAssetsV2 } from '@/components/ui/home-page-v2/supportedAssets'
import { HowItWorksV2 } from '@/components/ui/home-page-v2/how-it-works'
import {FeatureListV2} from '@/components/ui/home-page-v2/feature-list'
import {FaqV2} from '@/components/ui/home-page-v2/faq'
import {ContactPageV2} from '@/components/ui/home-page-v2/contact'
import {AboutPageV2} from '@/components/ui/home-page-v2/about'

export default function Home() {
  return (
    <>
      
        <main 
        //className="h-screen bg-gradient-to-t from-[#593690] to-[#9A1AAF]"
        className="!scroll-smooth"
        >
          
          {/* <Navbar/> */}
          <NavbarPage2 />
          {/* <Hero /> */}
          <HeroPage2 />
          {/* <AboutPageV2 /> */}
          <ProductsV2 />
          <HowItWorksV2 />
          <FeatureListV2 />
          <SupportedAssetsV2 />
          {/* <HowItWorksV2 /> */}
          {/* <NavbarPage2 /> */}
          {/* <HeroPage2 /> */}
          <About />
          
          <Features />
          
          {/* <FeatureList /> */}
          {/* <ProductsV2 /> */}
          {/* <Products /> */}
          {/* <SupportedAssets /> */}
          {/* <Contact /> */}
          <ContactPageV2 />
          {/* <WaitListBanner /> */}
          <FaqV2 />
          <DemoRequest />
          
          <Footer />
      </main>

    </>
    
  );
}
