import { LEAVES } from "./vine-geometry";

/**
 * Leaf outlines defined once per page. Every <IvyVine /> references them with
 * <use>, so the path data is not repeated in the HTML or the RSC payload.
 * Rendered once, in the root layout.
 */
export function IvySprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {LEAVES.map((leaf) => (
          <g id={leaf.id} key={leaf.id}>
            <path d={leaf.d} />
            {leaf.petiole && (
              <line
                x1={leaf.petiole[0]}
                y1={leaf.petiole[1]}
                x2={leaf.petiole[2]}
                y2={leaf.petiole[3]}
                stroke="currentColor"
                strokeWidth={6}
                strokeLinecap="round"
              />
            )}
          </g>
        ))}
      </defs>
    </svg>
  );
}
