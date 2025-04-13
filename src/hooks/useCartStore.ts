import { create } from 'zustand'
import {carentCart} from "@wix/ecom"

type CartState = {
cart: curentCart.Cart,
isLoading: boolean,
counter: number,
getCart:(wixClient: wixClient) => void,
addItem:(wixClient: wixClient, productId: string, variantId: string, quantity: number ) => void,
removeItem:(wixClient: wixClient, itemId: string) => void
}


export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  counter: 0,
  getCart: async(wixClient) => { 
    const cart = await wixClient.currentCart.getCurrentCart()
    set({cart: cart||[], isLoading: false, counter: cart?.lineItems.length || 0})
  },
  addItem: async(wixClient, productId, variantId, quantity) => {
    set((state) => ({...state, isLoading:true}))
    const response = await wixClient.currentCart.addToCurrentCart({
        lineItems:[
            {
                catalogReference:{
                    appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
                    catalogItemId:productId,
                    ...(variantId&&{options:{variantId}})
                },
                quantity
            }
        ]
    });
    set(
        {
            cart: response.cart,
            counter: response.cart?.lineItems.length,
            isLoading: false
        }
    )
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({...state, isLoading:true}))
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
    set(
        {
            cart: response.cart,
            counter: response.cart?.lineItems.length,
            isLoading: false
        }
    )
  }
}))



