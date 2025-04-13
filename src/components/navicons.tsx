"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import CartModal from "./cartmodal"
import { useWixClient } from "@/hooks/useWixClient"
import Cookies from "js-cookie"
import {useCartStore} from "../../src/hooks/useCartStore.ts"



const NavIcons = () => {
 const wixClient = useWixClient()
//     const isLoggedIn = wixClient.auth.loggedIn()
//     console.log(isLoggedIn)
    const isLoggedIn = false
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    
    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login")
        } 
            setIsProfileOpen(prev => !prev)
        
    }

    const handleLogout = async () => {
        setIsLoading(true)
        Cookies.remove("refreshToken")
        // const { logoutUrl } = await wixClient.auth.logout(window.location.href)
        setIsLoading(false)
        setIsProfileOpen(prev => !prev)
        router.push("/")
    }

    const {cart, counter, getCart} = useCartStore()

    useEffect(() => {
       getCart(wixClient)
    }, [getCart, wixClient])



    return (
        <div className="flex items-center gap-4 xl:gap-6 relative bg-gray-200 p-2 rounded-md">
            <Image src='/profile.png' alt="" width={22} height={22} className="cursor-pointer"
                onClick={handleProfile}
            // onClick={login}
            />
            {isProfileOpen && (<div className="absolute p-4 bg-white rounded-md top-16 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.5)] z-30">
                <Link href='/profile' onClick={()=>setIsProfileOpen(prev=>!prev)}>Профіль</Link >
                <div className="mt-2 cursor-pointer" onClick={handleLogout} >{isLoading ? "Logging out" : "Вийти"}</div>
            </div>)}
            <Image src='/notification.png' alt="" width={22} height={22} className="cursor-pointer" />
            <div className="cursor-pointer relative" onClick={() => setIsCartOpen(prev => !prev)}>
                <Image src='/cart.png' alt="" width={22} height={22} />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-z rounded-full text-white text-sm flex items-center justify-center">
                    {counter}
                </div>
            </div>
            {isCartOpen && <CartModal cartOpen={setIsCartOpen}/>}
        </div>
    )

}
// onClick={handleLogout}
// Auth with wix-managed auth
// const wixClient = useWixClient()

// const login = async () => {

//     const loginRequestData = wixClient.auth.generateOAuthData(
//         "http://www.localhost:3000",
//     );

//     localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData))
//     const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData)
//     window.location.href = authUrl
// }
export default NavIcons