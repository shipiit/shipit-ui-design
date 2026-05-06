import type { Metadata } from "next";
import { DemoNav } from "@/components/demo/DemoNav";

export const metadata: Metadata = {
  title: "Kanban demo · shipit-ui-design",
  description:
    "A working kanban board built end-to-end via shipit-ui-design's plugin rules — 4 columns, prioritized cards, due dates, assignees.",
};

export default function KanbanLayout({
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
