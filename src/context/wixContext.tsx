'use client'

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie"
import { createContext, ReactNode } from "react";

const {refreshToken, accessToken} = JSON.parse(Cookies.get("session") || "{}")
    

const wixClient = createClient(
    {
    
    modules: {
        products,
        collections,
        currentCart
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
            refreshToken: {
                value: ""
            },

            accessToken: {
                value: "",
                expiresAt: 0,
            },
            
        },
    }),
});
console.log(refreshToken)
console.log(accessToken)
wixClient.auth.setTokens({refreshToken, accessToken})
Cookies.set("refreshToken", JSON.stringify(refreshToken), { expires: 2 })

export type WixClient = typeof wixClient
export const WixClientContext = createContext<WixClient>(wixClient)

export const WixClientContextProvider = ({ children, }: { children: React.ReactNode; }) => {
    return (
        <WixClientContext.Provider value={wixClient}>
            {children}
        </WixClientContext.Provider>
    )
}
