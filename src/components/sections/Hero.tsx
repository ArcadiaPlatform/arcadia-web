import Image from "next/image";
import { blackOpsOne } from "@/lib/font";
import { DISCORD_INVITE, HERO_TAGLINE, SITE_NAME } from "@/lib/constants";
import HeroEffects from "./HeroEffects";
import HeroLogo from "./HeroLogo";

export default async function Hero() {
    return (
        <section className="relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden bg-[#0a0612]">
            <HeroEffects />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120444]/30 via-transparent to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[55%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#630060]/15 blur-[100px]" />
            <div className="relative flex flex-col items-center px-6 text-center">
                <HeroLogo />
                <h1 className={`${blackOpsOne.className} text-5xl tracking-tight text-white md:text-7xl`}>
                    {SITE_NAME}
                </h1>
                <p className="-mt-0.5 max-w-md text-base text-zinc-500 md:mt-0 md:text-lg">{HERO_TAGLINE}</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6">
                    <a
                        href={DISCORD_INVITE.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#5865F2]/20 transition-all duration-200 hover:bg-[#4752C4] hover:shadow-[#5865F2]/30"
                    >
                        <Image src="/icons/discord.svg" alt="" width={16} height={16} className="h-4 w-4 opacity-95" />
                        {DISCORD_INVITE.buttonLabel}
                    </a>
                </div>
            </div>
        </section>
    );
}
