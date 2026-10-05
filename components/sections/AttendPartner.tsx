import Image from "next/image";
import { site } from "@/content/site";
import { eventDateLabel, eventVenueLabel } from "@/lib/event";
import { PageLink } from "@/components/ui/PageLink";
import { withNgen } from "@/components/brand/Ngen";

const { attend, partner, links } = site;

/** The back cover: two ways to be in the room, side by side. */
export function AttendPartner() {
  return (
    <section aria-label="Attend or partner" className="bg-ink text-paper">
      <div className="wrap grid gap-16 py-[clamp(5rem,10vw,9rem)] lg:grid-cols-2 lg:gap-0">
        <div id="attend" className="flex flex-col items-start gap-6 lg:pr-[clamp(2rem,5vw,5rem)]">
          <h2 className="font-display text-h1">{attend.title}</h2>
          <p className="text-lead lg:[text-wrap:pretty]">{attend.body}</p>
          <dl className="rule grid w-full grid-cols-2 gap-6 border-t pt-5">
            <div>
              <dt className="text-small text-mist">{attend.dateLabel}</dt>
              <dd>{eventDateLabel}</dd>
            </div>
            <div>
              <dt className="text-small text-mist">{attend.venueLabel}</dt>
              <dd>{eventVenueLabel}</dd>
            </div>
          </dl>
          <PageLink href={site.nav.cta.href} className="btn btn-paper mt-2">
            {attend.cta}
          </PageLink>
        </div>

        <div className="rule flex flex-col items-start gap-6 max-lg:border-t max-lg:pt-16 lg:border-l lg:pl-[clamp(2rem,5vw,5rem)]">
          <h2 className="font-display text-h1">{partner.title}</h2>
          <p className="text-lead lg:[text-wrap:pretty]">{withNgen(partner.body)}</p>
          <a href={`mailto:${links.email}`} className="link font-display text-h3 [overflow-wrap:anywhere]">
            {links.email}
          </a>
          <PageLink href={partner.more.href} className="btn btn-ghost mt-2">
            {partner.more.label}
          </PageLink>
          {partner.logos.length > 0 && (
            <ul aria-label={partner.logosLabel} className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
              {partner.logos.map((p) => (
                <li key={p.name}>
                  <Image
                    src={p.logo.src}
                    alt={p.logo.alt || p.name}
                    width={p.logo.width}
                    height={p.logo.height}
                    unoptimized={p.logo.src.endsWith(".svg")}
                    className="h-8 w-auto brightness-0 invert"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
