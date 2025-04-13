import ProductList from "@/components/productlist"
import { wixClientServer } from "@/lib/wixClientServer"
import { Suspense } from "react"



const NewProdList = async ({searchParams}: {searchParams?: any}) => {

    const wixClient = await wixClientServer()

    const cats = await wixClient.collections.getCollectionBySlug("нові-товари")
console.log(cats)

    return (
        <div className = "mt-3">
            <Suspense fallback={"loading..."}>
                <ProductList categoryId={cats.collection?._id || "00000000-000000-000000-000000000001"} limit={4} searchParams={searchParams}/>
            </Suspense>
        </div>
    )
}

export default NewProdList