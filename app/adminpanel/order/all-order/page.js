"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/_lib/api/getAllOrders";
import OrderTable from "@/_ui/OrderTable";
import { SpinnerMini } from "@/_ui/Spinner";
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(),
  });

  const orders = Array.isArray(data) ? data : [];
  const noOrders = !isPending && orders.length === 0;
  const item_per_page = 8; // Increased slightly for better vertical balance

  // Derived stats for the top cards
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: <Package size={20} />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "PENDING").length,
      icon: <Clock size={20} />,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Completed",
      value: orders.filter((o) => o.status === "DELIVERED").length,
      icon: <CheckCircle2 size={20} />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section id="all-order" className="space-y-6 animate-fadeIn">
      {/* 1. Header & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-slate-700"
          >
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <p className="text-2xl font-bold text-white leading-none mt-1">
                {isPending ? "..." : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Main Content Area */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
        {/* Table Header Action Bar */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
          <h2 className="text-lg font-semibold text-white">Order Management</h2>
          <div className="flex gap-2">
            {/* Optional: Add Filter/Search buttons here later */}
          </div>
        </div>

        <div className="p-2 sm:p-4">
          {isPending ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <SpinnerMini size="md" />
              <p className="text-slate-500 text-sm animate-pulse">
                Fetching latest orders...
              </p>
            </div>
          ) : noOrders ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="p-4 bg-slate-800/50 rounded-full text-slate-500 mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-white font-medium text-lg">
                No orders found
              </h3>
              <p className="text-slate-500 max-w-xs mt-1">
                There are currently no orders in the system to display.
              </p>
            </div>
          ) : (
            <div className="relative overflow-x-auto rounded-xl">
              <OrderTable
                data={data}
                isAdmin={true}
                item_per_page={item_per_page}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
