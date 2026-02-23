import { prices } from "@/_lists/prices";

export function getPrice(size, tier) {
  if (!size || !tier) return null;

  const key = `${size}_${tier}`;
  return prices[key] || null;
}
