import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Libre_Caslon_Display } from "next/font/google";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { IvySprite } from "@/components/brand/IvySprite";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import "./globals.css";

const caslonDisplay = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caslon-display",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const title = `${site.name} | ${site.org.name}`;

/**
 * Runs before first paint: play the launch sequence on the home page, once per
 * session, unless the visitor prefers reduced motion. Inline on purpose, so
 * the decision is made before anything is drawn.
 */
const introScript = `try{var d=document.documentElement,p=location.pathname==="/"&&!location.hash&&!sessionStorage.getItem("ilec-launch-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.intro=p?"play":"skip"}catch(e){document.documentElement.dataset.intro="skip"}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#f3f1ec",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${caslonDisplay.variable} ${hanken.variable}`}
      // The intro script below sets data-intro before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.venn-ring{stroke-dashoffset:0!important}.venn-fill,.venn-label{opacity:1!important}`}</style>
        </noscript>
      </head>
      {/* Extensions like Grammarly add attributes to <body> before React loads; ignore just those. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[60] bg-paper px-4 py-3 text-small text-forest focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {site.labels.skipToContent}
        </a>
        <IvySprite />
        <MotionProvider>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
