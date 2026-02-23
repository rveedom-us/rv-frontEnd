export const statuses = {
  PENDING: {
    description: "Order is waiting to be processed",
    className: "from-yellow-500/20 to-yellow-700/30 text-yellow-300",
  },
  "WAITING FOR CONFIRMATION": {
    description: "Needs seller confirmation",
    className: "from-orange-500/20 to-orange-700/30 text-orange-300",
  },
  CONFIRMED: {
    description: "Order has been confirmed",
    className: "from-blue-500/20 to-blue-700/30 text-blue-300",
  },
  "ON ROUTE": {
    description: "Order is currently on the way",
    className: "from-purple-500/20 to-purple-700/30 text-purple-300",
  },
  DELIVERED: {
    description: "Order successfully delivered",
    className: "from-green-500/20 to-green-700/30 text-green-300",
  },
  CANCELLED: {
    description: "Order was cancelled",
    className: "from-red-500/20 to-red-700/30 text-red-300",
  },
  REFUNDED: {
    description: "Customer has been refunded",
    className: "from-rose-500/20 to-rose-700/30 text-rose-300",
  },
  FAILED: {
    description: "Order failed to process",
    className: "from-gray-500/20 to-gray-700/30 text-gray-300",
  },
};

export const defaultStatus = {
  description: "Unknown status",
  className: "from-slate-600/20 to-slate-800/30 text-slate-300",
};
