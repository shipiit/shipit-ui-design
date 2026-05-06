// Tiny className concat helper — no clsx dependency.
// Filters falsy values (false, null, undefined, 0, "") and joins with a space.
export type ClassValue = string | number | null | undefined | false;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
