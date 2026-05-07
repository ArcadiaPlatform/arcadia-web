"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "./Container";
import { BUSINESS_INFO, COPYRIGHT, DOCS_HOME, DOCS_PAGES, FOOTER_SNS, STORE_LINK } from "@/lib/constants";

const linkMain =
    "text-xs font-medium tracking-tight text-zinc-500 transition-colors hover:text-zinc-300 sm:text-[13px]";
const linkSub =
    "text-[11px] font-normal tracking-tight text-zinc-600 transition-colors hover:text-zinc-400";
const Dot = () => <span className="select-none px-1 text-zinc-600/60" aria-hidden>·</span>;

export default function Footer() {
    const [businessInfoOpen, setBusinessInfoOpen] = useState(false);

    return (
        <footer className="mt-20">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent" />
            <Container>
                <div className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-center sm:gap-x-4 sm:gap-y-4">
                    <a
                        href={STORE_LINK.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkMain}
                    >
                        {STORE_LINK.label}
                    </a>
                    <Dot />
                    <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 sm:justify-start sm:gap-x-2">
                        <a
                            href={DOCS_HOME.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkMain}
                        >
                            {DOCS_HOME.label}
                        </a>
                        <span className="h-3.5 w-px shrink-0 self-center rounded-full bg-zinc-600/30" aria-hidden />
                        <nav className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 sm:justify-start sm:gap-x-2" aria-label="Docs 문서">
                            {DOCS_PAGES.map((page) => (
                                <a
                                    key={page.href}
                                    href={page.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkSub}
                                >
                                    {page.label}
                                </a>
                            ))}
                        </nav>
                        <span className="h-3.5 w-px shrink-0 self-center rounded-full bg-zinc-600/30" aria-hidden />
                    </div>
                    <Dot />
                    <div className="flex items-center gap-4">
                        {FOOTER_SNS.map((sns) => (
                            <a
                                key={sns.label}
                                href={sns.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${linkMain} text-zinc-600 hover:text-zinc-400 [&_img]:opacity-80 hover:[&_img]:opacity-100`}
                                aria-label={sns.label}
                            >
                                <Image src={sns.icon} alt="" width={20} height={20} className="h-5 w-5" draggable={false} />
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent" />
            <div className="mx-auto w-full max-w-[90rem] px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] font-normal tracking-wide text-zinc-600/90">
                        <span>{COPYRIGHT}</span>
                        <span className="text-zinc-700" aria-hidden>·</span>
                        <button
                            type="button"
                            onClick={() => setBusinessInfoOpen((open) => !open)}
                            className={`inline-flex items-center gap-1 transition-colors hover:text-zinc-400 ${
                                businessInfoOpen ? "text-zinc-400" : ""
                            }`}
                            aria-expanded={businessInfoOpen}
                        >
                            사업자 정보 확인
                            <span
                                className={`text-[10px] transition-transform duration-200 ${businessInfoOpen ? "rotate-180" : ""}`}
                                aria-hidden
                            >
                                ▾
                            </span>
                        </button>
                    </div>
                    {businessInfoOpen && (
                        <div className="max-w-lg text-center text-[11px] leading-relaxed text-zinc-600">
                            {BUSINESS_INFO.name} · 대표자명: {BUSINESS_INFO.representative || "-"} · 소재지: {BUSINESS_INFO.address || "-"} ·
                            사업자등록번호: {BUSINESS_INFO.businessRegistrationNumber || "-"} · 통신판매업:{" "}
                            {BUSINESS_INFO.mailOrderSalesRegistration || "-"}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
