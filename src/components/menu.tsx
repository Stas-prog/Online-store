'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"


const Menu = () => {
    const [open, setOpen] = useState(false)
    return <div>
        <Image src='/menu.png' alt="" width={28} height={28} className="cursor-pointer" onClick={() => { setOpen(prev => !prev) }} />
        {open && (
            <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-40">
                <Link href="/login" onClick={()=>{setOpen(false)}}>Авторизація</Link>
                <Link href="/search" onClick={()=>{setOpen(false)}}>Пошук</Link>
                <Link href="/homepage" onClick={()=>{setOpen(false)}}>Головна</Link>
                <Link href="/list?cat=all-products" onClick={()=>{setOpen(false)}}>Всі товари</Link>
                <Link href="/corp" onClick={()=>{setOpen(false)}}>Корпоративні замовлення</Link>
                <Link href="/about" onClick={()=>{setOpen(false)}}>Про нас</Link>
                <Link href="/share" onClick={()=>{setOpen(false)}}>Акції</Link>
                <Link href="/contact" onClick={()=>{setOpen(false)}}>Контакти</Link>
                <Link href="/cart" onClick={()=>{setOpen(false)}}>Кошик</Link>
                <Link href="/" onClick={()=>{setOpen(false)}}>Вихід</Link>
            </div>
        )}
    </div>
}

export default Menu