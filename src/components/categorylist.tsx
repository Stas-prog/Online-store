import Link from "next/link"
import Image from "next/image"
import { wixClientServer } from "@/lib/wixClientServer"


const CategoryList = async () => {

    const wixClient = await wixClientServer()

    const categorys = await wixClient.collections.queryCollections().find()
    
    return (
        <div className="px-4 overflow-x-scroll scrollbar-hide">
            <div className="flex gap-4 md:gap-8">
                {categorys.items.map((item) => (
                    < Link href={`/list?cat=${item.slug}`} className = "flex-shrink-0 w-full sm:w-1/2 md:w-1/4 lg:w-1/6" key={item._id}>
                        <div className="relative w-full bg-slate-100 h-96">
                            <Image src={item.media?.mainMedia?.image?.url || "/women.png"} alt="" fill sizes="20vw" className="object-cover" />
                        </div>
                        <h1 className="mt-8 font-light text-cl tracking-wide">{item.name}</h1>
                    </Link>)
                )
                }
            </div>
        </div >
    )
}

export default CategoryList