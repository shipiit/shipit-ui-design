import type { Metadata } from "next";
import { DemoNav } from "@/components/demo/DemoNav";

export const metadata: Metadata = {
  title: "Dashboard demo · shipit-ui-design",
  description:
    "A working admin dashboard built end-to-end via shipit-ui-design's plugin rules — sidebar, KPI tiles, charts, sortable tables.",
};

export default function DashboardLayout({
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
