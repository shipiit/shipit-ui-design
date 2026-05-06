"use client";

import * as React from "react";
import { AppShell } from "@/components/demo/AppShell";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { MessageList, type Message } from "@/components/demo/inbox/MessageList";
import { MessageDetail, type MessageBody } from "@/components/demo/inbox/MessageDetail";

const MESSAGES: Message[] = [
  { id: "m1", initials: "PN", sender: "Priya from Acme", preview: "Quick question about the Team plan billing cycle — can we switch from monthly to annual mid-cycle?", date: "9:41", unread: true },
  { id: "m2", initials: "ST", sender: "Stripe receipts", preview: "Your invoice #1042 was paid. View receipt and download PDF.", date: "9:12", unread: true },
  { id: "m3", initials: "MD", sender: "Marco Diaz", preview: "Re: onboarding flow — agreed on the empty-state copy. Mind if I push the Figma update tonight?", date: "8:30", unread: true },
  { id: "m4", initials: "AT", sender: "Ari Tanaka", preview: "Approved the new pricing copy. Two minor nits inline if you want them, otherwise ship it.", date: "Tue", unread: false },
  { id: "m5", initials: "CI", sender: "GitHub Actions", preview: "Build #1408 passed on main. 0 type errors, 0 lint warnings, 132 unit tests passing.", date: "Tue", unread: false },
  { id: "m6", initials: "SK", sender: "Sarah Kim", preview: "Trial ends Friday — wanted to chat about pricing for the engineering org before we commit.", date: "Mon", unread: false },
  { id: "m7", initials: "MN", sender: "Lume Monitoring", preview: "Resolved: p99 latency is back below 1.0s after the index rebuild completed at 03:14 UTC.", date: "Mon", unread: false },
  { id: "m8", initials: "LW", sender: "Liu Wei", preview: "Flexlinear billing question — our finance team needs a custom invoice line for the SSO add-on.", date: "Sun", unread: false },
  { id: "m9", initials: "JH", sender: "Jane Hollis", preview: "Following up on the partnership thread — happy to jump on a quick call this week.", date: "Sun", unread: false },
  { id: "m10", initials: "OB", sender: "Owen Brooks", preview: "Got the demo working in our staging tenant. Two friction points worth flagging before we recommend.", date: "Fri", unread: false },
];

const BODIES: Record<string, MessageBody> = {
  m1: {
    id: "m1",
    subject: "Quick question about Team plan billing",
    sender: "Priya Nadella",
    email: "priya@acme.co",
    initials: "PN",
    ago: "today at 9:41",
    paragraphs: [
      "Hi team — we’re finalizing budget for Q3 and I’d love to switch our Acme workspace from monthly to annual on the Team plan. Two questions before we pull the trigger:",
      "1. Can we change cycle mid-period and have the unused monthly balance applied as credit toward the annual invoice? Our finance team would prefer that to a refund.",
      "2. The annual plan page mentions “unlimited seats.” Is that truly unlimited, or is there a soft cap where you start a conversation? We expect to grow from 18 to roughly 60 seats over the next two quarters.",
      "Either way, the product has been a real upgrade for us — the audit log has already paid for the year. Looking forward to going deeper.",
    ],
    replies: [
      { who: "Rahul Raj", initials: "RR", ago: "8 min ago", body: "Thanks Priya — yes, mid-cycle switches credit forward automatically. I’ll send you a quick comparison and the upgrade link in a separate thread." },
      { who: "Priya Nadella", initials: "PN", ago: "3 min ago", body: "Perfect, that works. Looping in our finance lead so the credit lands on the right cost center." },
    ],
  },
  m2: {
    id: "m2",
    subject: "Invoice #1042 paid · $480.00",
    sender: "Stripe receipts",
    email: "no-reply@stripe.com",
    initials: "ST",
    ago: "today at 9:12",
    paragraphs: [
      "Stripe captured $480.00 from invoice #1042 against the card ending 4242. Funds will settle in your connected account within two business days.",
      "Receipt details, line items, and the downloadable PDF are available in your Stripe Dashboard. If you didn’t expect this charge, reply to this thread and the support team will look it up by reference ID re_2NQ1C9HshnRYS5.",
    ],
    replies: [],
  },
  m3: {
    id: "m3",
    subject: "Re: onboarding flow",
    sender: "Marco Diaz",
    email: "marco@bytecase.io",
    initials: "MD",
    ago: "today at 8:30",
    paragraphs: [
      "Loved the empty-state copy you shared in the doc. The “your workspace is quiet” framing reads warmer than the placeholder we had — going to use it as the canonical voice for the rest of the surfaces.",
      "I’ll push the Figma file with the three CTA variants tonight so the team can comment async. Can we ship the fastest variant on Wednesday and A/B the rest after?",
    ],
    replies: [
      { who: "Rahul Raj", initials: "RR", ago: "12 min ago", body: "Wednesday works. Make sure the “Add your first source” CTA is the filled-brand variant and the others are ghost so we don’t triple-stack primaries." },
    ],
  },
};

export default function InboxPage() {
  const [selectedId, setSelectedId] = React.useState<string>("m1");
  const [showList, setShowList] = React.useState(true);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setShowList(true);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (window.innerWidth < 768) setShowList(false);
  };

  const body = BODIES[selectedId] ?? BODIES["m1"];

  return (
    <AppShell title="Lume" activeKey="inbox">
      <div className="relative -mx-[var(--spacing-4)] -my-[var(--spacing-4)] sm:-mx-[var(--spacing-6)] sm:-my-[var(--spacing-6)] lg:-mx-[var(--spacing-8)] lg:-my-[var(--spacing-8)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <Backdrop3D variant="soft-mesh" />
        </div>
        <div className="flex min-h-[calc(100dvh-56px)] flex-col md:flex-row">
          <div className={showList ? "block" : "hidden md:block"}>
            <MessageList messages={MESSAGES} selectedId={selectedId} onSelect={handleSelect} />
          </div>
          <div className={`min-w-0 flex-1 ${showList ? "hidden md:block" : "block"}`}>
            <div className="flex items-center gap-[var(--spacing-2)] border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-[var(--spacing-4)] py-[var(--spacing-2)] md:hidden">
              <button
                type="button"
                onClick={() => setShowList(true)}
                aria-label="Back to inbox"
                className="inline-flex h-8 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] px-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
                Back
              </button>
            </div>
            <MessageDetail msg={body} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
