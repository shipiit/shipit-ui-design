import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/primitives/Container";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { InputStates } from "@/components/demo/forms/InputStates";
import { InputGallery } from "@/components/demo/forms/InputGallery";
import { FormPattern } from "@/components/demo/forms/FormPattern";

export default function FormsPage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden pt-[var(--spacing-32)] pb-[var(--spacing-16)]">
          <Backdrop3D variant="grid-tilt" />
          <Container className="relative z-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-[var(--spacing-4)] text-center">
              <span className="inline-flex items-center gap-[var(--spacing-2)] rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-700)]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-400)] motion-safe:animate-pulse" />
                Form controls
              </span>
              <h1
                className="text-[length:var(--text-5xl)] font-bold tracking-tight text-[var(--color-fg)]"
                style={{ textWrap: "balance" }}
              >
                Inputs that don&rsquo;t fight you.
              </h1>
              <p
                className="max-w-xl text-[length:var(--text-lg)] text-[var(--color-fg-muted)] leading-relaxed"
                style={{ textWrap: "balance" }}
              >
                Every state covered — default, hover, focus, disabled, error, success. Every label visible. Every error announced. Every interaction reachable by keyboard.
              </p>
            </div>
          </Container>
        </section>

        {/* States */}
        <section
          aria-labelledby="states-title"
          className="relative bg-[var(--color-surface)] border-t border-[var(--color-border-subtle)] py-[var(--spacing-16)]"
        >
          <Container>
            <SectionHeader
              id="states-title"
              eyebrow="01 · States"
              title="One input, six states."
              body="The same email field across every required state. Validate on blur, surface errors with role=alert, never remove the focus ring without a replacement."
            />
            <div className="mt-[var(--spacing-10)]">
              <InputStates />
            </div>
          </Container>
        </section>

        {/* Gallery */}
        <section
          aria-labelledby="gallery-title"
          className="relative overflow-hidden border-t border-[var(--color-border-subtle)] py-[var(--spacing-16)]"
        >
          <Backdrop3D variant="soft-mesh" className="opacity-60" />
          <Container className="relative z-10">
            <SectionHeader
              id="gallery-title"
              eyebrow="02 · Gallery"
              title="Every input type the plugin produces."
              body="Toggles, checkboxes, radios, sliders — hand-rolled with semantic <input> underneath. The combobox, multi-select, tag input, and date picker are vanilla React and ~30 lines each."
            />
            <div className="mt-[var(--spacing-10)]">
              <InputGallery />
            </div>
          </Container>
        </section>

        {/* Pattern */}
        <section
          aria-labelledby="pattern-title"
          className="relative bg-[var(--color-surface)] border-t border-[var(--color-border-subtle)] py-[var(--spacing-16)]"
        >
          <Container>
            <SectionHeader
              id="pattern-title"
              eyebrow="03 · Pattern"
              title="A real, polished signup form."
              body="Five input types composed into a coherent flow. Stacked layout, helper text, error summary at the top, primary submit + secondary cancel. Submit shows a 1.5s loading state then confirms."
            />
            <div className="mt-[var(--spacing-10)]">
              <FormPattern />
            </div>
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

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}

function SectionHeader({ id, eyebrow, title, body }: SectionHeaderProps) {
  return (
    <header className="mx-auto flex max-w-2xl flex-col items-start gap-[var(--spacing-2)]">
      <span className="inline-flex w-fit items-center gap-[var(--spacing-2)] rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-700)]">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-400)]" />
        {eyebrow}
      </span>
      <h2
        id={id}
        className="text-[length:var(--text-3xl)] font-semibold tracking-tight text-[var(--color-fg)]"
        style={{ textWrap: "balance" }}
      >
        {title}
      </h2>
      <p
        className="text-[length:var(--text-base)] text-[var(--color-fg-muted)] leading-relaxed"
        style={{ textWrap: "balance" }}
      >
        {body}
      </p>
    </header>
  );
}
