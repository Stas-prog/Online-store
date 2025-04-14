'use server'

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";

export const wixClientServer = async () => {

    async function getCookieData() {
        const cookieData = await cookies()
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve(cookieData)
          }, 1000)
        )
      }
       
    
    let refreshToken

    try {
        const cookieStore: any = await getCookieData()
        if(cookieStore){
             refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}")
 }
    } catch (e) {
        console.log(e)
    }

    const wixClient = createClient({
        modules: {
            products,
            collections,
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
                refreshToken,
                accessToken: {
                    value: "",
                    expiresAt: 0,
                },

            },
        }),
    });
    return wixClient
}