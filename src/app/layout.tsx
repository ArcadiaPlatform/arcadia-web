import { Metadata } from "next";
import "./globals.css";
import { notoSansKR } from "@/app/font";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { PAGE_TITLE } from "@/lib/constants";

export const metadata: Metadata = {
    title: PAGE_TITLE,
    description: "ARCADIA는 마인크래프트를 중심으로 다양한 디지털 리소스를 제작합니다.",
    metadataBase: new URL("https://acda.kr"),
    icons: {
        icon: "icons/favicon.ico",
    },
    openGraph: {
        title: PAGE_TITLE,
        description: "ARCADIA는 마인크래프트를 중심으로 다양한 디지털 리소스를 제작합니다.",
        url: "https://acda.kr",
        siteName: "ARCADIA",
        images: [
            {
                url: "/images/arcadia_banner.png",
                width: 1200,
                height: 630,
                alt: "ARCADIA",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: PAGE_TITLE,
        description: "ARCADIA는 마인크래프트를 중심으로 다양한 디지털 리소스를 제작합니다.",
        images: ["/images/arcadia_banner.png"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={notoSansKR.variable} suppressHydrationWarning>
            <body className="relative flex min-h-dvh w-full flex-col overflow-x-hidden bg-[#0a0612] text-white antialiased font-sans select-none">
                <LoadingScreen />
                <Navbar />
                <main className="min-w-0 flex-1 w-full max-w-full overflow-x-hidden pt-20">{children}</main>
                <Footer />
            </body>
        </html>
    );
}