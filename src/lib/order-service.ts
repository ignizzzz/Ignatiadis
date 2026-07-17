import type { OrderGateway, OrderRequest, OrderResult } from "@/lib/types";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeReference(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let ref = "";
  for (let i = 0; i < 4; i++) {
    ref += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `POP-${ref}`;
}

/**
 * Mock ordering gateway. No real payment is taken anywhere in this flow.
 * Replace with a real implementation of OrderGateway to connect a backend.
 */
export const mockOrderGateway: OrderGateway = {
  async submit(request: OrderRequest): Promise<OrderResult> {
    // Simulate network + payment processing time.
    await wait(1800);

    if (request.simulateFailure) {
      return {
        ok: false,
        error:
          "Your payment could not be processed. No money has been taken — please try again or use a different card.",
      };
    }

    if (request.lines.length === 0) {
      return { ok: false, error: "Your basket is empty." };
    }

    return {
      ok: true,
      confirmation: {
        reference: makeReference(),
        mode: request.mode,
        locationId: request.locationId,
        eta: request.mode === "pickup" ? "12–15 min" : "25–35 min",
        total: request.total,
      },
    };
  },
};
