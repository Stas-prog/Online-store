'use client'

import { useState } from "react"
import { useWixClient } from "../../src/hooks/useWixClient"
import { useCartStore } from "../../src/hooks/useCartStore"


const Add = ({ productId, variantId, stockNumber }: { productId: string, variantId: string, stockNumber: number }) => {
    const [quantity, setQuantity] = useState(1)

    const wixClient = useWixClient()

    const handleQuont = (type: 'i' | 'd') => {
        if (type === 'i' && quantity < stockNumber) {
            setQuantity(prev => prev + 1)
        }
        if (type === 'd' && quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const { addItem, isLoading } = useCartStore()

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Вибрати кіль-ть</h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className=" bg-gray-200 rounded-3xl px-4 py-2 flex items-center justify-between w-32">
                        <button className="cursor-pointer text-xl" onClick={() => handleQuont('d')}>-</button>
                        {quantity}
                        <button className="cursor-pointer text-xl" onClick={() => handleQuont('i')}>+</button>
                    </div>
                    {stockNumber < 1 ?
                        (<div className="text-sm">Товар відсутній</div>) :
                        (<div className="text-sm">Лише <span className="text-orange-500">{stockNumber - quantity} штук</span> залишилося!
                            <br />Не прогав!
                        </div>)}
                </div>
                <button
                    className="w-40 text-sm font-semibold rounded-3xl ring-1 ring-z text-z py-2 px-4 hover:bg-z
             hover:text-white disabled:cursor-not-allowed disabled:bg-pink-300 disabled:ring-0 disabled:ring-none disabled:text-white"
                    onClick={() => addItem(wixClient, productId, variantId, quantity)}
                    disabled={isLoading}>
                    Додати в кошик
                </button>
            </div >
        </div >
    )
}

export default Add