import { tripLengthCalc } from "@/_lib/tripLengthCalc";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TierBadge from "@/_ui/TierBadge";
import QualityBadge from "@/_ui/QualityBadge";
import { X } from "lucide-react";
import { createOrder } from "@/_lib/api/orders";
import { useState } from "react";

export default function Confirmation({ open, onClose, session }) {
  const email = session.user.email;
  const {
    selectedSize,
    selectedQuality,
    startDate,
    endDate,
    totalPrice,
    qualityScore,
    cleaningPrepFee,
    savingPercentage,
    tax,
    downPayment,
  } = useSelector((state) => state.cart);

  const [tripDescription, setTripDescription] = useState("");

  if (!open) return null;

  // payment handler
  async function handlePay() {
    try {
      const trimmedDescription = tripDescription.trim();

      const data = await createOrder({
        amount_paid: downPayment,
        email: email,
        orderData: {
          size: selectedSize,
          quality: selectedQuality,
          price: totalPrice,
          startDate: startDate,
          endDate: endDate,
          tripDescription: trimmedDescription || null,
          downPayment: downPayment,
        },
      });
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error creating order:", err.message);
      toast.error("Failed to create order.");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full h-full md:h-auto md:max-w-6xl md:mx-4 md:rounded-2xl bg-slate-950 text-white border-0 md:border md:border-white/10 shadow-2xl flex flex-col animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 md:pb-8">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-5 mb-6">
            <div className="flex justify-between">
              <h2 className="text-2xl md:text-3xl font-semibold mb-5">
                Lock your trip — we handle the magic ✨
              </h2>
              <X
                className="cursor-pointer text-cyan-200 shrink-0"
                onClick={onClose}
              />
            </div>

            <div className="flex flex-wrap gap-2 my-3">
              <span className="px-3 py-1 rounded-full bg-linear-to-r from-emerald-400 to-teal-500 text-sm text-black">
                5% to lock
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                Saving {savingPercentage}%
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                Cleaning & Prep ${cleaningPrepFee}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                Tax {tax}%
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Cart Info */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-5">
              <h3 className="text-xl font-bold mb-4">Your Selection</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <p className="text-gray-400">Email Address</p>
                  <p className="bg-[#0a1626] p-2 rounded-md mt-1 border border-white/5">
                    {email}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-400">Start Date</p>
                    <p className="bg-[#0a1626] p-2 rounded-md mt-1 border border-white/5">
                      {startDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">
                      End Date (Total: {tripLengthCalc(startDate, endDate)} Day)
                    </p>
                    <p className="bg-[#0a1626] p-2 rounded-md mt-1 border border-white/5">
                      {endDate}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-400">Preferred Size</p>
                    <p className="bg-[#0a1626] p-2 rounded-md mt-1 border border-white/5">
                      {selectedSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Total Price</p>
                    <p className="bg-[#0a1626] p-2 rounded-md mt-1 border border-white/5">
                      ${Math.round(totalPrice * 100) / 100}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-400 mb-1">Preferred Quality</p>
                    <TierBadge tierKey={selectedQuality} />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Quality Level</p>
                    <QualityBadge quality={qualityScore} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Checkout Steps */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4">
                Checkout (Pay 5% deposit to lock your RV)
              </h3>

              <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2 mb-4">
                <li>5% deposit now locks price, refundable until confirmed</li>
                <li>
                  We confirm RV, arrange logistics, and apply upgrades if
                  applicable
                </li>
                <li>45% of balance due within 48 hours of confirmation</li>
                <li>Final balance auto-billed 14 days before start date</li>
                <li>
                  Refundable security deposit of $750 auto billed 7 days before
                  trip
                </li>
              </ol>

              <div>
                <p className="mb-2 text-sm text-gray-300">
                  Please describe the nature of your trip and any special
                  requests. The more information you provide, the better we can
                  sync you up with your ideal RV and experience (optional)
                </p>
                <textarea
                  className="ring ring-white w-full h-40 mb-3 bg-slate-800 text-white p-3 rounded-md"
                  value={tripDescription}
                  onChange={(e) => setTripDescription(e.target.value)}
                  placeholder="Tell us about your trip..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Button - Mobile Optimized */}
        <div className="fixed md:relative bottom-0 left-0 right-0 bg-slate-950 border-t border-white/10 p-4 md:p-5 md:pt-0 md:border-0">
          <button
            onClick={handlePay}
            className="w-full bg-linear-to-r from-cyan-400 to-emerald-500 text-black font-semibold px-5 py-4 md:py-3 rounded-lg shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg md:text-base"
          >
            <span>Lock in your RV</span>
            <span className="font-bold">• ${Math.round(downPayment)}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
