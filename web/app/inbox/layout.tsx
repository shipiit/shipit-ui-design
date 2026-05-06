import type { Metadata } from "next";
import { DemoNav } from "@/components/demo/DemoNav";

export const metadata: Metadata = {
  title: "Inbox demo · shipit-ui-design",
  description:
    "A working inbox / list-detail layout built end-to-end via shipit-ui-design's plugin rules — message list, thread view, reply composer.",
};

export default function InboxLayout({
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
