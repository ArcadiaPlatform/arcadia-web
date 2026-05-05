import type { Metadata } from "next";

const title = "Join ARCADIA";
const description = "Ever-evolving to shape the ideal";
const url = "https://acda.kr/discord";
const image = "https://acda.kr/images/arcadia_logo.png";
const inviteUrl = "https://discord.gg/NanAfkRdww";

export const metadata: Metadata = {
    title,
    description,
};

export default function DiscordPage() {
    return (
        <>
            <meta httpEquiv="refresh" content={`1;url=${inviteUrl}`} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="2560" />
            <meta property="og:image:height" content="1440" />
            <meta property="og:image:alt" content="ARCADIA Discord Server" />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content="ARCADIA Discord Server" />
            <div className="flex min-h-[calc(100dvh-5rem)] items-center justify-center px-6 text-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h1>
                    <p className="mt-3 text-sm text-zinc-400 md:text-base">{description}</p>
                    <a
                        href={inviteUrl}
                        className="mt-6 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
                    >
                        Discord로 이동
                    </a>
                </div>
            </div>
        </>
    );
}
