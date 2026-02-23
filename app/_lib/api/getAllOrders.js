"use server";

import { auth } from "../authSession/auth";
import { fetchWithAuth } from "../authSession/authSession";

export async function getAllOrders() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    throw new Error("Not authenticated");
  }

  const url = "https://rv-back-end.vercel.app/order";
  const data = await fetchWithAuth(url, session.user.accessToken);

  const sorted = Array.isArray(data)
    ? data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : data;

  return sorted;
}
