"use client";

import * as React from "react";
import { motion } from "motion/react";
import { AppShell } from "@/components/demo/AppShell";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { useFadeUp } from "@/components/animations/Motion";
import {
  SettingsSideNav,
  type SectionKey,
  type SectionMeta,
} from "@/components/demo/settings/SettingsSideNav";
import { ProfileSection } from "@/components/demo/settings/ProfileSection";
import { SecuritySection } from "@/components/demo/settings/SecuritySection";
import { NotificationsSection } from "@/components/demo/settings/NotificationsSection";
import { BillingSection } from "@/components/demo/settings/BillingSection";
import { TeamSection } from "@/components/demo/settings/TeamSection";
import { ApiKeysSection } from "@/components/demo/settings/ApiKeysSection";
import { SaveBar } from "@/components/demo/settings/SaveBar";

const SECTIONS: SectionMeta[] = [
  { key: "profile", label: "Profile", description: "Public name, bio, handle." },
  {
    key: "security",
    label: "Security",
    description: "Password, two-factor, sessions.",
    badge: { tone: "warn", text: "1" },
  },
  { key: "notifications", label: "Notifications", description: "Email, in-app, and push." },
  { key: "billing", label: "Billing", description: "Plan, payment method, invoices." },
  { key: "team", label: "Team", description: "Members, roles, and invites." },
  { key: "api-keys", label: "API keys", description: "Programmatic access tokens." },
  { key: "danger", label: "Danger zone", description: "Workspace transfer and deletion." },
];

export default function SettingsPage() {
  const [active, setActive] = React.useState<SectionKey>("profile");
  const [dirtyMap, setDirtyMap] = React.useState<Record<SectionKey, boolean>>({
    profile: false,
    security: false,
    notifications: false,
    billing: false,
    team: false,
    "api-keys": false,
    danger: false,
  });
  const [resetKey, setResetKey] = React.useState(0);
  const [saving, setSaving] = React.useState(false);
  const fadeUp = useFadeUp();

  const setDirty = React.useCallback(
    (key: SectionKey) =>
      (dirty: boolean) =>
        setDirtyMap((m) => (m[key] === dirty ? m : { ...m, [key]: dirty })),
    [],
  );

  const onProfileDirty = React.useMemo(() => setDirty("profile"), [setDirty]);
  const onSecurityDirty = React.useMemo(() => setDirty("security"), [setDirty]);
  const onNotifsDirty = React.useMemo(() => setDirty("notifications"), [setDirty]);
  const onBillingDirty = React.useMemo(() => setDirty("billing"), [setDirty]);
  const onTeamDirty = React.useMemo(() => setDirty("team"), [setDirty]);
  const onApiDirty = React.useMemo(() => setDirty("api-keys"), [setDirty]);

  const anyDirty = Object.values(dirtyMap).some(Boolean);

  const handleDiscard = () => {
    setResetKey((k) => k + 1);
    setDirtyMap({
      profile: false,
      security: false,
      notifications: false,
      billing: false,
      team: false,
      "api-keys": false,
      danger: false,
    });
  };
  const handleSave = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      handleDiscard();
    }, 700);
  };

  const activeSection = (() => {
    switch (active) {
      case "profile":
        return <ProfileSection onDirtyChange={onProfileDirty} resetKey={resetKey} />;
      case "security":
        return <SecuritySection onDirtyChange={onSecurityDirty} resetKey={resetKey} />;
      case "notifications":
        return <NotificationsSection onDirtyChange={onNotifsDirty} resetKey={resetKey} />;
      case "billing":
        return <BillingSection onDirtyChange={onBillingDirty} resetKey={resetKey} />;
      case "team":
        return <TeamSection onDirtyChange={onTeamDirty} resetKey={resetKey} />;
      case "api-keys":
        return <ApiKeysSection onDirtyChange={onApiDirty} resetKey={resetKey} />;
      case "danger":
        return <DangerZone />;
    }
  })();

  return (
    <AppShell title="Lume" activeKey="settings">
      <div className="relative -mx-[var(--spacing-4)] -my-[var(--spacing-4)] sm:-mx-[var(--spacing-6)] sm:-my-[var(--spacing-6)] lg:-mx-[var(--spacing-8)] lg:-my-[var(--spacing-8)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.22]">
          <Backdrop3D variant="lattice" />
        </div>

        <Container variant="narrow" className="py-[var(--spacing-6)] sm:py-[var(--spacing-8)]">
          <header className="mb-[var(--spacing-6)] flex flex-wrap items-end justify-between gap-[var(--spacing-3)] sm:mb-[var(--spacing-8)]">
            <div>
              <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-700)] dark:text-[var(--color-brand-200)]">
                Workspace
              </p>
              <h1 className="mt-[var(--spacing-1)] text-[length:var(--text-3xl)] font-semibold tracking-tight text-[var(--color-fg)]">
                Settings
              </h1>
              <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                Configure how Lume behaves for you and your team.
              </p>
            </div>
            <div className="hidden items-center gap-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)] sm:flex">
              <span aria-hidden="true" className="inline-flex h-2 w-2 rounded-full bg-[oklch(70%_0.16_150)]" />
              All changes synced
            </div>
          </header>

          <div className="grid gap-[var(--spacing-6)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-[var(--spacing-10)]">
            <aside className="min-w-0">
              <SettingsSideNav active={active} onChange={setActive} sections={SECTIONS} />
            </aside>
            <div className="min-w-0">
              <motion.div
                key={active}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                {activeSection}
              </motion.div>
              <SaveBar
                visible={anyDirty}
                onDiscard={handleDiscard}
                onSave={handleSave}
                saving={saving}
              />
            </div>
          </div>
        </Container>
      </div>
    </AppShell>
  );
}

function DangerZone() {
  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <header>
        <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">
          Danger zone
        </h2>
        <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          Irreversible actions. Read twice, click once.
        </p>
      </header>

      <section
        className="rounded-[var(--radius-2xl)] border border-[color-mix(in_oklch,var(--color-accent-500)_24%,var(--color-border))] bg-[color-mix(in_oklch,var(--color-accent-500)_4%,var(--color-surface))] p-[var(--spacing-5)] shadow-[var(--shadow-sm)] sm:p-[var(--spacing-6)]"
      >
        <ul className="divide-y divide-[var(--color-border-subtle)]">
          <li className="flex flex-wrap items-center justify-between gap-[var(--spacing-4)] py-[var(--spacing-4)] first:pt-0">
            <div className="min-w-0 max-w-prose">
              <h3 className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">Transfer workspace</h3>
              <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                Move ownership to another admin. You'll keep your account but lose admin rights here.
              </p>
            </div>
            <Button variant="secondary" size="sm" type="button">Transfer</Button>
          </li>
          <li className="flex flex-wrap items-center justify-between gap-[var(--spacing-4)] py-[var(--spacing-4)] last:pb-0">
            <div className="min-w-0 max-w-prose">
              <h3 className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">Delete workspace</h3>
              <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                Permanently delete this workspace, its members, and all data. This cannot be undone.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-600)] px-[var(--spacing-4)] text-[length:var(--text-sm)] font-medium text-[var(--color-fg-on-brand)] shadow-[var(--shadow-sm)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-accent-700)] focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete workspace
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
