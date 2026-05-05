"use client";

import { useEffect } from "react";

export default function DiscordRedirect({ href }: { href: string }) {
    useEffect(() => {
        const timeout = window.setTimeout(() => {
            window.location.href = href;
        }, 1000);

        return () => window.clearTimeout(timeout);
    }, [href]);

    return null;
}
