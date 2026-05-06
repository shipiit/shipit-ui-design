import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/utils";

const REPO = "https://github.com/shipiit/shipit-ui-design";
const PALETTE_REPO = "https://github.com/shipiit/ShipIt_Palette";
const LICENSE = `${REPO}/blob/main/LICENSE`;

const LINKS = [
  { href: "#install", label: "Install" },
  { href: "#commands", label: "Commands" },
  { href: "#refine", label: "/refine" },
  { href: REPO, label: "GitHub", external: true },
];

export function Footer() {
  return (
    <footer
      className={cn(
        "border-t border-[var(--color-border-subtle)]",
        "bg-[var(--color-surface)]",
      )}
    >
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand column */}
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2"
              aria-label="shipit/ui home"
            >
              <Image
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="font-semibold tracking-tight text-[length:var(--text-base)] text-[var(--color-fg)]">
                shipit<span className="text-[var(--color-fg-subtle)]">/</span>
                ui
              </span>
            </a>
            <p
              className={cn(
                "mt-4 max-w-xs",
                "text-[length:var(--text-sm)] text-[var(--color-fg-muted)] leading-relaxed",
              )}
            >
              Senior UI/UX in your terminal.
            </p>
          </div>

          {/* Links column */}
          <nav aria-label="Footer">
            <h3
              className={cn(
                "text-[length:var(--text-xs)] font-semibold uppercase",
                "tracking-[0.12em] text-[var(--color-fg-subtle)]",
              )}
            >
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noreferrer noopener" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      "text-[length:var(--text-sm)] text-[var(--color-fg-muted)]",
                      "hover:text-[var(--color-fg)] transition-colors duration-[var(--dur-fast)]",
                    )}
                  >
                    {l.label}
                    {l.external && <ArrowOut />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sister tool */}
          <div>
            <h3
              className={cn(
                "text-[length:var(--text-xs)] font-semibold uppercase",
                "tracking-[0.12em] text-[var(--color-fg-subtle)]",
              )}
            >
              Sister tool
            </h3>
            <a
              href={PALETTE_REPO}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "group mt-4 flex items-center gap-3 p-3",
                "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
                "bg-[var(--color-surface-elevated)]",
                "hover:border-[var(--color-brand)]/40",
                "transition-[border-color,transform] duration-[var(--dur-default)]",
                "hover:-translate-y-0.5",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-10 w-10 rounded-[var(--radius-md)] shrink-0",
                  "shadow-[var(--shadow-sm)]",
                )}
                style={{
                  background:
                    "conic-gradient(from 200deg, var(--color-brand-400), var(--color-accent-500), var(--color-brand-600), var(--color-brand-400))",
                }}
              />
              <span className="flex flex-col">
                <span className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">
                  ShipIt Palette
                </span>
                <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                  Generate harmonious palettes from any seed
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className={cn(
            "mt-12 pt-6",
            "border-t border-[var(--color-border-subtle)]",
            "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
            "text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]",
          )}
        >
          <p>© {new Date().getFullYear()} shipit-ui-design.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={LICENSE}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[var(--color-fg)] transition-colors duration-[var(--dur-fast)]"
            >
              MIT license
            </a>
            <span aria-hidden="true">•</span>
            <span>
              Made with{" "}
              <span className="text-[var(--color-accent-500)]" aria-hidden="true">
                ♥
              </span>
              <span className="sr-only">love</span> by Rahul Raj
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function ArrowOut() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default Footer;
