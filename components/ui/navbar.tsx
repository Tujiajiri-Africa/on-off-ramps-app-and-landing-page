'use client'

//import { IonIcon, IonMenu } from "@ionic/react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoMainTransparent from '../../app/assets/logo/logo-main-transparent-png-2.png'
import Image from 'next/image'

export default function Navbar(){
    const handleMenuClose = (e: any) => {
        //e.preve
        console.log(e)
    }
    return (
        <>
            <header 
            //className="bg-gradient-to-t from-[#593690] to-[#9A1AAF]"
            className="bg-[#010203] text-[#999999] w-[80%] mx-auto"
            style={{
                //background: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(198,45,253,1) 100%)'
            }}
            >
                <nav className="flex justify-between items-center w-[92%] mx-auto">
                    <div className="platform-logo">
                        {/* <h2 className="w-16">AjiraPay</h2> */}
                        <img 
                            className="w-16  text-white" 
                            //src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png" 
                            src={LogoMainTransparent.src}
                            alt="logo"
                            //width={200}
                            //height={100}
                        />
                        {/* <h2 className="w-16 text-white">AjiraPay</h2> */}
                    </div>
                   {/* <div className="md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8 mobile:block">
                            <li><a className="hover:text-gray-500" href="/">Home</a></li>
                            <li><a className="hover:text-gray-500" href="#">About</a></li>
                            <li><a className="hover:text-gray-500" href="#">Features</a></li>
                            <li><a className="hover:text-gray-500" href="#">How it Works</a></li>
                            <li><a className="hover:text-gray-500" href="#">Contact Us</a></li>
                    </ul>
                   </div>  */}
                    <div className='flex items-center gap-6'>
                        <button className="bg-[#00BF63] text-white px-5 py-2 rounded-md hover:bg-[#5B21B6] uppercase">Coming Soon</button>
                        {/* <MenuIcon className="md:hidden text-3xl cursor-pointer " onClick={(e) => handleMenuClose(e)}></MenuIcon> */}
                    </div>
                </nav>
            </header>
        </>
    )
}