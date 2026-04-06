"use client";

import { tripLengthCalc } from "@/_lib/tripLengthCalc";
import { getPrice } from "@/_lib/getPrice";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import TierBadge from "./TierBadge";
import AdminStatusDrawer from "./admin/AdminStatusDrawer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OrderTable({ data, isAdmin, item_per_page = 4 }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // PAGINATION
  const [page, setPage] = useState(1);

  const totalItems = data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / item_per_page));

  const startIndex = (page - 1) * item_per_page;
  const currentPageData = data.slice(startIndex, startIndex + item_per_page);

  const start = totalItems === 0 ? 0 : startIndex + 1;
  const end = Math.min(startIndex + item_per_page, totalItems);

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <>
      {/* min-w-[1000px] ensures the table columns don't collapse on mobile */}
      <table className="w-full min-w-[1000px] text-sm text-left text-gray-300">
        <thead className="bg-slate-950 text-gray-400 border-b border-slate-800">
          <tr>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
              ID / Created
            </th>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
              User Info
            </th>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
              Order Details
            </th>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
              Delivery Dates
            </th>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
              Price Details
            </th>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {currentPageData.map((item, index) => {
            const remaining = item.price - item.amount_paid;
            const price = getPrice(item.size, item.quality);
            const flexPrice = price?.flexPrice ?? null;

            return (
              <tr
                key={item.id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"
                } hover:bg-slate-800/50`}
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-cyan-500">#{item.id}</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <p className="font-medium text-slate-200">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.email}</p>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <TierBadge tierKey={item.quality} />
                  <div className="mt-1 text-xs text-slate-400">
                    Size: <span className="text-slate-200">{item.size}</span> •
                    Qty:{" "}
                    <span className="text-slate-200">x{item.quantity}</span>
                  </div>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <p className="text-xs">
                    {item.startDate}{" "}
                    <span className="text-slate-600 px-1">→</span>{" "}
                    {item.endDate}
                  </p>
                  <p className="text-[10px] font-bold text-cyan-600 uppercase mt-1">
                    {tripLengthCalc(item.startDate, item.endDate)} Days Total
                  </p>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <p className="text-sm font-bold text-white">${item.price}</p>
                  <p className="text-[10px] text-slate-500">
                    Paid: ${item.amount_paid}
                  </p>
                  {remaining > 0 && (
                    <p className="text-[10px] text-rose-400 font-medium">
                      Due: ${Math.round(remaining)}
                    </p>
                  )}
                </td>

                <td className="px-6 py-5">
                  {isAdmin ? (
                    <button
                      className="active:scale-95 transition-transform"
                      onClick={() => {
                        setSelectedOrder({
                          id: item.id,
                          status: item.status,
                        });
                        setShowDrawer(true);
                      }}
                    >
                      <StatusBadge status={item.status} />
                    </button>
                  ) : (
                    <StatusBadge status={item.status} />
                  )}
                </td>
              </tr>
            );
          })}

          {totalItems === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-20 text-slate-500 italic"
              >
                No orders found in your history.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION FOOTER - Responsive Stack */}
      {totalItems > 0 && (
        <div className="border-t border-slate-800 bg-slate-950/50 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] uppercase tracking-widest text-slate-500">
              Showing{" "}
              <span className="text-slate-200 font-bold">
                {start}–{end}
              </span>{" "}
              of <span className="text-slate-200 font-bold">{totalItems}</span>{" "}
              entries
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onPrev}
                disabled={page === 1}
                className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 disabled:opacity-20 hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-xs font-bold tabular-nums">
                {page} <span className="text-slate-600 mx-1">/</span>{" "}
                {totalPages}
              </span>

              <button
                onClick={onNext}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 disabled:opacity-20 hover:bg-slate-700 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminStatusDrawer
        open={showDrawer}
        orderId={selectedOrder?.id}
        currentStatus={selectedOrder?.status}
        onClose={() => setShowDrawer(false)}
      />
    </>
  );
}
