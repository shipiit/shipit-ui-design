"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { cn } from "@/lib/utils";

interface AppShellProps {
  title?: string;
  activeKey?: NavKey;
  children: React.ReactNode;
}
type NavKey =
  | "dashboard" | "kanban" | "inbox" | "customers"
  | "reports" | "billing" | "settings" | "help";

interface NavEntry {
  key: NavKey;
  label: string;
  href: string;
  icon: React.ReactElement;
  badge?: string;
}

const stroke =
  "fill-none stroke-current [stroke-width:2] [stroke-linecap:round] [stroke-linejoin:round]";

const NAV: NavEntry[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>},
  { key: "kanban", label: "Kanban", href: "/kanban",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="11" rx="1"/><rect x="17" y="4" width="4" height="14" rx="1"/></svg>},
  { key: "inbox", label: "Inbox", href: "/inbox", badge: "9",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5 4h14l3 8v8H2v-8z"/></svg>},
  { key: "customers", label: "Customers", href: "#",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c1-3 3.5-4.5 6-4.5s5 1.5 6 4.5"/><path d="M15 18c.6-2 2-3 3.5-3s2.5 1 3 3"/></svg>},
  { key: "reports", label: "Reports", href: "#",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M5 20V10M11 20V4M17 20v-7"/></svg>},
  { key: "billing", label: "Billing", href: "#",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19"/></svg>},
];

const NAV_FOOT: NavEntry[] = [
  { key: "settings", label: "Settings", href: "#",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2.1-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2.1 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2.1 1.2L10 21h4l.5-2.6a7 7 0 0 0 2.1-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>},
  { key: "help", label: "Help", href: "#",
    icon: <svg viewBox="0 0 24 24" className={stroke} aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 4"/><circle cx="12" cy="17" r="0.6" className="fill-current"/></svg>},
];

/**
 * AppShell — reusable sidebar + topbar shell for /dashboard, /kanban, /inbox.
 * Sidebar collapses to 64px icon rail on lg; sheet on mobile.
 * Spacing follows references/spacing-cheat-sheets/desktop-sidebar.md.
 */
export function AppShell({ title, activeKey, children }: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div
      className="grid min-h-dvh w-full bg-[var(--color-bg)] text-[var(--color-fg)]"
      style={{
        gridTemplateAreas: '"topbar topbar" "sidebar content"',
        gridTemplateColumns: collapsed ? "64px 1fr" : "240px 1fr",
        gridTemplateRows: "56px 1fr",
      }}
    >
      <Topbar title={title} onMobileOpen={() => setMobileOpen(true)} />
      <aside
        aria-label="Primary"
        className="hidden border-r border-[var(--color-border-subtle)] bg-[var(--color-surface)] lg:block"
        style={{ gridArea: "sidebar" }}
      >
        <div className="flex h-full flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Nav collapsed={collapsed} activeKey={activeKey} />
          </div>
          <Foot collapsed={collapsed} />
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((v) => !v)}
            className="mx-[var(--spacing-3)] mb-[var(--spacing-4)] inline-flex h-8 items-center justify-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
              {collapsed ? <path d="M9 6l6 6-6 6"/> : <path d="M15 6l-6 6 6 6"/>}
            </svg>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      <main
        id="main"
        className="min-w-0 overflow-x-hidden p-[var(--spacing-4)] sm:p-[var(--spacing-6)] lg:p-[var(--spacing-8)]"
        style={{ gridArea: "content" }}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-[var(--color-brand)] focus:px-[var(--spacing-3)] focus:py-[var(--spacing-2)] focus:text-[var(--color-fg-on-brand)]">
          Skip to main content
        </a>
        {children}
      </main>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div aria-hidden="true" className="absolute inset-0 bg-[var(--color-fg)]/40 backdrop-blur-sm" />
          <aside
            aria-label="Primary"
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full w-[260px] border-r border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]"
          >
            <Nav collapsed={false} activeKey={activeKey} />
            <Foot collapsed={false} />
          </aside>
        </div>
      )}
    </div>
  );
}

