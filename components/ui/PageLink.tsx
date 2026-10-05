import Link from "next/link";
import type { ComponentProps } from "react";

/** next/link tagged for the cinematic page cut. */
export function PageLink(props: ComponentProps<typeof Link>) {
  return <Link transitionTypes={["page"]} {...props} />;
}
