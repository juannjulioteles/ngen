import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  /** Short line under the title. */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** The page grid every inner section uses: title in the margin, content in the column. */
export function PageSection({ id, title, aside, children, className = "" }: SectionProps) {
  return (
    <section aria-labelledby={id} className={`wrap py-[clamp(4rem,8vw,7rem)] ${className}`}>
      <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col gap-1 lg:col-span-3 lg:pt-2">
          <h2 id={id} className="text-small font-medium text-graphite">
            {title}
          </h2>
          {aside}
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
