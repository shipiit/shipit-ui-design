"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import {
  motion,
  useFadeUp,
  useStagger,
} from "@/components/animations/Motion";
import {
  SkillChipIcon,
  type SkillChipVariant,
} from "@/components/illustrations/SkillChipIcon";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";
import { PathDrawCurve } from "@/components/illustrations/PathDrawCurve";

interface Skill {
  name: string;
  trigger: string;
  variant: SkillChipVariant;
}

const SKILLS: Skill[] = [
  { name: "ui-design-principles", trigger: ".tsx .jsx .vue .svelte", variant: "ui" },
  { name: "motion-design", trigger: "motion work, /motion", variant: "motion" },
  { name: "design-system-keeper", trigger: "tokens.css, theme files", variant: "keeper" },
  { name: "svg-illustration", trigger: "/illustrate, .svg edits", variant: "svg" },
  { name: "three-d-scene", trigger: "/scene, R3F files", variant: "3d" },
  { name: "dashboard-design", trigger: "/admin /dashboard /console paths", variant: "dashboard" },
  { name: "data-visualization", trigger: "chart code, KPI tiles", variant: "viz" },
  { name: "color-engineering", trigger: "color tokens, palette work", variant: "color" },
];

export function Skills() {
  const stagger = useStagger(0.04);
  const fadeUp = useFadeUp();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="py-24 lg:py-32"
    >
      <Container>
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p
            className="
              flex items-center gap-2
              uppercase tracking-[0.18em]
              text-[length:var(--text-xs)] font-medium
              text-[var(--color-fg-subtle)] mb-4
            "
          >
            <SparkleIcon size={18} />
            Auto-activating skills
          </p>
          <h2
            id="skills-title"
            className="
              text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)]
              font-bold tracking-tight text-[var(--color-fg)]
            "
          >
            They turn on without you asking.
          </h2>
          <div aria-hidden="true" className="mt-6 -ml-2">
            <PathDrawCurve />
          </div>
        </div>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-4 lg:gap-5
          "
        >
          {SKILLS.map((skill) => (
            <motion.li key={skill.name} variants={fadeUp}>
              <article
                tabIndex={0}
                className="
                  group relative h-full overflow-hidden
                  flex flex-col gap-3
                  p-5 lg:p-6
                  rounded-[var(--radius-lg)]
                  bg-[var(--color-surface-elevated)]
                  border border-[var(--color-border-subtle)]
                  outline-none
                  transition-[transform,box-shadow,border-color,background-color]
                  duration-[var(--dur-fast)] ease-[var(--ease-out)]
                  hover:-translate-y-0.5
                  hover:border-[var(--color-border)]
                  hover:bg-[var(--color-surface)]
                  hover:shadow-[var(--shadow-md)]
                  active:translate-y-0
                  motion-reduce:hover:translate-y-0
                  focus-visible:ring-2
                  focus-visible:ring-[var(--color-ring)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--color-bg)]
                "
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-brand-500) 8%, transparent), transparent 60%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="
                      inline-flex items-center justify-center
                      h-9 w-9 shrink-0
                      rounded-[var(--radius-md)]
                      bg-[var(--color-surface)]
                      border border-[var(--color-border-subtle)]
                      shadow-[var(--shadow-sm)]
                      transition-transform
                      duration-[var(--dur-default)] ease-[var(--ease-spring)]
                      group-hover:scale-105
                      motion-reduce:group-hover:scale-100
                    "
                  >
                    <SkillChipIcon variant={skill.variant} size={24} />
                  </span>
                  <h3
                    className="
                      font-[var(--font-mono)]
                      text-[length:var(--text-sm)]
                      font-medium tracking-tight
                      text-[var(--color-fg)]
                      truncate
                    "
                  >
                    {skill.name}
                  </h3>
                </div>
                <p
                  className="
                    text-[length:var(--text-xs)] leading-relaxed
                    text-[var(--color-fg-muted)]
                    pl-12
                  "
                >
                  {skill.trigger}
                </p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export default Skills;
