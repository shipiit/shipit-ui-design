"use client";

import * as React from "react";

const FRAMEWORKS = ["React", "Vue", "Svelte", "Solid", "Angular", "Astro", "Qwik"];
const TAG_SUGGESTIONS = ["design", "dev", "marketing"];

export function InputGallery() {
  return (
    <ul className="grid gap-[var(--spacing-5)] md:grid-cols-2">
      <li><Field label="Text input" helper="Single-line free text."><TextInput /></Field></li>
      <li><Field label="Search" helper="Leading icon, clear button on input."><SearchInput /></Field></li>
      <li><Field label="Textarea" helper="Auto-grows; live character counter."><AutoTextarea /></Field></li>
      <li><Field label="Number" helper="Stepper buttons; tabular numerals."><NumberInput /></Field></li>
      <li><Field label="Select" helper="Native select with custom chevron."><SelectInput /></Field></li>
      <li><Field label="Date" helper="Visual-only popover with hand-rolled calendar."><DateInput /></Field></li>
      <li className="md:col-span-2"><Field label="Combobox" helper="Filterable autocomplete."><Combobox /></Field></li>
      <li className="md:col-span-2"><Field label="Multi-select chips" helper="Add multiple values; remove via chip × or Backspace."><MultiSelect /></Field></li>
      <li className="md:col-span-2"><Field label="Tag input" helper="Press Enter or comma to commit a tag."><TagInput /></Field></li>
      <li><Field label="File upload" helper="Drag-drop zone; native input under the hood."><FileDrop /></Field></li>
      <li><Field label="Toggle switch" helper="aria-checked is the source of truth."><ToggleRow /></Field></li>
      <li><Field label="Checkbox group" helper="Pick any combination."><CheckboxGroup /></Field></li>
      <li><Field label="Radio group" helper="Pick exactly one."><RadioGroup /></Field></li>
      <li className="md:col-span-2"><Field label="Slider" helper="Range with live tooltip."><Slider /></Field></li>
    </ul>
  );
}

function Field({ label, helper, children }: { label: string; helper: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--spacing-2)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)]">
      <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">{label}</p>
      <div>{children}</div>
      <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{helper}</p>
    </div>
  );
}

const inputCls =
  "h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition-[border-color,box-shadow] duration-[var(--dur-fast)] hover:border-[var(--color-fg-subtle)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--color-brand-500)_28%,transparent)] disabled:cursor-not-allowed disabled:opacity-60";

function TextInput() {
  const id = React.useId();
  return <input id={id} type="text" className={inputCls} placeholder="Ada Reyes" defaultValue="Ada Reyes" />;
}

