import type { Metadata } from "next";
import { DemoNav } from "@/components/demo/DemoNav";

export const metadata: Metadata = {
  title: "Examples · shipit-ui-design",
  description:
    "What shipit-ui-design produces — real working layouts, all built end-to-end via the plugin's rules.",
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoNav />
      {children}
    </>
  );
}
