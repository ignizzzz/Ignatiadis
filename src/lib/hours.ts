import type { StoreLocation } from "@/lib/types";

/** Current day-of-week (0 = Sun) and minutes-from-midnight in Europe/London. */
function nowInLondon(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = dayNames.indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day, minutes: hour * 60 + minute };
}

export type OpenState =
  | { open: true; closesAt: string }
  | { open: false; reason: "closed-today" | "before-open" | "after-close"; opensNext: string };

function formatMinutes(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

/** Whether the store is open right now (London time). */
export function getOpenState(location: StoreLocation): OpenState | null {
  if (!location.schedule) return null;
  const { day, minutes } = nowInLondon();
  const today = location.schedule[day];

  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true, closesAt: formatMinutes(today.close) };
  }

  // Find the next opening time for messaging.
  for (let offset = 0; offset < 7; offset++) {
    const d = (day + offset) % 7;
    const slot = location.schedule[d];
    if (!slot) continue;
    if (offset === 0 && minutes >= slot.close) continue;
    if (offset === 0 && minutes < slot.open) {
      return { open: false, reason: "before-open", opensNext: `today at ${formatMinutes(slot.open)}` };
    }
    if (offset > 0) {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const label = offset === 1 ? "tomorrow" : dayNames[d];
      return { open: false, reason: "after-close", opensNext: `${label} at ${formatMinutes(slot.open)}` };
    }
  }
  return { open: false, reason: "closed-today", opensNext: "soon" };
}

/** Check a UK postcode against a location's delivery zones (prefix match). */
export function isPostcodeDeliverable(
  location: StoreLocation,
  postcode: string
): boolean {
  if (!location.deliveryZones) return false;
  const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, "");
  if (cleaned.length < 2) return false;
  return location.deliveryZones.some((zone) => cleaned.startsWith(zone));
}
