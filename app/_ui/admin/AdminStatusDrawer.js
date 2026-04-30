"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { userStatusUpdate } from "@/_lib/api/orders";
import { statuses } from "@/_lists/status";
import { toast } from "react-toastify";
import { X, CheckCircle2 } from "lucide-react";

export default function AdminStatusDrawer({
  open,
  onClose,
  orderId,
  currentStatus,
}) {
  const queryClient = useQueryClient();

  if (!open) return null;
  const curStatus = currentStatus?.toUpperCase();

  const handleUpdate = async (key) => {
    try {
      await userStatusUpdate(orderId, key);
      queryClient.invalidateQueries(["orders"]);
      toast.success(`Status updated to ${key}`);
      onClose();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const confirmChange = (key) => {
    toast(
      ({ closeToast }) => (
        <div className="p-1">
          <p className="text-sm font-medium mb-3">
            Update status to{" "}
            <span className="font-bold text-indigo-400">{key}</span>?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                handleUpdate(key);
                closeToast();
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={closeToast}
              className="bg-slate-800 text-slate-300 px-4 py-1.5 rounded-lg text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { theme: "dark" },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-xl font-semibold text-white">Update Status</h2>
            <p className="text-xs text-slate-400 mt-1">
              Order ID:{" "}
              <span className="font-mono text-indigo-400">{orderId}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {Object.entries(statuses).map(([key, items]) => {
            const isSelected = key === curStatus;
            return (
              <button
                key={key}
                disabled={isSelected}
                onClick={() => confirmChange(key)}
                className={`
                  w-full group relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200
                  ${
                    isSelected
                      ? "bg-indigo-500/10 border-indigo-500/50 cursor-default"
                      : "bg-slate-800/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800 shadow-sm"
                  }
                `}
              >
                <div className="flex flex-col items-start">
                  <span
                    className={`font-bold text-sm uppercase tracking-wider ${isSelected ? "text-indigo-400" : "text-slate-200"}`}
                  >
                    {key}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 text-left line-clamp-1">
                    {items.description}
                  </span>
                </div>

                {isSelected && (
                  <CheckCircle2 size={18} className="text-indigo-500" />
                )}
                {!isSelected && (
                  <div
                    className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${items.className?.split(" ")[0] || "bg-slate-400"}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-950/30 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
