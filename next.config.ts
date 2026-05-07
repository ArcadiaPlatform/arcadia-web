import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: { unoptimized: true },
    trailingSlash: true,

    async redirects() {
        return [
            {
                source: "/discord",
                destination: "https://discord.gg/NanAFkRdww",
                permanent: false,
            },
            {
                source: "/github",
                destination: "https://github.com/TeamArcadia",
                permanent: false,
            },
            {
                source: "/youtube",
                destination: "https://www.youtube.com/@Arcadia-Team",
                permanent: false,
            },
            {
                source: "/kakaotalk",
                destination: "https://pf.kakao.com/_xczgxbX",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;