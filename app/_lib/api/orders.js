import {
  fetchWithAuth,
  getAuthenticatedSession,
} from "../authSession/authSession";

export async function getOrderByEmail(email) {
  const session = await getAuthenticatedSession();

  const data = fetchWithAuth(
    `https://rv-back-end.vercel.app/order/email?email=${email}`,
    session.user.accessToken,
  );

  return data;
}

export async function userStatusUpdate(id, status) {
  const res = await fetch(`https://rv-back-end.vercel.app/order/status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return await res.json();
}

export async function createOrder({ amount_paid, email, orderData }) {
  const res = await fetch("https://rv-back-end.vercel.app/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      amount_paid: amount_paid,
      email: email,
      orderData: orderData,
    }),
  });
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return await res.json();
}
