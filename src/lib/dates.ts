export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function getWeekDates(referenceDate?: string): string[] {
  const date = referenceDate
    ? new Date(referenceDate + "T12:00:00")
    : new Date();
  const day = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((day + 6) % 7));

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export function getWeekStart(referenceDate?: string): string {
  return getWeekDates(referenceDate)[0];
}

export function getPreviousWeekStart(weekStart: string): string {
  const date = new Date(weekStart + "T12:00:00");
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0];
}

export function daysAgo(n: number): string {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
}

export function getShortDay(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short" });
}
