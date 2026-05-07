import Container from "@/components/layout/Container";
import ContactForm from "@/components/ui/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { CONTACT_MESSAGE, SCROLL_SECTION, SECTION_HEADERS } from "@/lib/constants";

export default function Contact() {
    return (
        <section id="contact" className={`relative py-24 md:py-32 ${SCROLL_SECTION}`}>
            <Container>
                <div className="mx-auto max-w-xl text-center">
                    <SectionHeader label={SECTION_HEADERS.contact.label} title={SECTION_HEADERS.contact.title} />
                    <p className="mb-8 text-zinc-500 leading-relaxed">{CONTACT_MESSAGE}</p>
                    <ContactForm />
                </div>
            </Container>
        </section>
    );
}
