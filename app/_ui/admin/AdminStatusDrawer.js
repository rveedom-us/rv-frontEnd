"use client";
import { useQueryClient } from "@tanstack/react-query";
import { userStatusUpdate } from "@/_lib/api/orders";
import { statuses } from "@/_lists/status";
import { toast } from "react-toastify";
import { X } from "lucide-react";

export default function AdminStatusDrawer({
  open,
  onClose,
  orderId,
  currentStatus,
}) {
  const queryClient = useQueryClient();
  if (!open) return null;
  const curStatus = currentStatus.toUpperCase();

  function handleChangeStatus(key, orderId) {
    toast(({ closeToast }) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold">
          Are you sure you wanna change status to{" "}
          <span className="text-slate-500">{key}</span>?
        </p>

        <div className="flex gap-3">
          <button
            className="px-3 py-1 bg-green-600 rounded text-white"
            onClick={async () => {
              await userStatusUpdate(orderId, key);
              queryClient.invalidateQueries(["orders"]);
              closeToast();
              onClose();
            }}
          >
            Yes
          </button>

          <button
            className="px-3 py-1 bg-red-600 rounded text-white"
            onClick={closeToast}
          >
            No
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div className="fixed inset-0 z-40">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-95"
      />

      <div className="absolute top-1/2 right-0 translate-y-[-50%] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 h-[60vh] sm:h-[55vh] md:h-[50vh] bg-slate-950 shadow-xl rounded-l-2xl transform animate-slideInRight z-50">
        <div className="p-3 sm:p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-sm sm:text-base">
            Change status for{" "}
            <span className="text-xs text-slate-400 font-semibold block sm:inline">
              {orderId}{" "}
            </span>
            to
          </h2>
          <button
            onClick={onClose}
            className="text-slate-700 hover:scale-110 hover:cursor-pointer text-xl font-bold"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <ul className="p-3 sm:p-4 flex flex-col gap-2 overflow-y-auto max-h-[calc(60vh-80px)] sm:max-h-[calc(55vh-80px)] md:max-h-[calc(50vh-80px)]">
          {Object.entries(statuses).map(([key, items]) => {
            const isSelected = key === curStatus;
            return (
              <li
                key={key}
                onClick={() => {
                  if (isSelected) return;
                  handleChangeStatus(key, orderId);
                }}
                className={`
                  relative p-2 sm:p-3 rounded-md bg-linear-to-r ${items.className} 
                  transition-all scale-90 group text-sm sm:text-base
                  ${
                    isSelected
                      ? "opacity-100 border border-red-400 cursor-not-allowed"
                      : "cursor-pointer hover:scale-100"
                  }
                `}
              >
                {key}
                <span className="absolute left-0 bottom-10 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-90 transition-opacity duration-200 z-50 hidden sm:block">
                  {items.description}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
