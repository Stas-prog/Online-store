'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

const slides = [
    {
        id: 1,
        title: 'Літня колекція',
        description: 'SALE! Знижки до 50%!',
        img: 'https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=600',
        url: '/',
        bg: 'bg-gradient-to-r from-yellow-50 to-pink-50',
    },
    {
        id: 2,
        title: 'Зимова колекція',
        description: 'SALE! Знижки до 50%!',
        img: 'https://images.pexels.com/photos/1187954/pexels-photo-1187954.jpeg?auto=compress&cs=tinysrgb&w=600',
        url: '/',
        bg: 'bg-gradient-to-r from-pink-50 to-blue-50',
    },
    {
        id: 3,
        title: 'Весняна колекція',
        description: 'SALE! Знижки до 50%!',
        img: 'https://images.pexels.com/photos/932401/pexels-photo-932401.jpeg?auto=compress&cs=tinysrgb&w=600',
        url: '/',
        bg: 'bg-gradient-to-r from-blue-50 to-yellow-50',
    },
]

const Slider = () => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(
            () => { setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1) }, 3000
        )
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden relative">
            <div className="w-max h-full flex transition-all easy-in-out duration-1000"
                style={{ transform: `translateX(-${current * 100}vw)` }}>
                {slides.map((slide) => (
                    <div key={slide.id} className={`${slide.bg} w-screen h-full flex flex-col gap-16 lg:flex-row`}>
                        {/*  TEXT */}
                        <div className="h-1/2 lg:w-1/2 lg:h-full flex flex-col items-center justify-center gap-8 lg:gap-16 2xl:gap-20 text-center">
                            <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
                            <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">{slide.title}</h1>
                            <Link href="/list">
                                <button className="rounded-md bg-black text-white py-3 px-4">SHOP NOW</button>
                            </Link>
                        </div>
                        {/*  SLIDE */}
                        <div className="h-1/2 lg:w-1/2 lg:h-full relative">
                            <Image src={slide.img} alt="" fill sizes="100%" className="object-cover"></Image>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
                {slides.map((slide, index) =>
                    <div onClick={() => setCurrent(index)}
                        key={slide.id}
                        className={`w-3 h-3 rounded-full cursor-pointer ring-1 ring-gray-600
                                      flex justify-center items-center ${current === index ? "scale-150" : ""}`}>
                        {current === index && <div className="w-[6px] h-[6px] rounded-full bg-gray-600"
                        ></div>}
                    </div>)}
            </div>
        </div >
    )
}

export default Slider
