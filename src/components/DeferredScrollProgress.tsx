"use client";

import dynamic from "next/dynamic";

/** Load scroll UI after hydration — not on the critical path */
const ScrollProgress = dynamic(
  () => import("@/components/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false },
);

export function DeferredScrollProgress() {
  return <ScrollProgress />;
}
