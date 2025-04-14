import Image from "next/image"
import Filter from "@/components/filter"
import ProductList from "@/components/productlist"
import { wixClientServer } from "@/lib/wixClientServer"
// import { Suspense } from "react"

export const dynamic = 'force-dynamic'


const ListPage = async ({ searchParams }: { searchParams: any }) => {

    const wixClient = await wixClientServer()

    let searchPar = await searchParams

    const category = searchPar.cat

    const cats = await wixClient.collections.getCollectionBySlug(category || "all-products")

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative mt-10">
            {/* SALE */}
            <div className="bg-pink-200 px-4 hidden sm:flex justify-between h-64">
                <div className="w-2/3 flex flex-col items-center justify-center gap-8">
                    <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">Отримай до 50% знижки
                        <br />на вибрані товари
                    </h1>
                    <button className="rounded-3xl text-sm py-3 px-5 bg-z text-white w-max ">Дивитися зараз</button>
                </div>
                <div className="relative w-1/3">
                    <Image src="/woman.png" alt="" fill className="object-contain" />
                </div>
            </div>
            {/* FILTER  */}
            <Filter />
            {/* PRODUCTS  */}
            <h1 className="mt-12 text-xl font-semibold">{cats.collection?.name} для тебе!</h1>
            {/* <Suspense fallback={"loading..."}> */}
                <ProductList categoryId={cats.collection?._id || "00000000-000000-000000-000000000001"}
                    searchParams={searchParams} />
            {/* </Suspense> */}
        </div>
    )
}

export default ListPage