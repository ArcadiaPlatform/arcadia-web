"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { blackOpsOne } from "@/lib/font";
import { DISCORD_INVITE, HERO_TAGLINE, LOGO_PATHS, SITE_NAME } from "@/lib/constants";

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });

        const t = setTimeout(() => setVisible(false), 2800);
        // 로고 0.7s 대기 + 텍스트 1.6s 완성 = 2.3s, 여유 0.5s 후 페이드아웃
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!visible) return;

        const html = document.documentElement;
        const { overflow: previousHtmlOverflow, overscrollBehavior: previousHtmlOverscroll } = html.style;
        const {
            overflow: previousBodyOverflow,
            overscrollBehavior: previousBodyOverscroll,
            position: previousBodyPosition,
            width: previousBodyWidth,
        } = document.body.style;

        const preventScroll = (e: Event) => e.preventDefault();

        html.style.overflow = "hidden";
        html.style.overscrollBehavior = "none";
        document.body.style.overflow = "hidden";
        document.body.style.overscrollBehavior = "none";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";

        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });

        return () => {
            html.style.overflow = previousHtmlOverflow;
            html.style.overscrollBehavior = previousHtmlOverscroll;
            document.body.style.overflow = previousBodyOverflow;
            document.body.style.overscrollBehavior = previousBodyOverscroll;
            document.body.style.position = previousBodyPosition;
            document.body.style.width = previousBodyWidth;
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
        };
    }, [visible]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0612] transition-opacity duration-500 ease-out ${
                visible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            {/* Hero와 동일한 레이아웃·위치·크기: 로고가 구성된 뒤 페이드아웃 시 Hero 로고와 겹쳐 이어짐 */}
            <div className="relative pt-20 flex flex-col items-center px-6 text-center">
                <div className="relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden md:mb-5 md:h-36 md:w-36">
                    <Image
                        src={LOGO_PATHS.clear}
                        alt={SITE_NAME}
                        width={144}
                        height={144}
                        className="h-24 w-24 object-contain md:h-36 md:w-36"
                        style={{
                            animation: "loading-logo-form 1s cubic-bezier(0.33, 1, 0.68, 1) forwards",
                        }}
                    />
                </div>
                <h1 className={`${blackOpsOne.className} relative overflow-visible text-5xl tracking-tight text-white md:text-7xl`}>
                    {SITE_NAME.split("").map((char, i) => (
                        <span
                            key={i}
                            style={{
                                display: "inline-block",
                                animation: `loading-letter-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.6 + i * 0.1}s both`,
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>
                <p className="invisible -mt-0.5 max-w-md text-base text-zinc-500 md:mt-0 md:text-lg">{HERO_TAGLINE}</p>
                <div className="invisible mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6">
                    <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
                        <span className="h-4 w-4" />
                        {DISCORD_INVITE.buttonLabel}
                    </span>
                </div>
            </div>
        </div>
    );
}