function Topbar({ title, onMobileOpen }: { title?: string; onMobileOpen: () => void }) {
  return (
    <header
      role="banner"
      className="sticky top-0 z-30 flex items-center gap-[var(--spacing-3)] border-b border-[var(--color-border-subtle)] bg-[color-mix(in_oklch,var(--color-surface)_85%,transparent)] px-[var(--spacing-4)] backdrop-blur-md sm:px-[var(--spacing-6)]"
      style={{ gridArea: "topbar" }}
    >
      <button
        type="button" aria-label="Open navigation" onClick={onMobileOpen}
        className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <a href="/dashboard" aria-label="App home" className="inline-flex items-center gap-[var(--spacing-2)]">
        <span aria-hidden="true" className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand)] text-[var(--color-fg-on-brand)]">
          <svg width="14" height="14" viewBox="0 0 16 16" className={stroke} aria-hidden="true"><path d="M3 4 v8 h8"/></svg>
        </span>
        <span className="hidden font-semibold text-[length:var(--text-sm)] sm:inline">{title ?? "Lume"}</span>
      </a>
      <div className="ml-auto flex items-center gap-[var(--spacing-2)]">
        <button
          type="button" aria-label="Open command palette"
          className="hidden h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-[var(--spacing-3)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-fg)] sm:inline-flex md:w-[280px] lg:w-[360px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <span className="flex-1 text-left">Search&hellip;</span>
          <kbd className="rounded-[var(--radius-sm)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-[var(--spacing-1)] font-mono text-[length:var(--text-2xs)]">⌘K</kbd>
        </button>
        <button
          type="button" aria-label="Notifications, 3 unread"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
          <span aria-hidden="true" className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--color-accent-500)]" />
        </button>
        <ThemeToggle />
        <button
          type="button" aria-label="Account menu, signed in as Rahul"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-100)] text-[length:var(--text-xs)] font-semibold text-[var(--color-brand-700)] transition-shadow duration-[var(--dur-fast)] hover:shadow-[var(--shadow-sm)]"
        >RR</button>
      </div>
    </header>
  );
}

function Nav({ collapsed, activeKey }: { collapsed: boolean; activeKey?: NavKey }) {
  return (
    <nav aria-label="Primary" className="flex flex-col gap-[var(--spacing-6)] pt-[var(--spacing-8)]">
      <Section label="Workspace" collapsed={collapsed} items={NAV} activeKey={activeKey} />
      <Section label="Support" collapsed={collapsed} items={NAV_FOOT} activeKey={activeKey} />
    </nav>
  );
}

function Section({
  label, items, collapsed, activeKey,
}: { label: string; items: NavEntry[]; collapsed: boolean; activeKey?: NavKey }) {
  return (
    <div className="flex flex-col gap-[var(--spacing-1)]">
      {!collapsed && (
        <h2 className="mb-[var(--spacing-2)] px-[var(--spacing-3)] text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-subtle)]">{label}</h2>
      )}
      <ul className="flex flex-col gap-[var(--spacing-1)] px-[var(--spacing-2)]">
        {items.map((it) => {
          const active = activeKey === it.key;
          return (
            <li key={it.key}>
              <a
                href={it.href}
                aria-current={active ? "page" : undefined}
                aria-label={collapsed ? it.label : undefined}
                title={collapsed ? it.label : undefined}
                className={cn(
                  "relative flex h-10 items-center gap-[var(--spacing-3)] rounded-[var(--radius-md)] px-[var(--spacing-3)] text-[length:var(--text-sm)] transition-colors duration-[var(--dur-fast)]",
                  active
                    ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-[2px] before:rounded-full before:bg-[var(--color-brand-600)]"
                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]",
                  collapsed && "justify-center px-0",
                )}
              >
                <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center">
                  {React.cloneElement(it.icon, { width: 18, height: 18 } as React.SVGAttributes<SVGElement>)}
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{it.label}</span>
                    {it.badge && (
                      <span className="inline-flex h-5 items-center justify-center rounded-full bg-[var(--color-accent-100)] px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-accent-700)]">{it.badge}</span>
                    )}
                  </>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Foot({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <div className="mt-[var(--spacing-6)] flex flex-col items-center gap-[var(--spacing-2)] pb-[var(--spacing-4)]">
        <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-100)] text-[length:var(--text-xs)] font-semibold text-[var(--color-brand-700)]">RR</span>
      </div>
    );
  }
  return (
    <div className="mt-[var(--spacing-6)] px-[var(--spacing-3)] pb-[var(--spacing-4)]">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-[var(--spacing-4)]">
        <div className="text-[length:var(--text-xs)] font-semibold text-[var(--color-fg)]">Free trial &middot; 7 days left</div>
        <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] leading-snug text-[var(--color-fg-muted)]">Upgrade to Team for SSO, audit log, and unlimited seats.</p>
        <a href="#upgrade" className="mt-[var(--spacing-3)] inline-flex h-8 w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand)] px-[var(--spacing-3)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-on-brand)] transition-[background-color] duration-[var(--dur-fast)] hover:bg-[var(--color-brand-hover)]">Upgrade</a>
      </div>
      <div className="mt-[var(--spacing-4)] flex items-center gap-[var(--spacing-3)] rounded-[var(--radius-md)] p-[var(--spacing-2)] hover:bg-[var(--color-surface-elevated)]">
        <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-100)] text-[length:var(--text-xs)] font-semibold text-[var(--color-brand-700)]">RR</span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">Rahul Raj</div>
          <div className="truncate text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">rahul@iamrraj.com</div>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
