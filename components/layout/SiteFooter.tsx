import type { ReactNode } from "react";
import { site } from "@/content/site";
import { withNgen } from "@/components/brand/Ngen";
import { Wordmark } from "@/components/brand/Wordmark";
import { PageLink } from "@/components/ui/PageLink";

const { footer, org, links, nav } = site;

/**
 * Brand and the one action on the left; three labelled columns of links,
 * spaced so each one is easy to hit; a bottom bar for the legal line.
 * The last column ends on the right margin, in line with the nav.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-2 text-paper">
      <div className="wrap pt-[clamp(4rem,8vw,6rem)] pb-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-6 sm:col-span-3 lg:col-span-5">
            <Wordmark className="h-14" />
            <p className="text-base text-mist">{footer.status}</p>
            <PageLink href={nav.cta.href} className="btn btn-paper">
              {nav.cta.label}
            </PageLink>
          </div>

          <FooterColumn title={footer.columns.pages} className="lg:col-span-2 lg:col-start-7">
            {nav.links.map((link) => (
              <PageLink key={link.href} href={link.href} className="footer-link">
                {link.label}
              </PageLink>
            ))}
          </FooterColumn>

          <FooterColumn title={footer.columns.social} className="lg:col-span-2">
            {footer.social.map((s) =>
              s.external ? (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                  {s.label}
                  <svg aria-hidden="true" width="9" height="9" viewBox="0 0 10 10" fill="none" className="ml-1.5 inline-block opacity-60">
                    <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <PageLink key={s.href} href={s.href} className="footer-link">
                  {s.label}
                </PageLink>
              ),
            )}
          </FooterColumn>

          <FooterColumn title={footer.columns.contact} className="lg:col-span-2">
            <a href={`mailto:${links.email}`} className="footer-link [overflow-wrap:anywhere]">
              {links.email}
            </a>
            <a href={org.url} className="footer-link">
              {org.urlLabel}
            </a>
          </FooterColumn>
        </div>

        <div className="mt-[clamp(3.5rem,7vw,5rem)] flex flex-col gap-3 border-t border-paper/10 pt-6 text-small text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>{withNgen(footer.presentedBy)}</p>
          <p className="shrink-0">
            © {year} {footer.copyrightHolder}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h2 className="mb-5 text-small text-mist">{title}</h2>
      <div className="flex flex-col items-start gap-3.5">{children}</div>
    </div>
  );
}
