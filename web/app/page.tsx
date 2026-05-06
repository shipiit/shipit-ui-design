import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Install } from "@/components/sections/Install";
import { Features } from "@/components/sections/Features";
import { Commands } from "@/components/sections/Commands";
import { Refine } from "@/components/sections/Refine";
import { RichByDefault } from "@/components/sections/RichByDefault";
import { Skills } from "@/components/sections/Skills";
import { Constitution } from "@/components/sections/Constitution";
import { CodeExample } from "@/components/sections/CodeExample";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

const surface = "bg-[var(--color-surface)]";
const divider = "border-t border-[color:var(--color-border-subtle)]";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className={`${surface} ${divider}`}>
          <Highlights />
        </div>
        <div className={divider}>
          <Install />
        </div>
        <div className={`${surface} ${divider}`}>
          <Features />
        </div>
        <div className={divider}>
          <Commands />
        </div>
        <div className={`${surface} ${divider}`}>
          <Refine />
        </div>
        <div className={divider}>
          <RichByDefault />
        </div>
        <div className={`${surface} ${divider}`}>
          <Skills />
        </div>
        <div className={divider}>
          <Constitution />
        </div>
        <div className={`${surface} ${divider}`}>
          <CodeExample />
        </div>
        <div className={divider}>
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
