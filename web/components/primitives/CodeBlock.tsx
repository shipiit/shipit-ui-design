"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  caption?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

type TokenType =
  | "comment" | "keyword" | "string" | "number" | "fn" | "type" | "property"
  | "punctuation" | "command" | "flag" | "arg" | "selector" | "css-prop"
  | "css-value" | "css-keyword" | "css-var" | "at-rule" | "plain";

interface Token { type: TokenType; value: string }

const STYLES: Record<TokenType, React.CSSProperties> = {
  comment: { color: "var(--color-fg-muted)", fontStyle: "italic" },
  keyword: { color: "var(--color-brand-400)", fontWeight: 500 },
  string: { color: "var(--color-accent-300)" },
  number: { color: "var(--color-accent-400)" },
  fn: { color: "var(--color-brand-500)" },
  type: { color: "var(--color-brand-300)" },
  property: { color: "var(--color-fg-muted)" },
  punctuation: { color: "var(--color-fg)" },
  command: { color: "var(--color-brand-500)", fontWeight: 600 },
  flag: { color: "var(--color-accent-400)" },
  arg: { color: "var(--color-fg-muted)" },
  selector: { color: "var(--color-brand-400)" },
  "css-prop": { color: "var(--color-fg)", fontWeight: 500 },
  "css-value": { color: "var(--color-accent-300)" },
  "css-keyword": { color: "var(--color-fg-muted)" },
  "css-var": { color: "var(--color-brand-300)", fontWeight: 500 },
  "at-rule": { color: "var(--color-brand-400)", fontWeight: 600 },
  plain: { color: "var(--color-fg)" },
};

const JS_KW = new Set(["const","let","var","function","import","export","return","if","else","async","await","class","interface","type","from","default","new","for","while","do","switch","case","break","continue","throw","try","catch","finally","of","in","as","extends","implements"]);

function tokTsx(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "/") {
      const e = src.indexOf("\n", i); const s = e === -1 ? src.length : e;
      out.push({ type: "comment", value: src.slice(i, s) }); i = s; continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      const e = src.indexOf("*/", i + 2); const s = e === -1 ? src.length : e + 2;
      out.push({ type: "comment", value: src.slice(i, s) }); i = s; continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === c) { j++; break; }
        j++;
      }
      out.push({ type: "string", value: src.slice(i, j) }); i = j; continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++;
      out.push({ type: "number", value: src.slice(i, j) }); i = j; continue;
    }
    if (/[A-Za-z_$]/.test(c)) {
      let j = i; while (j < src.length && /[A-Za-z0-9_$]/.test(src[j])) j++;
      const w = src.slice(i, j);
      const prev = out[out.length - 1];
      const dot = prev && prev.type === "punctuation" && prev.value.endsWith(".");
      let t: TokenType;
      if (dot) t = "property";
      else if (JS_KW.has(w)) t = "keyword";
      else if (/^[A-Z]/.test(w)) t = "type";
      else if (src[j] === "(") t = "fn";
      else t = "plain";
      out.push({ type: t, value: w }); i = j; continue;
    }
    if (/\s/.test(c)) {
      let j = i; while (j < src.length && /\s/.test(src[j])) j++;
      out.push({ type: "plain", value: src.slice(i, j) }); i = j; continue;
    }
    out.push({ type: "punctuation", value: c }); i++;
  }
  return out;
}

