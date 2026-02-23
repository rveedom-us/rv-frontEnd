import { auth } from "./auth";

// get authenticated session
async function getAuthenticatedSession() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    throw new Error("Not authenticated");
  }
  // console.log("Authenticated session:", session);

  return session;
}

// get auth headers
function getAuthHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}
async function fetchWithAuth(url, accessToken, options = {}) {
  const res = await fetch(url, {
    headers: getAuthHeaders(accessToken),
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    const errorMessage = `Failed to fetch: ${res.status} ${res.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await res.json();
}

export { getAuthenticatedSession, getAuthHeaders, fetchWithAuth };
