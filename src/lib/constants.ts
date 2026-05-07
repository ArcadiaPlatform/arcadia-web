import aboutData from "@/data/about.json";
import contactData from "@/data/contact.json";
import discordData from "@/data/discord.json";
import docsData from "@/data/docs.json";
import footerData from "@/data/footer.json";
import heroData from "@/data/hero.json";
import projectsData from "@/data/projects.json";
import siteData from "@/data/site.json";
import storeData from "@/data/store.json";
import timelineData from "@/data/timeline.json";

// ============ Navigation ============
export const NAV_ITEMS = [
    { label: "소개", href: "/#about", sectionId: "about" },
    { label: "연혁", href: "/#timeline", sectionId: "timeline" },
    { label: "프로젝트", href: "/#projects", sectionId: "projects" },
    { label: "문의", href: "/#contact", sectionId: "contact" },
] as const;

export const SECTION_IDS = NAV_ITEMS.map((item) => item.sectionId);

export const SCROLL_THRESHOLD = 60;
export const SCROLL_SECTION = "scroll-mt-20";

// ============ Section Headers ============
export const SECTION_HEADERS = {
    about: { label: "About", title: "소개" },
    timeline: { label: "Timeline", title: "연혁" },
    projects: { label: "Projects", title: "프로젝트" },
    contact: { label: "Contact", title: "문의" },
} as const;

// ============ Site ============
export const SITE_NAME = siteData.siteName;
export const PAGE_TITLE = siteData.pageTitle;
export const COPYRIGHT = siteData.copyright;
export const TEAM_NAME = siteData.teamName;

// ============ Hero ============
export const HERO_TAGLINE = heroData.tagline;

// ============ About ============
export const ABOUT_HEADLINE = aboutData.headline;
export const ABOUT_DESCRIPTION = aboutData.description;

// ============ Discord ============
export const DISCORD_INVITE = {
    href: discordData.href,
    inviteCode: discordData.inviteCode,
    message: discordData.message,
    buttonLabel: discordData.buttonLabel,
    description: discordData.description,
} as const;

// ============ Store ============
export const STORE_LINK = {
    href: storeData.href,
    label: storeData.label,
    labelShort: storeData.labelShort,
    description: storeData.description,
    badge: storeData.badge,
} as const;

// ============ Docs ============
export const DOCS_HOME = docsData.home;
export const DOCS_PAGES = docsData.pages as readonly { label: string; href: string }[];

// ============ Timeline ============
export const TIMELINE = timelineData as readonly { year: string; title: string; desc: string }[];

// ============ Projects ============
export const PROJECTS = projectsData as readonly {
    title: string;
    desc: string;
    links: readonly { label: string; href: string; icon: string }[];
}[];

// ============ Contact ============
export const CONTACT_EMAIL = contactData.email;
export const CONTACT_KAKAO = contactData.kakao;
export const CONTACT_MESSAGE = contactData.message;

// ============ Footer ============
export const BUSINESS_INFO = footerData.business;
export const FOOTER_SNS = footerData.sns as readonly { label: string; href: string; icon: string }[];

// ============ Navbar ============
export const NAVBAR_LABELS = {
    closeMenu: "메뉴 닫기",
    openMenu: "메뉴 열기",
    mainMenu: "메인 메뉴",
    moreMenu: "더 알아보기",
    footerMenu: "푸터 메뉴",
} as const;

// ============ Assets ============
export const LOGO_PATHS = {
    main: "/icons/arcadia_logo.svg",
    clear: "/icons/arcadia_logo_clear.svg",
    clearZinc: "/icons/arcadia_logo_clear_zinc.svg",
} as const;