function tokBash(src: string): Token[] {
  const out: Token[] = [];
  for (const seg of src.split(/(\n)/)) {
    if (seg === "" ) continue;
    if (seg === "\n") { out.push({ type: "plain", value: "\n" }); continue; }
    let i = 0; let sawCmd = false;
    while (i < seg.length && /[ \t]/.test(seg[i])) i++;
    if (i > 0) out.push({ type: "plain", value: seg.slice(0, i) });
    if (seg[i] === "$" || seg[i] === "#" || seg[i] === ">") {
      out.push({ type: "comment", value: seg[i] }); i++;
      while (i < seg.length && /[ \t]/.test(seg[i])) { out.push({ type: "plain", value: seg[i] }); i++; }
    }
    while (i < seg.length) {
      const c = seg[i];
      if (c === "#") { out.push({ type: "comment", value: seg.slice(i) }); i = seg.length; break; }
      if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < seg.length && seg[j] !== c) { if (seg[j] === "\\") j += 2; else j++; }
        if (j < seg.length) j++;
        out.push({ type: "string", value: seg.slice(i, j) }); i = j; continue;
      }
      if (/[ \t]/.test(c)) {
        let j = i; while (j < seg.length && /[ \t]/.test(seg[j])) j++;
        out.push({ type: "plain", value: seg.slice(i, j) }); i = j; continue;
      }
      let j = i; while (j < seg.length && !/[ \t"']/.test(seg[j])) j++;
      const w = seg.slice(i, j);
      if (!sawCmd) { out.push({ type: "command", value: w }); sawCmd = true; }
      else if (w.startsWith("-")) out.push({ type: "flag", value: w });
      else if (/^[0-9]+$/.test(w)) out.push({ type: "number", value: w });
      else out.push({ type: "arg", value: w });
      i = j;
    }
  }
  return out;
}

function tokCss(src: string): Token[] {
  const out: Token[] = [];
  let i = 0; let depth = 0; let afterColon = false;
  while (i < src.length) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "*") {
      const e = src.indexOf("*/", i + 2); const s = e === -1 ? src.length : e + 2;
      out.push({ type: "comment", value: src.slice(i, s) }); i = s; continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== c) { if (src[j] === "\\") j += 2; else j++; }
      if (j < src.length) j++;
      out.push({ type: "css-value", value: src.slice(i, j) }); i = j; continue;
    }
    if (c === "@") {
      let j = i + 1; while (j < src.length && /[A-Za-z-]/.test(src[j])) j++;
      out.push({ type: "at-rule", value: src.slice(i, j) }); i = j; continue;
    }
    if (c === "-" && src[i + 1] === "-") {
      let j = i + 2; while (j < src.length && /[A-Za-z0-9-]/.test(src[j])) j++;
      out.push({ type: "css-var", value: src.slice(i, j) }); i = j; continue;
    }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1] ?? ""))) {
      let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++;
      while (j < src.length && /[A-Za-z%]/.test(src[j])) j++;
      out.push({ type: "number", value: src.slice(i, j) }); i = j; continue;
    }
    if (c === "{") { depth++; afterColon = false; out.push({ type: "punctuation", value: c }); i++; continue; }
    if (c === "}") { depth = Math.max(0, depth - 1); afterColon = false; out.push({ type: "punctuation", value: c }); i++; continue; }
    if (c === ":") { afterColon = true; out.push({ type: "punctuation", value: c }); i++; continue; }
    if (c === ";") { afterColon = false; out.push({ type: "punctuation", value: c }); i++; continue; }
    if (/[A-Za-z_.#&*]/.test(c)) {
      let j = i;
      if (/[.#&*]/.test(src[j])) j++;
      while (j < src.length && /[A-Za-z0-9_-]/.test(src[j])) j++;
      if (j === i) j = i + 1;
      const w = src.slice(i, j);
      const t: TokenType = afterColon ? "css-keyword" : depth > 0 ? "css-prop" : "selector";
      out.push({ type: t, value: w }); i = j; continue;
    }
    if (/\s/.test(c)) {
      let j = i; while (j < src.length && /\s/.test(src[j])) j++;
      out.push({ type: "plain", value: src.slice(i, j) }); i = j; continue;
    }
    out.push({ type: "punctuation", value: c }); i++;
  }
  return out;
}

function tokenize(code: string, lang: string): Token[] {
  const l = lang.toLowerCase();
  if (["tsx","jsx","ts","js","javascript","typescript"].includes(l)) return tokTsx(code);
  if (["bash","shell","sh","zsh"].includes(l)) return tokBash(code);
  if (l === "css") return tokCss(code);
  return [{ type: "plain", value: code }];
}

function splitLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const t of tokens) {
    if (!t.value.includes("\n")) { lines[lines.length - 1].push(t); continue; }
    const parts = t.value.split("\n");
    for (let k = 0; k < parts.length; k++) {
      if (parts[k]) lines[lines.length - 1].push({ type: t.type, value: parts[k] });
      if (k < parts.length - 1) lines.push([]);
    }
  }
  return lines;
}

