import Add from "@/components/add"
import CustomProduct from "@/components/customproduct"
import ProductImages from "@/components/productimages"
import { wixClientServer } from "@/lib/wixClientServer"
import { notFound } from "next/navigation"



const SinglePage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const wixClient = await wixClientServer()
    const { id } = await params
    const products = await wixClient.products
        .queryProducts()
        .eq("_id", id)
        .find();

    if (!products.items[0]) {
        return notFound()
    }

    const product = products.items[0]

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px64 flex flex-col lg:flex-row gap-16 relative">
            {/* IMAGES  */}
            <div className="w-full lg:w-1/2 lg:sticky h-max top-20">
                <ProductImages items={product?.media?.items} />
            </div>
            {/* TEXTS  */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 mt-7">
                <h1 className="text-4xl font-medium">{product.name}</h1>
                <p className="text-gray-500">{product.description}</p>
                <div className="h-[2px] bg-gray-300"></div>
                {product.price?.price === product.price?.discountedPrice ?
                    (<h2 className="text-2xl font-medium">{product.price?.price} грн</h2>) :
                    (<div className="flex items-center gap-4">
                        <h3 className="text-xl text-gray-500 line-through">{product.price?.price} грн</h3>
                        <h2 className="text-2xl font-medium">{product.price?.discountedPrice} грн</h2>
                    </div>)
                }
                <div className="h-[2px] bg-gray-300"></div>
                {product.variants && product.productOptions ?
                    <CustomProduct productId={product._id!} variants={product.variants} productOptions={product.productOptions} />
                    :
                    <Add productId={product._id!} variantId="00000000-0000-0000-0000-000000000000" stockNumber={product.stock?.quantity || 0} />}
                <div className="h-[2px] bg-gray-300"></div>
                {product.additionalInfoSections?.map((section: any) => (
                    <div className="text-sm" key={section.title}>
                        <h4 className="font-medium mb-4">{section.title}</h4>
                        <p className="">{section.description}</p>
                    </div>)
                )}

            </div>
        </div>
    )
}

export default SinglePage