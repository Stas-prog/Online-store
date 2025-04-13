import {createClient, OAuthStrategy} from "@wix/sdk"
import {NextRequest, NextResponse} from "next/server" 


export const middleware = async (request: NextRequest) => {
    if(!request.cookies.get("session")) {
        const response = NextResponse.next()
        const wixClient=createClient({
            auth: OAuthStrategy({clientId:process.env.NEXT_PUBLIC_WIX_CLIENT_ID!})
        })
        response.cookies.set("session", JSON.stringify(await wixClient.auth.generateVisitorTokens()))
              
        console.log(response)

        return response
    }
}