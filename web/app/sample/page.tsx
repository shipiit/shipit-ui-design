import { Container } from "@/components/primitives/Container";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";
import { SampleNav } from "@/components/sample/SampleNav";
import { SampleHero } from "@/components/sample/SampleHero";
import { SampleStats } from "@/components/sample/SampleStats";
import { SampleFeatures } from "@/components/sample/SampleFeatures";
import { SampleDashboard } from "@/components/sample/SampleDashboard";
import { SamplePricing } from "@/components/sample/SamplePricing";
import { SampleTestimonials } from "@/components/sample/SampleTestimonials";
import { SampleCTA } from "@/components/sample/SampleCTA";

const surface = "bg-[var(--color-surface)]";
const divider = "border-t border-[color:var(--color-border-subtle)]";

function DogfoodBanner() {
  return (
    <div
      role="note"
      aria-label="Dogfood demo notice"
      className="fixed inset-x-0 top-0 z-50 bg-[var(--color-brand-700)] text-[var(--color-fg-on-brand)]"
    >
      <Container className="flex h-[var(--spacing-10)] items-center justify-center gap-[var(--spacing-3)] text-[length:var(--text-xs)]">
        <span className="inline-flex items-center gap-[var(--spacing-2)]">
          <SparkleIcon size={14} />
          <span className="uppercase tracking-[0.14em] font-semibold">Dogfood demo</span>
        </span>
        <span className="hidden sm:inline text-[var(--color-brand-100)]">·</span>
        <span className="hidden sm:inline">
          This entire page was generated via shipit-ui-design's rules.
        </span>
        <a
          href="/"
          className="ml-[var(--spacing-2)] underline underline-offset-4 font-semibold hover:text-[var(--color-accent-300)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-300)] rounded-[var(--radius-sm)]"
        >
          Back to plugin →
        </a>
      </Container>
    </div>
  );
}

export default function SamplePage() {
  return (
    <>
      <DogfoodBanner />
      <SampleNav />
      <main className="pt-[var(--spacing-10)]">
        <SampleHero />
        <div className={`${surface} ${divider}`}>
          <SampleStats />
        </div>
        <div className={divider}>
          <SampleFeatures />
        </div>
        <div className={`${surface} ${divider}`}>
          <SampleDashboard />
        </div>
        <div className={divider}>
          <SamplePricing />
        </div>
        <div className={`${surface} ${divider}`}>
          <SampleTestimonials />
        </div>
        <div className={divider}>
          <SampleCTA />
        </div>
      </main>
    </>
  );
}
