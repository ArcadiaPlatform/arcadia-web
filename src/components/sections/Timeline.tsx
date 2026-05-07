"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { SCROLL_SECTION, SECTION_HEADERS, TIMELINE } from "@/lib/constants";

export default function Timeline() {
    const { ref, inView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -18% 0px", triggerOnce: false });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const contentClass =
        "flex min-h-32 w-full flex-col justify-center border border-white/[0.08] bg-white/[0.025] px-5 py-4 transition-colors duration-200 ease-out group-hover/card:border-white/[0.14] group-hover/card:bg-white/[0.045]";
    const contentWrapClass =
        "w-[98%] origin-center transition-all duration-700 ease-out md:w-[94%]";

    return (
        <section id="timeline" className={`relative py-24 md:py-32 ${SCROLL_SECTION}`}>
            <Container>
                <div className="mx-auto max-w-4xl">
                    <SectionHeader label={SECTION_HEADERS.timeline.label} title={SECTION_HEADERS.timeline.title} />
                    <div ref={ref} className="relative">
                        <div
                            className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-px origin-top bg-gradient-to-b from-white/20 via-white/10 to-white/15 transition-transform duration-1000 ease-out ${
                                inView ? "scale-y-100" : "scale-y-0"
                            }`}
                        />

                        <div className="space-y-0">
                            {TIMELINE.map((item, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <div
                                        key={item.year}
                                        className="relative flex origin-center cursor-default items-center gap-0 py-3 pb-16 transition-all duration-200 ease-out last:pb-0"
                                    >
                                        <div
                                            className={`flex flex-1 flex-col pr-8 md:pr-12 ${
                                                isLeft ? "items-end text-right" : "items-start text-left"
                                            }`}
                                        >
                                            {isLeft && (
                                                <div
                                                    className={`group/card ${contentWrapClass}`}
                                                    onMouseEnter={() => setHoveredIndex(i)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                    style={{
                                                        opacity: inView ? 1 : 0,
                                                        transform: inView
                                                            ? `translateX(0) scale(${hoveredIndex === i ? 1.02 : 1})`
                                                            : "translateX(-3rem) scale(1)",
                                                        transitionDelay: inView && hoveredIndex === null ? `${i * 80}ms` : "0ms",
                                                    }}
                                                >
                                                    <span className="block text-[11px] font-medium tabular-nums tracking-[0.15em] text-zinc-500 transition-colors duration-200 group-hover/card:text-zinc-300">
                                                        {item.year}
                                                    </span>
                                                    <div className={`mt-2 ${contentClass}`}>
                                                        <h3 className="text-base font-semibold tracking-tight text-white transition-[filter] duration-200 group-hover/card:drop-shadow-[0_0_10px_rgba(255,255,255,0.12)]">
                                                            {item.title}
                                                        </h3>
                                                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 transition-colors duration-200 group-hover/card:text-zinc-300">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full border-2 bg-[#0a0612] transition-all duration-150 ease-out ${
                                                    hoveredIndex === i
                                                        ? "border-white bg-white/15 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                                                        : "border-white/30"
                                                }`}
                                                style={{
                                                    opacity: inView ? 1 : 0,
                                                    transform: `scale(${inView ? (hoveredIndex === i ? 1.4 : 1) : 0})`,
                                                    transitionDelay: inView && hoveredIndex === null ? `${120 + i * 80}ms` : "0ms",
                                                }}
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col items-start pl-8 text-left md:pl-12">
                                            {!isLeft && (
                                                <div
                                                    className={`group/card ${contentWrapClass}`}
                                                    onMouseEnter={() => setHoveredIndex(i)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                    style={{
                                                        opacity: inView ? 1 : 0,
                                                        transform: inView
                                                            ? `translateX(0) scale(${hoveredIndex === i ? 1.02 : 1})`
                                                            : "translateX(3rem) scale(1)",
                                                        transitionDelay: inView && hoveredIndex === null ? `${i * 80}ms` : "0ms",
                                                    }}
                                                >
                                                    <span className="block text-[11px] font-medium tabular-nums tracking-[0.15em] text-zinc-500 transition-colors duration-200 group-hover/card:text-zinc-300">
                                                        {item.year}
                                                    </span>
                                                    <div className={`mt-2 ${contentClass}`}>
                                                        <h3 className="text-base font-semibold tracking-tight text-white transition-[filter] duration-200 group-hover/card:drop-shadow-[0_0_10px_rgba(255,255,255,0.12)]">
                                                            {item.title}
                                                        </h3>
                                                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 transition-colors duration-200 group-hover/card:text-zinc-300">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
