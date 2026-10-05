import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { AttendPartner } from "@/components/sections/AttendPartner";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Mission } from "@/components/sections/Mission";
import { SpeakersPreview } from "@/components/sections/Speakers";
import { Startups } from "@/components/sections/Startups";
import { Strip } from "@/components/sections/Strip";

/**
 * Cover, proof, the idea as a diagram, the story as a pinned scroll, the
 * founders and speakers, and the two ways in.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Strip />
      <Mission />
      <Journey />
      <Startups />
      <SpeakersPreview />
      <AttendPartner />
      <EventJsonLd />
    </>
  );
}

/** Structured data for search, emitted only once date and venue are set. */
function EventJsonLd() {
  const { event, org } = site;
  if (!event.startsAt || !event.venue) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: site.name,
    description: site.description,
    startDate: event.startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: event.venue, address: event.city ?? undefined },
    organizer: { "@type": "Organization", name: org.fullName, url: org.url },
    url: siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: every value comes from our own config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
