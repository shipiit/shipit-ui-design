import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/primitives/Container";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { CardGallery } from "@/components/demo/cards/CardGallery";

export default function CardsPage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Hero strip */}
        <section className="relative overflow-hidden pt-[var(--spacing-32)] pb-[var(--spacing-16)]">
          <Backdrop3D variant="orbs" />
          <Container className="relative z-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-[var(--spacing-4)] text-center">
              <span className="inline-flex items-center gap-[var(--spacing-2)] rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-700)]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-400)] motion-safe:animate-pulse" />
                Card gallery
              </span>
              <h1
                className="text-[length:var(--text-5xl)] font-bold tracking-tight text-[var(--color-fg)]"
                style={{ textWrap: "balance" }}
              >
                Every card the plugin can produce.
              </h1>
              <p
                className="max-w-xl text-[length:var(--text-lg)] text-[var(--color-fg-muted)] leading-relaxed"
                style={{ textWrap: "balance" }}
              >
                All using tokens, all dark-mode aware, all accessible. Hover, focus-visible, and reduced-motion respected on every interactive surface.
              </p>
              <ul className="mt-[var(--spacing-2)] flex flex-wrap items-center justify-center gap-x-[var(--spacing-4)] gap-y-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                <li className="inline-flex items-center gap-[var(--spacing-1)]">
                  <Dot /> 14 variants
                </li>
                <li className="inline-flex items-center gap-[var(--spacing-1)]">
                  <Dot /> 0 hard-coded values
                </li>
                <li className="inline-flex items-center gap-[var(--spacing-1)]">
                  <Dot /> WCAG AA verified
                </li>
              </ul>
            </div>
          </Container>
        </section>

        {/* Gallery body */}
        <section className="relative overflow-hidden bg-[var(--color-surface)] border-t border-[var(--color-border-subtle)] pt-[var(--spacing-16)] pb-[var(--spacing-24)]">
          <Backdrop3D variant="lattice" className="opacity-60" />
          <Container className="relative z-10">
            <CardGallery />
          </Container>
        </section>

        <div className="border-t border-[var(--color-border-subtle)]">
          <Container className="py-[var(--spacing-8)]">
            <p className="text-center text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
              Built with{" "}
              <a
                href="/"
                className="font-semibold text-[var(--color-fg)] underline underline-offset-4 hover:text-[var(--color-brand-600)]"
              >
                shipit-ui-design
              </a>
              .
            </p>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-400)]"
    />
  );
}
