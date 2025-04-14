import Link from "next/link"
import Image from "next/image"
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./pagination";


const ProductList = async ({ categoryId, limit, searchParams }: { categoryId: string; limit?: number; searchParams?: any; }) => {

    const per_page = 8

    const wixClient = await wixClientServer()

    let searchPar = await searchParams
        const name = searchPar?.name
        const productType = searchPar?.type
        const priceMin = searchPar?.min
        const priceMax = searchPar?.max
        const productSort = searchPar?.sort
        const page = searchPar?.page



    if (productSort) {
        const [sortType, sortBy] = productSort.split(" ")

        if (sortType === "asc") {
            const res = await wixClient.products
                .queryProducts()
                .startsWith("name", name || "")
                .eq("collectionIds", categoryId)
                .hasSome("productType", productType ? [productType] : ["physical", "digital"])
                .gt("priceData.price", priceMin || 0)
                .lt("priceData.price", priceMax || 9999)
                .limit(limit || per_page)
                .ascending(sortBy)
                .skip(page ? parseInt(page) * (limit || per_page) : 0)
                .find()

            return <div className="flex justify-between gap-x-8 gap-y-16 flex-wrap">
                {res.items.map((product: products.Product) => {
                    return (
                        <Link href={"/" + product._id} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]" key={product._id}>
                            <div className="w-full relative h-80 ">
                                <Image src={product.media?.mainMedia?.image?.url || "/product.png"} alt="" fill sizes="25vw" className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500" />
                                {product.media?.items && <Image src={product.media?.items[1]?.image?.url || "/product.png"}
                                    alt="" fill sizes="25vw" className="absolute object-cover rounded-md" />
                                }
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">{product.name}</span>
                                <span className="font-semibold">{product.price?.price} грн</span>
                            </div>
                            <div className="text-sm text-gray-500"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((product.additionalInfoSections?.find((section: any) => section.title === 'Короткий опис')?.description || "")) }}>

                            </div>
                            <button className="rounded-2xl ring-1 ring-z text-z w-max py-2 px-4 text-xs hover:bg-z hover:text-white">Додати в кошик</button>
                        </Link>)

                })}
                <Pagination currentPage={res.currentPage || 0} hasPrev={res.hasPrev()} hasNext={res.hasNext()} />
            </div>
        }
        if (sortType === "desc") {
            const res = await wixClient.products
                .queryProducts()
                .startsWith("name", name || "")
                .eq("collectionIds", categoryId)
                .hasSome("productType", productType ? [productType] : ["physical", "digital"])
                .gt("priceData.price", priceMin || 0)
                .lt("priceData.price", priceMax || 9999)
                .limit(limit || per_page)
                .descending(sortBy)
                .skip(page ? parseInt(page) * (limit || per_page) : 0)
                .find()

            return <div className="flex justify-between gap-x-8 gap-y-16 flex-wrap">
                {res.items.map((product: products.Product) => {
                    return (
                        <Link href={"/" + product._id} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]" key={product._id}>
                            <div className="w-full relative h-80 ">
                                <Image src={product.media?.mainMedia?.image?.url || "/product.png"} alt="" fill sizes="25vw" className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500" />
                                {product.media?.items && <Image src={product.media?.items[1]?.image?.url || "/product.png"}
                                    alt="" fill sizes="25vw" className="absolute object-cover rounded-md" />
                                }
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">{product.name}</span>
                                <span className="font-semibold">{product.price?.price} грн</span>
                            </div>
                            <div className="text-sm text-gray-500"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((product.additionalInfoSections?.find((section: any) => section.title === 'Короткий опис')?.description || "")) }}>

                            </div>
                            <button className="rounded-2xl ring-1 ring-z text-z w-max py-2 px-4 text-xs hover:bg-z hover:text-white">Додати в кошик</button>
                        </Link>)
                })}
                <Pagination currentPage={res.currentPage || 0} hasPrev={res.hasPrev()} hasNext={res.hasNext()} />
            </div>
        }

    } else {
        const res = await wixClient.products
            .queryProducts()
            .startsWith("name", name || "")
            .eq("collectionIds", categoryId)
            .hasSome("productType", productType ? [productType] : ["physical", "digital"])
            .gt("priceData.price", priceMin || 0)
            .lt("priceData.price", priceMax || 9999)
            .limit(limit || per_page)
            .skip(page ? parseInt(page) * (limit || per_page) : 0)
            .find()

        return <div className="flex justify-between gap-x-8 gap-y-16 flex-wrap">
            {res.items.map((product: products.Product) => {
                return (
                    <Link href={"/" + product._id} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]" key={product._id}>
                        <div className="w-full relative h-80 ">
                            <Image src={product.media?.mainMedia?.image?.url || "/product.png"} alt="" fill sizes="25vw" className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500" />
                            {product.media?.items && <Image src={product.media?.items[1]?.image?.url || "/product.png"}
                                alt="" fill sizes="25vw" className="absolute object-cover rounded-md" />
                            }
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">{product.name}</span>
                            <span className="font-semibold">{product.price?.price} грн</span>
                        </div>
                        <div className="text-sm text-gray-500"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((product.additionalInfoSections?.find((section: any) => section.title === 'Короткий опис')?.description || "")) }}>

                        </div>
                        <button className="rounded-2xl ring-1 ring-z text-z w-max py-2 px-4 text-xs hover:bg-z hover:text-white">Додати в кошик</button>
                    </Link>)

            })}
            <Pagination currentPage={res.currentPage || 0} hasPrev={res.hasPrev()} hasNext={res.hasNext()} />
        </div>
    }
}
export default ProductList