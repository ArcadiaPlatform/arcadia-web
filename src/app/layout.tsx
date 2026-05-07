import { Metadata } from "next";
import "./globals.css";
import { notoSansKR } from "@/app/font";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { PAGE_TITLE } from "@/lib/constants";

export const metadata: Metadata = {
    title: PAGE_TITLE,
    icons: {
        icon: "icons/favicon.ico",
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