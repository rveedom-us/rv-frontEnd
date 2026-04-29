import { tripLengthCalc } from "@/_lib/tripLengthCalc";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TierBadge from "@/_ui/TierBadge";
import QualityBadge from "@/_ui/QualityBadge";
import { X, MapPin } from "lucide-react";
import { createOrder } from "@/_lib/api/orders";
import { useState } from "react";

export default function Confirmation({ open, onClose, session }) {
  const email = session?.user?.email;
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
    location,
    guests,
  } = useSelector((state) => state.cart);

  const [tripDescription, setTripDescription] = useState("");

  if (!open) return null;

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
          location: location,
          guests: guests,
          tripDescription: trimmedDescription || null,
          downPayment: downPayment,
        },
      });
      // window.open(data.url, "_blank", "noopener,noreferrer");
      window.location.assign(data.url);
    } catch (err) {
      console.error("Error creating order:", err.message);
      toast.error("Failed to create order.");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-6xl bg-slate-950 text-white border-0 md:border md:border-white/10 shadow-2xl flex flex-col animate-popIn md:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
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
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(totalPrice)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-400 mb-1">Preferred Tier</p>
                    <TierBadge tierKey={selectedQuality} />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Score</p>
                    <QualityBadge quality={qualityScore} />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                  <div>
                    <p className="text-gray-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <MapPin size={14} className="text-cyan-400" /> Destination
                      / Pickup
                    </p>
                    <p className="bg-[#0a1626] p-2.5 rounded-md mt-1.5 border border-white/5 text-cyan-50 font-medium">
                      {location?.formattedAddress || "No location selected"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#0a1626] p-2 rounded border border-white/5 flex flex-col items-center">
                      <p className="text-[10px] text-gray-400 uppercase">
                        People
                      </p>
                      <p className="font-bold text-white">
                        {guests?.people || 1}
                      </p>
                    </div>
                    <div className="bg-[#0a1626] p-2 rounded border border-white/5 flex flex-col items-center">
                      <p className="text-[10px] text-gray-400 uppercase">
                        Beds
                      </p>
                      <p className="font-bold text-white">
                        {guests?.beds || 1}
                      </p>
                    </div>
                    <div className="bg-[#0a1626] p-2 rounded border border-white/5 flex flex-col items-center">
                      <p className="text-[10px] text-gray-400 uppercase">
                        Pets
                      </p>
                      <p
                        className={`font-bold ${guests?.pets > 0 ? "text-emerald-400" : "text-white"}`}
                      >
                        {guests?.pets || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Checkout Steps */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4">
                Checkout (Pay 5% deposit)
              </h3>
              <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2 mb-4">
                <li>5% deposit now locks price, refundable until confirmed</li>
                <li>We confirm RV and arrange logistics</li>
                <li>45% of balance due within 48 hours of confirmation</li>
                <li>Final balance auto-billed 14 days before start</li>
                <li>Refundable $750 security deposit 7 days before</li>
              </ol>
              <textarea
                className="ring-1 ring-white/20 w-full h-40 mb-3 bg-slate-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                value={tripDescription}
                onChange={(e) => setTripDescription(e.target.value)}
                placeholder="Tell us about your trip..."
              />
            </div>
          </div>
        </div>

        {/* Fixed Footer for ALL devices */}
        <div className="shrink-0 p-4 md:p-6 bg-slate-950 border-t border-white/10">
          <button
            onClick={handlePay}
            className="w-full cursor-pointer bg-linear-to-r from-cyan-400 to-emerald-500 text-black font-bold px-5 py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
          >
            <span>Lock in your RV</span>
            <span className="opacity-70">|</span>
            <span>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(downPayment)}
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
