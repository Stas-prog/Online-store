'use client'

import Image from "next/image"
import {useCartStore} from "@/hooks/useCartStore"
import {media as wixMedia} from "@wix/sdk"
import {useWixClient} from "@/hooks/useWixClient"
import {useRouter} from "next/navigation"

const Cart = () => {

    const wixClient = useWixClient()

    const {cart, isLoading, removeItem} = useCartStore()

    const router = useRouter()
    // type ItemProps = {
    //     _id: string;
    //     image: string;
    //     productName: {original: string};
    //     quantity: number;
    //     price: {amount: string};
    //     descriptionLines: any[];
    // }

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative mt-10">
            {!cart.lineItems
             ?
                <div>Cart is Empty</div> 
                :
                <div className="bg-white">
                    <h2 className="text-xl mb-4">Кошик покупок</h2>
                    {/* LIST  */}
                    <div className="flex flex-col mt-4 gap-8">
                        {/* ITEM  */}
                        {cart.lineItems.map((item: any) => (
                         <div className="flex gap-4" key={item._id}>
                            {item.image&&
                            <Image src={wixMedia.getScaledToFillImageUrl(item.image,122,166,{})} alt="" width={122} height={166}
                             className="object-cover rounded-md" />}
                            <div className="flex flex-col justify-between w-full ">
                                {/* TOP */}
                                <div>
                                    {/* TITLE  */}
                                    <div className="flex items-center justify-between gap-8">
                                        <h3 className="font-semibold">{item.productName?.original}</h3>
                                        <span className="rounded-sm p-1 bg-gray-50 flex items-center gap-2">
                                           {item.quantity&&item.quantity>1&&<div
                                           className="text-2xs text-green-500">{item.quantity} x</div>}
                                            {item.price?.amount} грн
                                            </span>
                                    </div>
                                    {/* DESC  */}
                                    <div className="flex mt-15">
                                    <div className="text-sm text-yellow-600">
                                        {item.descriptionLines[0]?.name.original}:
                                    </div>
                                    <div className="text-sm ml-7 text-violet-700">
                                        {item.descriptionLines[0]?.name?.original === 'Колір' ? item.descriptionLines[0].colorInfo?.original : item.descriptionLines[0]?.plainText?.original}
                                    </div>
                                    </div>
                                    <div className="flex">
                                    <div className="text-sm text-yellow-600">
                                        {item.descriptionLines[1]?.name.original}:
                                    </div>
                                    <div className="text-sm ml-4 text-violet-700">
                                    {item.descriptionLines[1]?.name?.original === 'Розмір' ? item.descriptionLines[1]?.plainText?.original : item.descriptionLines[1]?.colorInfo?.original}
                                    </div>
                                    </div>
                                </div>
                                {/* BOTTOM  */}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">К-сть: {item.quantity}</span>
                                    <span className="text-blue-500"
                                     onClick={()=>removeItem(wixClient, item._id!)}
                                     style={{cursor: isLoading?"not-allowed":"pointer"}}>Видалити</span>
                                </div>
                            </div>
                         </div>))}
                    </div>
                    
                    {/* BOTTOM  */}
                    <div>
                        <div className="flex items-center justify-between font-semibold mt-8 mb-6">
                            <span className="font-bold">Разом</span>
                            <span>{cart.subtotal?.amount} грн</span>
                        </div>
                        <hr></hr>
                        <div className="text-gray-500 text-sm mt-8 mb-6">
                            <strong className="font-bold">Про оплату та доставку товару:</strong>
                        <hr className="mt-2 mb-2"></hr>
                            Lorem, ipsum dolor sit ametconsectetur
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure veniam dolorum itaque, voluptates aut unde accusantium molestias? Animi quam est sed repellendus similique dolores sint. Fuga reiciendis ut quaerat nulla!

                        </div>
                        <div className="flex justify-between text-sm">
                            <button className="rounded-md px-4 py-3 ring-1 ring-gray-300"
                             onClick={()=>router.push('/homepage')}>На головну</button>
                            <button className="rounded-md px-4 py-3 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                            disabled={isLoading}>Оплата</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart