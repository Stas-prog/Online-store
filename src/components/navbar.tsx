'use client'

import Link from "next/link"
import Image from "next/image"
import Menu from "./menu"
import SearchBar from "./searchbar"
import dynamic from "next/dynamic"
import NavIcons from "./navicons"
// const NavIcons = dynamic(() => import("./navicons"), { ssr: false })

const Navbar = () => {
    return (
        <div className="h-20 px-4 md:px-8 lg:px-16 relative bg-x">

            {/* MOBILE  */}
            <div className="h-full flex items-center justify-between md:hidden">
                <Link href='/homepage'>
                    <Image src='/logo.png' alt="" width={74} height={74} className="cursor-pointer" />
                    {/* <div className="text-2xl tracking-wide">Packandgo</div> */}
                </Link>
                <Menu />
            </div>

            {/* BIGGER SCREENS*/}
            <div className="hidden md:flex items-center justify-between gap-8 h-full">
                {/* LEFT */}
                <div className="w-1/3 lg:w-1/2 flex items-center gap-12">
                    <Link href='/homepage'>
                        <Image src='/logo.png' alt="" width={74} height={74} className="cursor-pointer" />
                        {/* <div className="text-2xl tracking-wide">Packandgo</div> */}
                    </Link>
                    <div className="hidden lg:flex items-center justify-between gap-4 text-white text-sm">
                        <Link href='/homepage'>Головна</Link>
                        <Link href='/list?cat=all-products'>Всі товари</Link>
                        <Link href='/share'>Акції</Link>
                        <Link href='/about'>Про нас</Link>
                        <Link href='/contact'>Контакти</Link>
                    </div>
                </div>
                {/* RIGHT */}
                <div className="w-2/3 lg:w-1/2 flex items-center justify-between gap-8">
                    <SearchBar />
                    <NavIcons />
                </div>
            </div>
        </div>
    )
}

export default Navbar