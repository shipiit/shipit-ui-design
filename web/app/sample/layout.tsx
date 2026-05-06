import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lume — analytics for indie SaaS founders | shipit-ui-design sample",
  description:
    "Live demo of what shipit-ui-design produces. Built end-to-end via the plugin's rules.",
};

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
