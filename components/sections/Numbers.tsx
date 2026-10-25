import { site } from "@/content/site";

const { numbers } = site;

/**
 * Why the conference exists, right after the mission. Built like the NGEN
 * section on About: the headline, the gap and the line on the left; the two
 * figures on the right as proof, on one grid so the first starts level with
 * the headline and the second with the closing line.
 */
export function Numbers() {
  const [first, second] = numbers.figures;
  return (
    <section aria-labelledby="numbers-title" className="bg-stone">
      <div className="wrap py-[clamp(4rem,8vw,7rem)]">
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
          <h2 id="numbers-title" className="font-display text-h2 lg:col-span-7 lg:row-start-1">
            {numbers.title}
          </h2>
          <p className="max-w-[46ch] text-lead text-graphite lg:col-span-7 lg:row-start-2">{numbers.close}</p>
          <p className="max-w-[46ch] font-display text-h3 lg:col-span-7 lg:row-start-3">{numbers.closeNote}</p>
          {[first, second].map((f, i) => (
            <dl
              key={f.value}
              className={`border-t border-ink/15 pt-5 lg:col-span-5 lg:col-start-8 ${
                i === 0 ? "mt-6 lg:row-span-2 lg:row-start-1 lg:mt-0" : "lg:row-start-3"
              }`}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-[clamp(3rem,5vw,4rem)] leading-none">{f.value}</dd>
              <dd className="mt-2 text-base [text-wrap:pretty]">{f.label}</dd>
              <dd className="mt-1 text-small text-graphite [text-wrap:pretty]">{f.source}</dd>
            </dl>
          ))}
        </div>
      </div>
    </section>
  );
}
