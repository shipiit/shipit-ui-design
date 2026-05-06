import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form controls · shipit-ui-design",
  description:
    "Every form input the shipit-ui-design plugin produces, with full state coverage — default, hover, focus, disabled, error, success — all token-driven and accessible.",
};

export default function FormsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
