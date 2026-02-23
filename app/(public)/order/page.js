import { getOrderByEmail } from "@/_lib/api/orders";
import { getSessionUser } from "@/_lib/api/users";
import OrderTable from "@/_ui/OrderTable";

export default async function Page() {
  const sessionUser = await getSessionUser();
  const orderData = await getOrderByEmail(sessionUser.email);

  return (
    <section
      id="userOrder"
      className="h-[90vh] bg-slate-950/30 py-5 text-white mb-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-5 mb-10">
          <div className="bg-slate-800 p-5 rounded-lg">
            <h1 className="text-gray-300 text-2xl font-semibold mb-2">
              Personal Profile
            </h1>
            <p className="">Full Name: {sessionUser.userName}</p>
            <p>Email: {sessionUser.email}</p>
            <p>
              Account Created:{" "}
              {new Date(sessionUser.created_at).toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-lg">
            <h1 className="text-gray-300 text-2xl font-semibold mb-2">
              Orders
            </h1>
          </div>
        </div>
        <OrderTable data={orderData} />
      </div>
    </section>
  );
}
