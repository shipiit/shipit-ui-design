#!/bin/sh
# design-lint.sh — shipit-ui-design PostToolUse hook (Edit/Write).
# Informational only: warns on long files, bare hex, bare px in inline style props.
# Never blocks, never edits. POSIX sh, dependency-free.
#
# Hook contract: Claude Code passes a JSON event on stdin with shape
#   { "tool_input": { "file_path": "..." }, ... }.
# We try stdin JSON first; fall back to $CLAUDE_FILE_PATH if set.
# (build-time-verify: confirm exact key path on first plugin install run.)

set -u

# ---- 1. Locate the file path ------------------------------------------------
file=""
if [ ! -t 0 ]; then
  payload=$(cat 2>/dev/null || true)
  # crude JSON extraction — no jq dependency. Looks for "file_path":"..."
  case "$payload" in
    *'"file_path"'*)
      file=$(printf '%s' "$payload" \
        | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' \
        | head -n 1)
      ;;
  esac
fi
[ -z "$file" ] && file="${CLAUDE_FILE_PATH:-}"
[ -z "$file" ] && exit 0
[ -f "$file" ] || exit 0

# ---- 2. Filter by extension -------------------------------------------------
case "$file" in
  *.tsx|*.jsx|*.vue|*.svelte|*.css|*.scss) ;;
  *) exit 0 ;;
esac

warnings=0
emit() {
  if [ "$warnings" -eq 0 ]; then
    printf '\n[design-lint] %s\n' "$file"
  fi
  warnings=$((warnings + 1))
  printf '  - %s\n' "$1"
}

# ---- 3. Line-count check ----------------------------------------------------
lines=$(wc -l < "$file" 2>/dev/null | tr -d ' ')
[ -z "$lines" ] && lines=0
if [ "$lines" -gt 300 ]; then
  emit "file is $lines lines (>300). Constitution rule #1: split before writing."
fi

# ---- 4. Bare-hex check ------------------------------------------------------
# Match #RGB, #RGBA, #RRGGBB, #RRGGBBAA. Skip lines that look like CSS variable
# definitions (lines containing "--" before the hex). Skip comment lines.
hex_hits=$(
  grep -nE '#[0-9a-fA-F]{3,8}\b' "$file" 2>/dev/null \
    | grep -v -E '^[[:space:]]*(\*|//|/\*)' \
    | grep -v -E '^[^:]*:[[:space:]]*--[A-Za-z0-9_-]+[[:space:]]*:' \
    | grep -v -E '^[^:]*:[[:space:]]*--[A-Za-z0-9_-]+[[:space:]]*=' \
    | head -n 5
)
if [ -n "$hex_hits" ]; then
  emit "bare hex color(s) found — prefer CSS variables / tokens:"
  printf '%s\n' "$hex_hits" | while IFS= read -r line; do
    printf '      %s\n' "$line"
  done
fi

# ---- 5. Bare-px in inline style props ---------------------------------------
# Looks for style={{ ... <number>px ... }} (JSX), :style="{ ...px... }" (Vue),
# style="...px..." (Svelte/HTML).
px_hits=$(
  grep -nE '(style=\{\{[^}]*[0-9]+px|:style="[^"]*[0-9]+px|style="[^"]*[0-9]+px)' \
    "$file" 2>/dev/null | head -n 5
)
if [ -n "$px_hits" ]; then
  emit "bare px value(s) in inline style — prefer space/size tokens:"
  printf '%s\n' "$px_hits" | while IFS= read -r line; do
    printf '      %s\n' "$line"
  done
fi

# ---- 6. Done ----------------------------------------------------------------
[ "$warnings" -gt 0 ] && printf '\n'
exit 0
