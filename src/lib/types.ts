/** Menu categories shown on /menu, in display order. */
export type CategoryId =
  | "signature"
  | "sweet-spicy"
  | "savoury"
  | "share"
  | "sides"
  | "dips"
  | "drinks";

export type FlavourTag = "sweet" | "spicy" | "savoury";

export type Allergen =
  | "milk"
  | "gluten"
  | "sesame"
  | "nuts"
  | "sulphites"
  | "celery";

/** Brand accent used for placeholder art and card theming. */
export type AccentColour = "honey" | "coral" | "olive" | "blue";

export interface Product {
  id: string;
  name: string;
  /** Short punchy line used on cards. */
  description: string;
  category: CategoryId;
  /** Price in pence (GBP). Placeholder values — configure before launch. */
  price: number;
  /** Placeholder calorie figure. Remove or verify before launch. */
  calories?: number;
  flavours: FlavourTag[];
  vegetarian: boolean;
  containsNuts: boolean;
  allergens: Allergen[];
  accent: AccentColour;
  /**
   * Optional real photograph, relative to /public (e.g. "/images/products/the-classic.jpg").
   * When absent, the branded placeholder illustration renders instead.
   */
  photo?: string;
  /** Alt text for the product visual. */
  imageAlt: string;
  /** Short label like "Best seller" or "Seasonal". */
  badge?: string;
  /** Whether the product appears in the homepage top sellers. */
  isTopSeller?: boolean;
  /** Whether toppings/dips can be customized in the order flow. */
  customizable?: boolean;
  /** Location ids where the product is currently sold out. */
  soldOutAt?: string[];
  /** Ingredient chips revealed on hover / shown in the order sheet. */
  ingredients?: string[];
}

export interface Topping {
  id: string;
  name: string;
  /** Price in pence. */
  price: number;
  containsNuts?: boolean;
}

export type LocationStatus = "open" | "coming-soon";

export interface DayHours {
  /** e.g. "Mon – Fri" */
  days: string;
  /** e.g. "11:00 – 21:00", or "Closed" */
  hours: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  status: LocationStatus;
  /** e.g. "Opening spring 2027" for coming-soon spots. */
  openingNote?: string;
  addressLines?: string[];
  hours?: DayHours[];
  /** Weekly schedule in minutes from midnight, keyed 0 (Sun) – 6 (Sat). Null = closed. */
  schedule?: Record<number, { open: number; close: number } | null>;
  services?: string[];
  pickup?: boolean;
  delivery?: boolean;
  /** Postcode prefixes covered by delivery, e.g. ["W1", "WC2"]. */
  deliveryZones?: string[];
  accessibility?: string[];
  menuNotes?: string;
  specialHoursNote?: string;
  directionsUrl?: string;
}

export type FulfilmentMode = "pickup" | "delivery";

export interface BasketLine {
  /** Stable line id derived from product + options. */
  id: string;
  productId: string;
  quantity: number;
  toppingIds: string[];
  /** Product id of a chosen dip, added as part of this line. */
  dipId?: string;
}

export interface PricedBasketLine extends BasketLine {
  product: Product;
  toppings: Topping[];
  dip?: Product;
  /** Unit price incl. toppings and dip, in pence. */
  unitPrice: number;
  lineTotal: number;
}

export interface CheckoutDetails {
  name: string;
  email: string;
  /** Delivery only. */
  postcode?: string;
  addressLine?: string;
  notes?: string;
}

export interface OrderRequest {
  locationId: string;
  mode: FulfilmentMode;
  lines: BasketLine[];
  details: CheckoutDetails;
  /** Total in pence, computed client-side for the mock gateway. */
  total: number;
  /** Demo flag — forces the mock gateway to decline the payment. */
  simulateFailure?: boolean;
}

export interface OrderConfirmation {
  reference: string;
  mode: FulfilmentMode;
  locationId: string;
  /** e.g. "12–15 min" */
  eta: string;
  total: number;
}

export type OrderResult =
  | { ok: true; confirmation: OrderConfirmation }
  | { ok: false; error: string };

/**
 * Integration-ready adapter. Swap the mock implementation for a real
 * ordering/payments backend without touching UI code.
 */
export interface OrderGateway {
  submit(request: OrderRequest): Promise<OrderResult>;
}

export interface LoyaltyReward {
  title: string;
  detail: string;
}

export interface Faq {
  question: string;
  answer: string;
}
