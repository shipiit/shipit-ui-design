import type { Metadata } from "next";
import { DemoNav } from "@/components/demo/DemoNav";

export const metadata: Metadata = {
  title: "Settings · shipit-ui-design demo",
  description:
    "A working multi-section settings surface — profile, security, notifications, billing, team, API keys — built end-to-end via shipit-ui-design's plugin rules.",
};

export default function SettingsLayout({
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