export function CodeBlock({
  code, language = "bash", showCopy = true, caption,
  showLineNumbers = false, highlightLines, className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  }, [code]);

  React.useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);

  const lines = React.useMemo(() => splitLines(tokenize(code, language)), [code, language]);
  const hl = React.useMemo(() => new Set(highlightLines ?? []), [highlightLines]);

  const dot = (bg: string) => (<span className="h-3 w-3 rounded-full" style={{ background: bg }} />);
  const lineStyle = (on: boolean): React.CSSProperties => on ? {
    display: "block", paddingLeft: "calc(var(--spacing-3) - 2px)",
    marginLeft: "calc(-1 * var(--spacing-3))", paddingRight: "var(--spacing-3)",
    marginRight: "calc(-1 * var(--spacing-3))", borderLeft: "2px solid var(--color-brand-500)",
    background: "color-mix(in oklab, var(--color-brand-50) 40%, transparent)",
  } : { display: "block" };

  return (
    <figure className={cn("text-left", className)}>
      {caption && (
        <figcaption className="font-[var(--font-mono)]" style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-subtle)", marginBottom: "var(--spacing-2)" }}>{caption}</figcaption>
      )}
      <div
        className={cn("overflow-hidden transition-shadow rounded-[var(--radius-xl)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:shadow-[var(--shadow-sm)]")}
        style={{ transitionDuration: "var(--dur-default)" }}
      >
        <div className="flex items-center gap-3 px-4" style={{ height: "36px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-border-subtle)" }}>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {dot("var(--color-accent-500)")}{dot("var(--color-accent-400)")}{dot("var(--color-brand-400)")}
          </div>
          <div className="flex-1" />
          <span className="font-[var(--font-mono)]" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{language}</span>
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied to clipboard" : "Copy code"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[var(--radius-md)] px-2.5 h-7 text-[length:var(--text-xs)] font-medium",
                "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] bg-transparent hover:bg-[var(--color-surface-elevated)]",
                "border border-[var(--color-border-subtle)] transition-[color,background-color,transform] duration-[var(--dur-fast)]",
                "active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2",
                copied && "text-[var(--color-brand)] border-[var(--color-brand)]/40",
              )}
            >
              <CopyIcon copied={copied} />
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          )}
        </div>
        <pre role="region" aria-label={caption ?? "Code sample"} className="overflow-x-auto font-[var(--font-mono)]"
          style={{ padding: "var(--spacing-5) var(--spacing-6)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--color-fg)" }}
        >
          <code className={`language-${language}`}>
            {lines.map((line, idx) => (
              <span key={idx} style={lineStyle(hl.has(idx + 1))}>
                {showLineNumbers && (
                  <span aria-hidden="true" style={{ display: "inline-block", width: "2.25rem", paddingRight: "var(--spacing-3)", textAlign: "right", color: "var(--color-fg-subtle)", userSelect: "none" }}>{idx + 1}</span>
                )}
                {line.length === 0 ? "​" : line.map((tok, ti) => (
                  <span key={ti} style={STYLES[tok.type]}>{tok.value}</span>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </figure>
  );
}

function CopyIcon({ copied }: { copied: boolean }) {
  const p = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return copied
    ? (<svg {...p} strokeWidth={2.25} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>)
    : (<svg {...p} strokeWidth={2} aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>);
}

export default CodeBlock;
