import {
  getAuthenticatedSession,
  fetchWithAuth,
} from "../authSession/authSession";

export async function getUser(email) {
  const res = await fetch(`https://rv-back-end.vercel.app/user/email/${email}`);
  return await res.json();
}

export async function getSessionUser() {
  const session = await getAuthenticatedSession();

  const data = await fetchWithAuth(
    `https://rv-back-end.vercel.app/user/${session.user.userId}`,
    session.user.accessToken,
  );

  return data;
}
