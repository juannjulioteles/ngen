import { IvyVine } from "@/components/brand/IvyVine";

/** Route-transition mark: the vine draws itself while the next page streams in. */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-stone text-forest">
      <IvyVine animate className="h-24" />
      <span className="sr-only" role="status">
        Loading
      </span>
    </div>
  );
}
