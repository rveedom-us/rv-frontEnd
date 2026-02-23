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
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-slate-950 text-gray-400 border-b border-[#334155]">
          <tr>
            <th className="px-6 py-3 font-medium">ID/Created At</th>
            <th className="px-6 py-3 font-medium">User Info</th>
            <th className="px-6 py-3 font-medium">Order Details</th>
            <th className="px-6 py-3 font-medium">Delivery Dates</th>
            <th className="px-6 py-3 font-medium">Price Details</th>
            <th className="px-6 py-3 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {currentPageData.map((item, index) => {
            const remaining = item.price - item.amount_paid;
            const price = getPrice(item.size, item.quality);
            const flexPrice = price?.flexPrice ?? null;

            return (
              <tr
                key={item.id}
                className={`border-b border-[#1E293B] ${
                  index % 2 === 0 ? "bg-[#0F172A]" : "bg-[#111827]"
                }`}
              >
                <th className="px-6 py-4 font-semibold text-gray-200 whitespace-nowrap">
                  <div>
                    <p>{item.id}</p>
                    <p>{new Date(item.created_at).toLocaleString()}</p>
                  </div>
                </th>

                <td className="px-6 py-4">
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                </td>

                <td className="px-6 py-4">
                  <TierBadge tierKey={item.quality} />
                  <p>Size: {item.size}</p>
                  <p>Qty: x{item.quantity}</p>
                  <p>Flex Price: ${flexPrice}</p>
                </td>

                <td className="px-6 py-4">
                  <p>
                    {item.startDate} → {item.endDate}
                  </p>
                  <p>
                    Total Date: {tripLengthCalc(item.startDate, item.endDate)}{" "}
                    days
                  </p>
                </td>

                <td className="px-6 py-4">
                  <p>Total Price: ${item.price}</p>
                  <p>Paid: ${item.amount_paid}</p>
                  <p>Remaining: ${Math.round(remaining)}</p>
                </td>

                <td className="px-6 py-4">
                  {isAdmin ? (
                    <button
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

          {/* EMPTY STATE */}
          {totalItems === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-10 text-gray-400">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>

        {/* PAGINATION FOOTER */}
        {totalItems > 0 && (
          <tfoot>
            <tr>
              <td colSpan={6}>
                <div className="flex items-center justify-between py-4 px-2">
                  {/* LEFT SIDE */}
                  <div className="text-sm opacity-70">
                    Showing <span className="font-semibold">{start}</span>–
                    <span className="font-semibold">{end}</span> of{" "}
                    <span className="font-semibold">{totalItems}</span> entries
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onPrev}
                      disabled={page === 1}
                      className="p-2 rounded border bg-gray-100 dark:bg-gray-800 disabled:opacity-40"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <span className="font-semibold text-sm">
                      {page} / {totalPages}
                    </span>

                    <button
                      onClick={onNext}
                      disabled={page === totalPages}
                      className="p-2 rounded border bg-gray-100 dark:bg-gray-800 disabled:opacity-40"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      <AdminStatusDrawer
        open={showDrawer}
        orderId={selectedOrder?.id}
        currentStatus={selectedOrder?.status}
        onClose={() => setShowDrawer(false)}
      />
    </>
  );
}
