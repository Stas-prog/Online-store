'use client'

import { useState } from "react"
import Image from "next/image"


const ProductImages = ({ items }: { items: any }) => {
    const [index, setIndex] = useState(0)

    return (
        <div className="mt-4">
            <div className="h-[370px] relative">
                <Image src={items[index].image?.url} alt="" fill sizes="50vw" className="rounded-md object-cover" />
            </div>
            <div className="flex justify-between gap-4">
                {items.map((item: any, i: number) => (
                    <div className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer" key={item._id} onClick={() => setIndex(i)}>
                        <Image src={item.image?.url} alt="" fill sizes="30vw" className="rounded-md object-cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductImages