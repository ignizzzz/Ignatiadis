import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import OrderFlow from "@/components/order/OrderFlow";

export const metadata: Metadata = {
  title: "Order",
  description:
    "Order FETA POP for pickup or delivery in central London. Baked to order — ready in minutes.",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 pb-28 lg:pb-16">
      <SectionHeading
        as="h1"
        eyebrow="fresh out of the oven"
        title="Order FETA POP"
        lead="Pick it up hot in Soho or get it delivered while the phyllo still crackles."
        className="mb-10"
      />
      <OrderFlow />
    </div>
  );
}
