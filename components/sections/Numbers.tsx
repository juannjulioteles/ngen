import { site } from "@/content/site";
import { PageSection } from "@/components/layout/PageSection";

const { numbers } = site;

/**
 * Two outside figures as stacked statements (figure on the left, one sentence
 * and its source on the right), then the gap they show, one sentence to a line.
 * Compact is the inner-page size, inside the page grid's nine columns.
 */
function Figures({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <dl className={`flex flex-col gap-y-12 ${compact ? "mt-10" : "mt-12 lg:mt-16"}`}>
        {numbers.figures.map((f) => (
          <div key={f.value} className="grid gap-x-8 gap-y-3 lg:grid-cols-12 lg:items-center">
            <dt
              className={`font-display leading-none lg:col-span-5 ${
                compact ? "text-[clamp(4rem,8vw,7rem)]" : "text-[clamp(4.5rem,11vw,9rem)]"
              }`}
            >
              {f.value}
            </dt>
            <dd className="flex flex-col gap-2 lg:col-span-7">
              {/* Pretty, not balance, so each sentence runs out to the right edge */}
              <span className={`[text-wrap:pretty] ${compact ? "text-lead" : "text-h3 leading-[1.35]"}`}>{f.label}</span>
              <span className="text-small text-graphite">{f.source}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className={`font-display ${compact ? "mt-12 text-h2" : "mt-14 text-h1 lg:mt-20"}`}>
        {numbers.close.split(/(?<=\.)\s+/).map((sentence) => (
          <span key={sentence} className="block">
            {sentence}
          </span>
        ))}
      </p>
    </>
  );
}

/** Why the conference exists, on the home page right after the mission. */
export function Numbers() {
  return (
    <section aria-labelledby="numbers-title" className="bg-stone">
      <div className="wrap py-[clamp(5rem,10vw,8rem)]">
        <h2 id="numbers-title" className="font-display text-h2">
          {numbers.title}
        </h2>
        <Figures />
      </div>
    </section>
  );
}

/** The same case on an inner page: its label in the margin, carrying on from the section above. */
export function NumbersSection({ label }: { label: string }) {
  return (
    <PageSection id="numbers-title" title={label} className="pt-0">
      <p className="font-display text-h2">{numbers.title}</p>
      <Figures compact />
    </PageSection>
  );
}
