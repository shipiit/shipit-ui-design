import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "shipit-ui-design — Senior UI/UX in your terminal",
  description:
    "A Claude Code plugin that turns Claude Code into a senior UI/UX designer. Bootstraps design systems, generates polished components and dashboards, iterates visually with screenshot-based critique loops.",
  metadataBase: new URL("https://shipit-ui-design.vercel.app"),
  openGraph: {
    title: "shipit-ui-design",
    description: "Senior UI/UX in your terminal — a Claude Code plugin.",
    url: "https://shipit-ui-design.vercel.app",
    siteName: "shipit-ui-design",
    type: "website",
    images: ["/banner.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "shipit-ui-design",
    description: "Senior UI/UX in your terminal — a Claude Code plugin.",
    images: ["/banner.svg"],
  },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
