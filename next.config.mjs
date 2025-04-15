import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
env: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    FEATURED_PRODUCTS_CATEGORY_ID: process.env.FEATURED_PRODUCTS_CATEGORY_ID,
    NEXT_PUBLIC_WIX_APP_ID: process.env.NEXT_PUBLIC_WIX_APP_ID
}

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "st2.depositphotos.com",
            },
            {
                protocol: "https",
                hostname: "static.wixstatic.com",
            }
        ]
    }
};

export default nextConfig;
