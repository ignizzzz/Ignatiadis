import type { StoreLocation } from "@/lib/types";

/**
 * One fictional London flagship plus coming-soon placeholders.
 * Addresses are invented for this concept — do not map to real venues.
 */
export const LOCATIONS: StoreLocation[] = [
  {
    id: "soho",
    name: "FETA POP Soho",
    city: "London",
    status: "open",
    addressLines: ["Unit 3, 24 Meliora Yard", "Soho, London W1F 0PP"],
    hours: [
      { days: "Mon – Fri", hours: "11:00 – 21:00" },
      { days: "Saturday", hours: "11:00 – 22:00" },
      { days: "Sunday", hours: "12:00 – 19:00" },
    ],
    // Minutes from midnight, keyed 0 (Sun) – 6 (Sat)
    schedule: {
      0: { open: 12 * 60, close: 19 * 60 },
      1: { open: 11 * 60, close: 21 * 60 },
      2: { open: 11 * 60, close: 21 * 60 },
      3: { open: 11 * 60, close: 21 * 60 },
      4: { open: 11 * 60, close: 21 * 60 },
      5: { open: 11 * 60, close: 21 * 60 },
      6: { open: 11 * 60, close: 22 * 60 },
    },
    services: ["Takeaway", "Delivery", "Standing counter", "Order ahead"],
    pickup: true,
    delivery: true,
    deliveryZones: ["W1", "WC1", "WC2", "SW1", "NW1", "EC1"],
    accessibility: [
      "Step-free entrance",
      "Accessible counter height",
      "Assistance dogs welcome",
    ],
    menuNotes: "Full menu, plus the Soho-only Seasonal Pop when it drops.",
    specialHoursNote: "Bank holidays: 12:00 – 18:00.",
    directionsUrl:
      "https://maps.google.com/?q=Soho%2C+London", // placeholder — replace with the real pin
  },
  {
    id: "shoreditch",
    name: "FETA POP Shoreditch",
    city: "London",
    status: "coming-soon",
    openingNote: "Opening spring 2027",
  },
  {
    id: "manchester",
    name: "FETA POP Manchester",
    city: "Manchester",
    status: "coming-soon",
    openingNote: "Scouting the perfect corner",
  },
  {
    id: "berlin",
    name: "FETA POP Berlin",
    city: "Berlin",
    status: "coming-soon",
    openingNote: "In the works",
  },
];

export const FLAGSHIP = LOCATIONS[0];

export function getLocation(id: string): StoreLocation | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

export const OPEN_LOCATIONS = LOCATIONS.filter((l) => l.status === "open");
