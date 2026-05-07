"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS, SCROLL_SECTION, SECTION_HEADERS } from "@/lib/constants";

function extractYoutubeVideoId(href: string): string | null {
    const patterns = [/[?&]v=([^&]+)/, /youtu\.be\/([^/?]+)/, /embed\/([^/?]+)/];
    for (const re of patterns) {
        const m = href.match(re);
        if (m) return m[1];
    }
    return null;
}

function getThumbnailUrl(links: readonly { href: string }[]): string | null {
    for (const link of links) {
        if (!link.href.includes("youtube") && !link.href.includes("youtu.be")) continue;
        const id = extractYoutubeVideoId(link.href);
        if (id) return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
    }
    return null;
}

const AUTO_INTERVAL = 4000;
const CARD_WIDTH = 260;
const CARD_GAP = 16;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const WHEEL_THRESHOLD = 50;
const WHEEL_COOLDOWN = 400;
const FALLBACK_IMAGE = "/images/arcadia_banner.png";
const EASE = "cubic-bezier(0.4,0,0.2,1)";

export default function Projects() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const wheelAccum = useRef(0);
    const lastWheelTime = useRef(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const goNext = useCallback(() => setIndex((i) => (i + 1) % PROJECTS.length), []);
    const goPrev = useCallback(() => setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length), []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            const now = Date.now();
            if (now - lastWheelTime.current < WHEEL_COOLDOWN) { e.preventDefault(); return; }
            const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
            wheelAccum.current += delta;
            if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
                e.preventDefault();
                lastWheelTime.current = now;
                if (wheelAccum.current > 0) goNext(); else goPrev();
                wheelAccum.current = 0;
            }
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [goNext, goPrev]);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(goNext, AUTO_INTERVAL);
        return () => clearInterval(id);
    }, [goNext, paused]);

    return (
        <section id="projects" className={`relative py-16 md:py-20 ${SCROLL_SECTION}`}>
            <Container>
                <SectionHeader label={SECTION_HEADERS.projects.label} title={SECTION_HEADERS.projects.title} />
                <div className="relative -mx-4 md:-mx-6">
                    <div ref={carouselRef} className="relative overflow-hidden px-4 md:px-6">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0a0612] to-transparent" aria-hidden />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0a0612] to-transparent" aria-hidden />
                        <div
                            className="flex gap-4 transition-transform duration-500 ease-out"
                            style={{
                                paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
                                paddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`,
                                transform: `translateX(-${index * CARD_STEP}px)`,
                            }}
                        >
                            {PROJECTS.map((project, i) => {
                                const thumbnailUrl = getThumbnailUrl(project.links);
                                return (
                                    <div
                                        key={`${project.title}-${i}`}
                                        className="group shrink-0 overflow-hidden rounded-sm border border-white/[0.08] bg-white/[0.03] shadow-sm transition-all duration-500 hover:border-white/30 hover:shadow-lg hover:shadow-black/40"
                                        style={{ width: CARD_WIDTH, transitionTimingFunction: EASE }}
                                        onMouseEnter={() => setPaused(true)}
                                        onMouseLeave={() => setPaused(false)}
                                    >
                                        {/* 썸네일 */}
                                        <div className="relative aspect-video w-full overflow-hidden bg-white/[0.04]">
                                            <Image
                                                src={thumbnailUrl ?? FALLBACK_IMAGE}
                                                alt=""
                                                fill
                                                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                style={{ transitionTimingFunction: EASE }}
                                                sizes="260px"
                                                unoptimized={!!thumbnailUrl}
                                            />
                                        </div>
                                        {/* 텍스트 (호버 시 grid collapse) */}
                                        <div
                                            className="grid transition-all duration-500 group-hover:[grid-template-rows:0fr]"
                                            style={{ gridTemplateRows: "1fr", transitionTimingFunction: EASE }}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-col gap-1 px-3.5 py-2">
                                                    <h3 className="text-[13px] font-semibold tracking-tight text-white line-clamp-1">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-[11px] leading-snug text-zinc-500 line-clamp-2">
                                                        {project.desc}
                                                    </p>
                                                    {project.links.length > 0 && (
                                                        <div className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5">
                                                            {project.links.map((link) => (
                                                                <a
                                                                    key={link.href + link.label}
                                                                    href={link.href}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-300"
                                                                >
                                                                    {link.icon && (
                                                                        <Image src={link.icon} alt="" width={12} height={12} className="h-3 w-3 opacity-75" />
                                                                    )}
                                                                    {link.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 z-20 flex h-12 w-8 -translate-y-1/2 items-center justify-center text-white/25 transition-colors hover:text-white/50 md:w-10"
                        aria-label="이전 프로젝트"
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-0 top-1/2 z-20 flex h-12 w-8 -translate-y-1/2 items-center justify-center text-white/25 transition-colors hover:text-white/50 md:w-10"
                        aria-label="다음 프로젝트"
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="mt-4 flex justify-center gap-1.5">
                        {PROJECTS.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === index ? "w-6 bg-white/80" : "w-1.5 bg-white/30 hover:bg-white/50"
                                }`}
                                aria-label={`프로젝트 ${i + 1}로 이동`}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
