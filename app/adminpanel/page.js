"use client";

import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";

export default function Page() {
  // Mock data for the UI
  const summaries = [
    {
      label: "Total Revenue",
      value: "$12,450.00",
      icon: <DollarSign />,
      trend: "+12.5%",
      positive: true,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "New Orders",
      value: "145",
      icon: <ShoppingBag />,
      trend: "+8.2%",
      positive: true,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Active Users",
      value: "1,240",
      icon: <Users />,
      trend: "-2.4%",
      positive: false,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Avg. Order Value",
      value: "$85.00",
      icon: <TrendingUp />,
      trend: "+4.1%",
      positive: true,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, Admin</h1>
        <p className="text-slate-400 text-sm mt-1">
          Here’s what’s happening with your store today.
        </p>
      </div>

      {/* 2. Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaries.map((stat, i) => (
          <div
            key={i}
            className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl transition-all hover:border-slate-700 group"
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div
                className={`flex items-center text-xs font-medium ${stat.positive ? "text-emerald-400" : "text-rose-400"}`}
              >
                {stat.trend}
                {stat.positive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Section: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (Table or List) */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-800/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-slate-500">john@example.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">$240.00</p>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase">
                    Paid
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / System Status */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">
            System Overview
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">
                    Server Load
                  </span>
                  <span className="text-xs font-bold text-white">24%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-indigo-500 h-1.5 rounded-full w-[24%] shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3 text-slate-400 mb-4">
                <Clock size={16} className="text-indigo-500" />
                <span className="text-xs font-medium">
                  Last backup: 2 hours ago
                </span>
              </div>
              <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
