'use server'

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";

async function getCookieData() {
    const cookieStore = await cookies()
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(cookieStore)
      }, 1000)
    )
  }


export const wixClientServer = async () => {
    
    let refreshToken

    try {
        const cookieStore = await getCookieData()
        refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}")
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