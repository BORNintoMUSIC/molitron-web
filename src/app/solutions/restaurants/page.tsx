import type { Metadata } from "next";
import { ApplicationPage } from "@/components/ApplicationPage";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("restaurants");
export default function Page() {
  return <ApplicationPage kind="restaurants" />;
}
