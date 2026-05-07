import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { ABOUT_DESCRIPTION, ABOUT_HEADLINE, SCROLL_SECTION, SECTION_HEADERS } from "@/lib/constants";

export default function About() {
    return (
        <section id="about" className={`relative py-24 md:py-32 ${SCROLL_SECTION}`}>
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <SectionHeader label={SECTION_HEADERS.about.label} title={SECTION_HEADERS.about.title} />
                    {ABOUT_HEADLINE && (
                        <p className="mb-6 mt-6 text-2xl font-semibold leading-snug tracking-tight text-zinc-200 md:text-3xl">
                            {ABOUT_HEADLINE}
                        </p>
                    )}
                    <p className="text-zinc-500 leading-relaxed">{ABOUT_DESCRIPTION}</p>
                </div>
            </Container>
        </section>
    );
}
