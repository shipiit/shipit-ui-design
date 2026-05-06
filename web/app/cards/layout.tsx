import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card gallery · shipit-ui-design",
  description:
    "Every card variant the shipit-ui-design plugin produces — stat tiles, profile cards, pricing, glass, gradient, alerts, uploads — all token-driven, dark-mode aware, accessible.",
};

export default function CardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
