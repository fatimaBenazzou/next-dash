import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "example.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
            },
        ],
    },
};

export default nextConfig;