function SearchInput() {
  const [v, setV] = React.useState("design tokens");
  return (
    <div className="relative">
      <span aria-hidden="true" className="pointer-events-none absolute left-[var(--spacing-3)] top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      </span>
      <input value={v} onChange={(e) => setV(e.target.value)} type="search" className={`${inputCls} pl-[var(--spacing-8)] pr-[var(--spacing-8)]`} placeholder="Search anything…" />
      {v && (
        <button type="button" aria-label="Clear search" onClick={() => setV("")} className="absolute right-[var(--spacing-2)] top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}

function AutoTextarea() {
  const ref = React.useRef<HTMLTextAreaElement | null>(null);
  const [v, setV] = React.useState("Audit-friendly tokens, dark mode by default, motion respects prefers-reduced-motion.");
  const max = 280;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [v]);
  return (
    <div>
      <textarea ref={ref} value={v} onChange={(e) => setV(e.target.value.slice(0, max))} rows={3} className={`${inputCls} h-auto min-h-[6rem] resize-none py-[var(--spacing-2)]`} placeholder="What's on your mind?" />
      <p className="mt-[var(--spacing-1)] text-right text-[length:var(--text-xs)] text-[var(--color-fg-subtle)] tabular-nums">{v.length}/{max}</p>
    </div>
  );
}

function NumberInput() {
  const [n, setN] = React.useState(3);
  const stepBtn = "grid h-7 w-7 place-items-center rounded-[var(--radius-sm)] text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]";
  return (
    <div className={`${inputCls} flex items-center gap-[var(--spacing-2)] !pr-[var(--spacing-1)]`}>
      <input value={n} onChange={(e) => setN(Number(e.target.value) || 0)} type="number" className="h-full flex-1 bg-transparent tabular-nums outline-none" />
      <button type="button" aria-label="Decrement" onClick={() => setN((x) => Math.max(0, x - 1))} className={stepBtn}>−</button>
      <button type="button" aria-label="Increment" onClick={() => setN((x) => x + 1)} className={stepBtn}>+</button>
    </div>
  );
}

function SelectInput() {
  return (
    <div className="relative">
      <select className={`${inputCls} appearance-none pr-[var(--spacing-8)]`} defaultValue="us">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-[var(--spacing-3)] top-1/2 -translate-y-1/2 text-[var(--color-fg-muted)]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </span>
    </div>
  );
}

function DateInput() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date(2026, 4, 12));
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const fmt = date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(startDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="dialog" aria-expanded={open} className={`${inputCls} flex items-center justify-between text-left`}>
        <span>{fmt}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
      </button>
      {open && (
        <div role="dialog" aria-label="Pick a date" className="absolute left-0 top-[calc(100%+var(--spacing-1))] z-20 w-[18rem] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-overlay)] p-[var(--spacing-3)] shadow-[var(--shadow-lg)]">
          <div className="mb-[var(--spacing-2)] flex items-center justify-between">
            <span className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">{date.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</span>
            <div className="flex gap-[var(--spacing-1)]">
              <NavBtn label="Previous month" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>‹</NavBtn>
              <NavBtn label="Next month" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>›</NavBtn>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-[2px] text-center text-[length:var(--text-2xs)] uppercase tracking-wider text-[var(--color-fg-subtle)]">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="mt-[var(--spacing-1)] grid grid-cols-7 gap-[2px]">
            {cells.map((d, i) => d == null ? <span key={i} /> : (
              <button key={i} type="button" onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth(), d)); setOpen(false); }} aria-pressed={date.getDate() === d} className={`grid h-8 w-full place-items-center rounded-[var(--radius-sm)] text-[length:var(--text-xs)] tabular-nums transition-colors hover:bg-[var(--color-surface-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] ${date.getDate() === d ? "bg-[var(--color-brand-600)] text-[var(--color-fg-on-brand)] font-semibold hover:bg-[var(--color-brand-700)]" : "text-[var(--color-fg)]"}`}>{d}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NavBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} onClick={onClick} className="grid h-7 w-7 place-items-center rounded-[var(--radius-sm)] text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]">{children}</button>;
}

function Combobox() {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [pick, setPick] = React.useState("React");
  const filtered = FRAMEWORKS.filter((f) => f.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="relative">
      <input value={q || (open ? "" : pick)} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)} className={inputCls} placeholder="Pick a framework" />
      {open && filtered.length > 0 && (
        <ul role="listbox" className="absolute left-0 top-[calc(100%+var(--spacing-1))] z-20 max-h-48 w-full overflow-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-overlay)] py-[var(--spacing-1)] shadow-[var(--shadow-lg)]">
          {filtered.map((f) => (
            <li key={f}>
              <button type="button" onMouseDown={(e) => { e.preventDefault(); setPick(f); setQ(""); setOpen(false); }} className={`flex w-full items-center justify-between px-[var(--spacing-3)] py-[var(--spacing-2)] text-left text-[length:var(--text-sm)] hover:bg-[var(--color-surface-elevated)] ${pick === f ? "text-[var(--color-brand-700)]" : "text-[var(--color-fg)]"}`}>
                <span>{f}</span>
                {pick === f && <span aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MultiSelect() {
  const [chips, setChips] = React.useState(["React", "Svelte"]);
  const remaining = FRAMEWORKS.filter((f) => !chips.includes(f));
  return (
    <div className="flex flex-wrap items-center gap-[var(--spacing-1)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--spacing-2)] focus-within:border-[var(--color-brand-500)] focus-within:ring-2 focus-within:ring-[color-mix(in_oklch,var(--color-brand-500)_28%,transparent)]">
      {chips.map((c) => (
        <span key={c} className="inline-flex items-center gap-[var(--spacing-1)] rounded-full bg-[var(--color-brand-50)] py-[2px] pl-[var(--spacing-2)] pr-[var(--spacing-1)] text-[length:var(--text-xs)] font-medium text-[var(--color-brand-700)]">
          {c}
          <button type="button" aria-label={`Remove ${c}`} onClick={() => setChips((cs) => cs.filter((x) => x !== c))} className="grid h-4 w-4 place-items-center rounded-full hover:bg-[var(--color-brand-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]">×</button>
        </span>
      ))}
      <select onChange={(e) => { if (e.target.value) { setChips((c) => [...c, e.target.value]); e.currentTarget.value = ""; } }} className="h-7 flex-1 min-w-[8ch] bg-transparent text-[length:var(--text-sm)] text-[var(--color-fg)] outline-none" defaultValue="">
        <option value="" disabled>Add framework…</option>
        {remaining.map((f) => <option key={f} value={f}>{f}</option>)}
      </select>
    </div>
  );
}

function TagInput() {
  const [tags, setTags] = React.useState<string[]>(["design"]);
  const [v, setV] = React.useState("");
  const commit = () => { const t = v.trim().replace(/,$/, ""); if (t && !tags.includes(t)) setTags((x) => [...x, t]); setV(""); };
  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-[var(--spacing-1)] !h-auto min-h-[2.5rem] py-[var(--spacing-1)]`}>
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-[var(--spacing-1)] rounded-full bg-[var(--color-accent-50)] py-[2px] pl-[var(--spacing-2)] pr-[var(--spacing-1)] text-[length:var(--text-xs)] font-medium text-[var(--color-accent-700)]">
          #{t}
          <button type="button" aria-label={`Remove ${t}`} onClick={() => setTags((x) => x.filter((y) => y !== t))} className="grid h-4 w-4 place-items-center rounded-full hover:bg-[var(--color-accent-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]">×</button>
        </span>
      ))}
      <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); commit(); } else if (e.key === "Backspace" && !v && tags.length) { setTags((x) => x.slice(0, -1)); } }} className="h-7 flex-1 min-w-[10ch] bg-transparent outline-none" placeholder={tags.length ? "" : `try: ${TAG_SUGGESTIONS.join(", ")}`} />
    </div>
  );
}

function FileDrop() {
  const id = React.useId();
  const [hover, setHover] = React.useState(false);
  return (
    <label htmlFor={id} onDragOver={(e) => { e.preventDefault(); setHover(true); }} onDragLeave={() => setHover(false)} onDrop={(e) => { e.preventDefault(); setHover(false); }} className="flex cursor-pointer flex-col items-center gap-[var(--spacing-1)] rounded-[var(--radius-md)] border-2 border-dashed p-[var(--spacing-4)] text-center transition-colors duration-[var(--dur-fast)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-ring)]" style={{ borderColor: hover ? "var(--color-brand-500)" : "var(--color-border)", background: hover ? "var(--color-brand-50)" : "var(--color-surface)" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--color-fg-muted)]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5M12 3v12" /></svg>
      <span className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">Drop a file or browse</span>
      <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">PNG, SVG, PDF up to 10 MB</span>
      <input id={id} type="file" className="sr-only" />
    </label>
  );
}

function ToggleRow() {
  return (
    <label className="group inline-flex cursor-pointer items-center gap-[var(--spacing-3)]">
      <input type="checkbox" defaultChecked className="peer sr-only" aria-label="Notifications" />
      <span aria-hidden="true" className="relative inline-flex h-6 w-11 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] transition-colors duration-[var(--dur-fast)] peer-checked:border-transparent peer-checked:bg-[var(--color-brand-600)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-ring)] peer-focus-visible:ring-offset-2">
        <span className="ml-1 inline-block h-4 w-4 rounded-full bg-white shadow-[var(--shadow-sm)] transition-transform duration-[var(--dur-fast)] group-has-[:checked]:translate-x-5" />
      </span>
      <span className="text-[length:var(--text-sm)] text-[var(--color-fg)]">Notifications</span>
    </label>
  );
}

function CheckboxGroup() {
  const items = ["Email", "Push", "SMS"];
  const [picked, setPicked] = React.useState<string[]>(["Email"]);
  return (
    <div className="flex flex-col gap-[var(--spacing-1)]">
      {items.map((it) => {
        const on = picked.includes(it);
        return (
          <label key={it} className="flex cursor-pointer items-center gap-[var(--spacing-2)] rounded-[var(--radius-sm)] px-[var(--spacing-1)] py-[2px] text-[length:var(--text-sm)] text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)]">
            <input type="checkbox" checked={on} onChange={() => setPicked((p) => on ? p.filter((x) => x !== it) : [...p, it])} className="peer sr-only" />
            <span aria-hidden="true" className={`grid h-4 w-4 place-items-center rounded-[var(--radius-sm)] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-ring)] peer-focus-visible:ring-offset-2 ${on ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"}`}>
              {on && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.5l2.5 2.5 4.5-5" /></svg>}
            </span>
            {it}
          </label>
        );
      })}
    </div>
  );
}

function RadioGroup() {
  const items = ["Light", "Dark", "System"];
  const [v, setV] = React.useState("System");
  return (
    <div role="radiogroup" aria-label="Theme" className="flex flex-col gap-[var(--spacing-1)]">
      {items.map((it) => {
        const on = v === it;
        return (
          <label key={it} className="flex cursor-pointer items-center gap-[var(--spacing-2)] rounded-[var(--radius-sm)] px-[var(--spacing-1)] py-[2px] text-[length:var(--text-sm)] text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)]">
            <input type="radio" name="theme" checked={on} onChange={() => setV(it)} className="peer sr-only" />
            <span aria-hidden="true" className={`grid h-4 w-4 place-items-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-ring)] peer-focus-visible:ring-offset-2 ${on ? "border-[var(--color-brand-600)]" : "border-[var(--color-border)]"}`}>
              {on && <span className="h-2 w-2 rounded-full bg-[var(--color-brand-600)]" />}
            </span>
            {it}
          </label>
        );
      })}
    </div>
  );
}

function Slider() {
  const [v, setV] = React.useState(60);
  return (
    <div className="relative pt-[var(--spacing-6)]">
      <span aria-hidden="true" className="absolute top-0 -translate-x-1/2 rounded-[var(--radius-sm)] bg-[var(--color-fg)] px-[var(--spacing-2)] py-[2px] text-[length:var(--text-2xs)] font-semibold text-[var(--color-bg)] tabular-nums" style={{ left: `${v}%` }}>{v}</span>
      <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} aria-label="Volume" className="w-full appearance-none rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-brand-600)] [&::-webkit-slider-thumb]:shadow-[var(--shadow-sm)] [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-brand-600)] [&::-moz-range-thumb]:border-0" style={{ background: `linear-gradient(to right, var(--color-brand-500) 0%, var(--color-brand-500) ${v}%, var(--color-surface-elevated) ${v}%)`, height: "6px" }} />
    </div>
  );
}

export default InputGallery;
