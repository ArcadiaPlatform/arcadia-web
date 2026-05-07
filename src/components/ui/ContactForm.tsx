"use client";

import { type MouseEvent } from "react";
import { CONTACT_EMAIL, CONTACT_KAKAO } from "@/lib/constants";

type KakaoSdk = {
    isInitialized: () => boolean;
    init: (key: string) => void;
    Channel?: {
        addChannel: (params: { channelPublicId: string }) => void;
    };
};

declare global {
    interface Window {
        Kakao?: KakaoSdk;
    }
}

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js";
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

const loadKakaoSdk = () => {
    if (window.Kakao) return Promise.resolve(window.Kakao);

    return new Promise<KakaoSdk>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${KAKAO_SDK_URL}"]`);

        if (existingScript) {
            existingScript.addEventListener("load", () => {
                if (window.Kakao) resolve(window.Kakao);
                else reject(new Error("Kakao SDK is not available."));
            });
            existingScript.addEventListener("error", reject);
            return;
        }

        const script = document.createElement("script");
        script.src = KAKAO_SDK_URL;
        script.async = true;
        script.onload = () => {
            if (window.Kakao) resolve(window.Kakao);
            else reject(new Error("Kakao SDK is not available."));
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

export default function ContactForm() {
    const methods = [
        {
            label: "EMAIL",
            value: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            icon: "mail",
        },
        {
            label: CONTACT_KAKAO.label,
            value: CONTACT_KAKAO.value,
            href: CONTACT_KAKAO.href,
            icon: "kakao",
        },
    ];

    const handleKakaoClick = async (e: MouseEvent<HTMLAnchorElement>) => {
        if (!KAKAO_JS_KEY || !CONTACT_KAKAO.channelPublicId) return;

        e.preventDefault();

        try {
            const Kakao = await loadKakaoSdk();
            if (!Kakao.isInitialized()) Kakao.init(KAKAO_JS_KEY);
            Kakao.Channel?.addChannel({ channelPublicId: CONTACT_KAKAO.channelPublicId });
        } catch {
            window.open(CONTACT_KAKAO.href ?? "", "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="mx-auto w-full max-w-lg border-y border-white/[0.08]">
            {methods.map((method) => {
                const isKakao = method.label === CONTACT_KAKAO.label;
                const className =
                    "flex min-h-16 w-full items-center justify-between gap-4 border-b border-white/[0.06] px-1 py-4 text-left transition-colors duration-200 last:border-b-0";
                const content = (
                    <>
                        <span className="flex min-w-0 items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/[0.08] text-zinc-400 transition-all duration-300 group-hover:border-white/20 group-hover:text-white group-hover:scale-110">
                                {method.icon === "mail" ? (
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                        <path d="M4 6.5h16v11H4z" />
                                        <path d="m4.5 7 7.5 6 7.5-6" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
                                        <path
                                            d="M16 6.5c-6 0-10.5 3.8-10.5 8.4 0 3 2 5.6 5.1 7l-.7 3.6 4-2.3c.7.1 1.4.2 2.1.2 6 0 10.5-3.8 10.5-8.5S22 6.5 16 6.5Z"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </span>
                            <span className="flex min-w-0 flex-col items-start gap-0">
                                <span className="text-[10px] font-semibold leading-tight tracking-[0.08em] text-zinc-500 transition-colors duration-200 group-hover:text-zinc-400">{method.label}</span>
                                {method.value && <span className="min-w-0 break-all text-left text-sm font-medium leading-tight text-zinc-200 transition-colors duration-200 group-hover:text-white">{method.value}</span>}
                            </span>
                        </span>
                        <span className="shrink-0 text-lg leading-none text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" aria-hidden="true">
                            ↗
                        </span>
                    </>
                );

                return (
                    <a
                        key={method.label}
                        href={method.href}
                        target={isKakao ? "_blank" : undefined}
                        rel={isKakao ? "noopener noreferrer" : undefined}
                        onClick={isKakao ? handleKakaoClick : undefined}
                        className={`${className} group hover:text-white`}
                    >
                        {content}
                    </a>
                );
            })}
        </div>
    );
}
