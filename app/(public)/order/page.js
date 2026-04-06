import { getOrderByEmail } from "@/_lib/api/orders";
import { getSessionUser } from "@/_lib/api/users";
import OrderTable from "@/_ui/OrderTable";

export default async function Page() {
  const sessionUser = await getSessionUser();
  const orderData = await getOrderByEmail(sessionUser.email);

  return (
    <section
      id="userOrder"
      className="min-h-screen bg-slate-950/30 py-5 text-white mb-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Responsive Grid: 1 column on mobile, 2 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 shadow-xl">
            <h1 className="text-gray-300 text-xl md:text-2xl font-semibold mb-4">
              Personal Profile
            </h1>
            <div className="space-y-2 text-sm md:text-base text-slate-300">
              <p>
                <span className="text-slate-500">Full Name:</span>{" "}
                {sessionUser.userName}
              </p>
              <p>
                <span className="text-slate-500">Email:</span>{" "}
                {sessionUser.email}
              </p>
              <p>
                <span className="text-slate-500">Account Created:</span>{" "}
                {new Date(sessionUser.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 shadow-xl flex flex-col justify-center">
            <h1 className="text-gray-300 text-xl md:text-2xl font-semibold mb-2">
              Order History
            </h1>
            <p className="text-sm text-slate-400">
              View and track your flex delivery status and payment details.
            </p>
          </div>
        </div>

        {/* Table Responsive Wrapper */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl">
          <OrderTable data={orderData} />
        </div>
      </div>
    </section>
  );
}
