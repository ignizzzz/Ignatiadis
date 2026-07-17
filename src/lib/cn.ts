/** Minimal className joiner — keeps us dependency-free. */
export function cn(
  ...parts: Array<string | number | bigint | boolean | null | undefined>
): string {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0).join(" ");
}
