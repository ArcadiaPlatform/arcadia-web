"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";
import { blackOpsOne } from "@/app/font";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
    DISCORD_INVITE,
    DOCS_HOME,
    DOCS_PAGES,
    FOOTER_SNS,
    LOGO_PATHS,
    NAV_ITEMS,
    NAVBAR_LABELS,
    SCROLL_THRESHOLD,
    SITE_NAME,
    STORE_LINK,
    TEAM_NAME,
} from "@/lib/constants";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const activeId = useActiveSection();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY >= SCROLL_THRESHOLD);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);


    const headerHeight = scrolled ? "4rem" : "5rem";

    const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
    };

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between overflow-hidden border-b border-white/[0.06] bg-black/80 px-4 backdrop-blur-xl md:overflow-visible md:px-6"
                style={{
                    height: headerHeight,
                    transition: "height 0.15s ease-out",
                }}
            >
                <Link
                    href="/"
                    className="group flex items-center gap-2"
                    style={{
                        transform: scrolled ? "scale(0.9)" : "scale(1)",
                        transition: "transform 0.15s ease-out",
                    }}
                    onClick={(e) => {
                        if (window.location.pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                >
                    <Image
                        src={LOGO_PATHS.main}
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0 opacity-90 transition-transform duration-300 group-hover:scale-110"
                        alt={`${SITE_NAME} Logo`}
                        draggable={false}
                    />
                    <span className={`${blackOpsOne.className} text-lg tracking-[0.02em] text-white transition-[letter-spacing] duration-300 group-hover:tracking-[0.08em]`}>
                        {SITE_NAME}
                    </span>
                </Link>

                <div className="flex items-center gap-2 md:gap-4">
                    <nav
                        className="hidden md:flex items-center gap-3 md:gap-6"
                        style={{
                            opacity: scrolled ? 0 : 1,
                            pointerEvents: scrolled ? "none" : "auto",
                            transition: "opacity 0.15s ease-out",
                        }}
                        aria-label={NAVBAR_LABELS.mainMenu}
                    >
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeId === item.sectionId;
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleSectionClick(e, item.sectionId)}
                                    className={`group/link relative shrink-0 px-3 py-2 text-sm font-bold whitespace-nowrap transition-all duration-200 hover:text-white ${
                                        isActive ? "text-white" : "text-white/70"
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute bottom-1 left-3 right-3 h-px rounded-full bg-white transition-transform duration-200 ${
                                            isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-60 group-hover/link:scale-x-100"
                                        }`}
                                    />
                                </a>
                            );
                        })}
                    </nav>
                    {/* 스크롤 시 햄버거 옆에 가입하기 + Store + Docs */}
                    <div
                        className="hidden md:flex items-center gap-2 overflow-hidden transition-all duration-200"
                        style={{
                            maxWidth: scrolled ? 340 : 0,
                            opacity: scrolled ? 1 : 0,
                            pointerEvents: scrolled ? "auto" : "none",
                        }}
                    >
                        <a
                            href={DISCORD_INVITE.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#5865F2] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#4752C4]"
                        >
                            <Image src="/icons/discord.svg" alt="" width={14} height={14} className="h-3.5 w-3.5 opacity-95" />
                            {DISCORD_INVITE.buttonLabel}
                        </a>
                        <a
                            href={STORE_LINK.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-violet-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg shadow-violet-900/20 transition-colors hover:bg-violet-800"
                        >
                            <Image src="/icons/arcadia_logo_clear.svg" alt="" width={13} height={13} className="h-[13px] w-[13px] opacity-90" />
                            구매하기
                        </a>
                        <a
                            href={DOCS_HOME.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[13px] w-[13px] opacity-80" aria-hidden><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                            가이드북
                        </a>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-visible rounded-lg text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        aria-label={open ? NAVBAR_LABELS.closeMenu : NAVBAR_LABELS.openMenu}
                        aria-expanded={open}
                    >
                        <span className="relative block h-7 w-7 overflow-visible md:h-8 md:w-8">
                            <svg
                                className="absolute inset-0 m-auto h-7 w-7 md:h-8 md:w-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                            >
                                <line
                                    x1="6"
                                    y1="8"
                                    x2="18"
                                    y2="8"
                                    className={`transition-all duration-300 ease-out ${open ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}
                                />
                                <line x1="6" y1="12" x2="18" y2="12" />
                                <line
                                    x1="6"
                                    y1="16"
                                    x2="18"
                                    y2="16"
                                    className={`transition-all duration-300 ease-out ${open ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"}`}
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-40 overflow-hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            />
            <nav
                className={`fixed right-0 bottom-0 z-40 flex w-80 flex-col overflow-y-auto overflow-x-hidden overscroll-contain border-l border-white/[0.06] bg-zinc-950/98 shadow-[-8px_0_24px_-8px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-[transform,top] duration-300 ease-out ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                    top: headerHeight,
                    transition: "transform 0.3s ease-out, top 0.15s ease-out",
                }}
                aria-label={scrolled ? NAVBAR_LABELS.mainMenu : NAVBAR_LABELS.moreMenu}
            >
                <div className="flex min-h-0 flex-1 flex-col p-5">
                    {scrolled && (
                        <section className="mb-6 overflow-hidden border-b border-white/[0.06] pb-5" aria-label="메인 메뉴">
                            <ul className="space-y-0.5" role="list">
                                {NAV_ITEMS.map((item, i) => {
                                    const isActive = activeId === item.sectionId;
                                    return (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleSectionClick(e, item.sectionId)}
                                                className={`flex items-center rounded-lg px-4 py-3 text-[14px] font-semibold transition-colors duration-200 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                                                    open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                                                } ${isActive ? "bg-white/10 text-white" : "text-white/75"}`}
                                                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}
                    <section
                        className={`flex-1 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                        style={{ transitionDelay: open ? "200ms" : "0ms" }}
                        aria-label={NAVBAR_LABELS.moreMenu}
                    >
                        <p className="mb-2.5 px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                            {NAVBAR_LABELS.moreMenu}
                        </p>
                        <ul className="space-y-0.5" role="list">
                            <li>
                                <a
                                    href={STORE_LINK.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center rounded-lg px-4 py-2 text-[13px] font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                                >
                                    {STORE_LINK.label}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={DOCS_HOME.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center rounded-lg px-4 py-2 text-[13px] font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                                >
                                    {DOCS_HOME.label}
                                </a>
                                <ul className="mt-0.5 border-l border-white/[0.08] pl-3 ml-4 space-y-0.5" role="list">
                                    {DOCS_PAGES.map((item) => (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setOpen(false)}
                                                className="block rounded-md py-1.5 pl-2.5 pr-3 text-[11px] font-normal text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <footer className="mt-auto border-t border-white/[0.06] pt-5">
                        <div
                            className={`transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                            style={{ transitionDelay: open ? "280ms" : "0ms" }}
                        >
                            <div className="flex items-center gap-2 px-4">
                                {FOOTER_SNS.map((item) => (
                                    <a
                                        key={item.icon}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setOpen(false)}
                                        className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                                        aria-label={item.label}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            width={20}
                                            height={20}
                                            className="h-5 w-5"
                                            draggable={false}
                                        />
                                    </a>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-2 px-4">
                                <Image
                                    src={LOGO_PATHS.clearZinc}
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="h-4 w-4 opacity-80"
                                    draggable={false}
                                />
                                <span className="text-[11px] font-medium tracking-wide text-zinc-600">
                                    {TEAM_NAME}
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
            </nav>
        </>
    );
}
