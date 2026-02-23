import { getPrice } from "./getPrice";

export function priceCalc(state) {
  if (!state.selectedSize || !state.selectedQuality) {
    resetPrice(state);
    return;
  }

  const data = getPrice(state.selectedSize, state.selectedQuality);
  if (!data) {
    resetPrice(state);
    return;
  }

  const { flexPrice, marketPrice, weeklyDiscount, monthlyDiscount } = data;

  const days = Number(state.totalDate || 1);
  const qty = Number(state.quantity || 1);
  const delivery = Number(state.deliveryPrice || 0);

  // Rule:
  // 7+ days & <30 => 15% off
  // 30+ days => 35% off
  // else => 0% off
  let discountRate = 0;
  if (days >= 30) discountRate = Number(monthlyDiscount ?? 0.35);
  else if (days >= 7) discountRate = Number(weeklyDiscount ?? 0.15);
  const rentalSubtotal = flexPrice * days * qty;
  const discountAmount = rentalSubtotal * discountRate;
  const discountedRental = rentalSubtotal - discountAmount;

  state.taxAmount = discountedRental * (state.tax / 100);

  state.totalPrice =
    discountedRental + state.taxAmount + state.cleaningPrepFee + delivery;
  state.downPayment = Math.round(state.totalPrice * 0.05);
  const marketTotal = marketPrice * days * qty;
  state.saving = Math.round(marketTotal - discountedRental);

  state.savingPercentage =
    marketTotal > 0 ? Math.round((state.saving / marketTotal) * 100) : 0;

  state.flexPrice = flexPrice;
}

function resetPrice(state) {
  state.flexPrice = 0;
  state.taxAmount = 0;
  state.totalPrice = 0;
  state.downPayment = 0;
  state.saving = 0;
  state.savingPercentage = 0;
}
