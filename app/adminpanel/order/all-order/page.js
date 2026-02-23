"use client";
import { SpinnerMini } from "@/_ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import OrderTable from "@/_ui/OrderTable";
import { getAllOrders } from "@/_lib/api/getAllOrders";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(),
  });

  const noOrders = !isPending && Array.isArray(data) && data.length === 0;
  const item_per_page = 6;

  return (
    <section id="all-order">
      {isPending ? (
        <SpinnerMini size="md" />
      ) : noOrders ? (
        <p className="text-center text-gray-400 py-10">
          No orders available right now.
        </p>
      ) : (
        <div className="relative overflow-x-auto bg-[#0F172A] rounded-xl border border-[#1E293B] shadow">
          <OrderTable
            data={data}
            isAdmin={true}
            item_per_page={item_per_page}
          />
        </div>
      )}
    </section>
  );
}
