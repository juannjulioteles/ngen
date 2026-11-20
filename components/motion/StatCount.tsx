import type { CSSProperties, HTMLAttributes } from "react";

/**
 * Split a figure into the whole number that counts and the text around it.
 * "About 50%" → "About ", 50, "%". "13.8%" → 13, ".8%" (the counter is a
 * whole number, and the decimal stays in the suffix so the final text matches).
 */
export function splitFigure(value: string) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { pre: "", num: "0", post: value };
  const [, pre, num, post] = match;
  return { pre, num, post };
}

const withVars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * A figure that counts up. The digit box is the width of the final number, so
 * the prefix and suffix stay put while the value climbs. CSS animates it
 * (see `.intro-count` and `.count-up` in globals.css).
 */
export function StatCount({
  value,
  className,
  style,
  ...rest
}: {
  value: string;
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLSpanElement>) {
  const { pre, num, post } = splitFigure(value);
  return (
    <span className={className} style={{ ...style, ...withVars({ "--to": Number(num) }) }} {...rest}>
      {pre ? <span className="stat-affix">{pre}</span> : null}
      <span className="stat-digits">
        <span className="stat-sizer">{num}</span>
        <span className="stat-num" />
      </span>
      {post ? <span className="stat-affix">{post}</span> : null}
    </span>
  );
}
