import Link from "next/link";
import { IvyVine } from "@/components/brand/IvyVine";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col justify-center bg-ink text-paper">
      <div className="wrap flex flex-col items-start gap-6">
        <IvyVine className="h-20" />
        <h1 className="font-display text-h1">This page does not exist.</h1>
        <p className="max-w-[44ch] text-lead text-mist">
          The link may be old or mistyped. Everything about the conference is on the home page.
        </p>
        <Link href="/" className="btn btn-paper">
          Go to the home page
        </Link>
      </div>
    </div>
  );
}
