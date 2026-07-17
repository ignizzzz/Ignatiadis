/** Format pence as GBP, e.g. 495 -> "£4.95". */
export function formatPrice(pence: number): string {
  const pounds = pence / 100;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: pounds % 1 === 0 ? 0 : 2,
  }).format(pounds);
}

export function formatCalories(kcal: number | undefined): string | null {
  if (kcal === undefined) return null;
  return `${kcal} kcal`;
}
