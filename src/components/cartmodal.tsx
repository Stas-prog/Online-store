'use client'

import Image from "next/image"
import {useCartStore} from "../../src/hooks/useCartStore"
import {media as wixMedia} from "@wix/sdk"
import {useWixClient} from "../../src/hooks/useWixClient"
import {useRouter} from "next/navigation"

const CartModal = ({cartOpen}) => {

    const wixClient = useWixClient()

    const {cart, isLoading, removeItem} = useCartStore()
    console.log(cart)
    const router = useRouter()

const handleView = () => {
    router.push('/cart')
    cartOpen(prev => !prev)
}

    return (
        <div className="w-max absolute rounded-md p-4 shadow-[0_3px_10px_rgb(0,0,0,0.5)] bg-white top-16 right-0 flex flex-col gap-6 z-50">
            {!cart.lineItems
                ?
                (<div>Cart is Empty</div>) 
                :
                (<div className="bg-white">
                    <h2 className="text-xl mb-4">Кошик покупок</h2>
                    {/* LIST  */}
                    <div className="flex flex-col mt-4 gap-8">
                        {/* ITEM  */}
                        {cart.lineItems.map(item => (
                         <div className="flex gap-4" key={item._id}>
                            {item.image&&
                            <Image src={wixMedia.getScaledToFillImageUrl(item.image,72,96,{})} alt="" width={72} height={96}
                             className="object-cover rounded-md" />}
                            <div className="flex flex-col justify-between w-full ">
                                {/* TOP */}
                                <div>
                                    {/* TITLE  */}
                                    <div className="flex items-center justify-between gap-8">
                                        <h3 className="font-semibold">{item.productName?.original}</h3>
                                        <div className="rounded-sm p-1 bg-gray-50 flex items-center gap-2">
                                           {item.quantity && item.quantity>1 && <span
                                           className="text-2xs text-green-500">{item.quantity} x</span>}
                                            {item.price?.amount} грн
                                        </div>
                                    </div>
                                    {/* DESC  */}
                                    <div className="text-sm text-gray-500">
                                        {item.availability?.status}
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
                        <div className="flex items-center justify-between font-semibold mt-3">
                            <span>Разом</span>
                            <span>{cart.subtotal.amount} грн</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">
                            Lorem, ipsum dolor sit ametconsectetur
                        </p>
                        <div className="flex justify-between text-sm">
                            <button className="rounded-md px-4 py-3 ring-1 ring-gray-300" onClick={handleView}>Огляд кошика</button>
                            <button className="rounded-md px-4 py-3 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                            disabled={isLoading}>Оплата</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default CartModal