import { auth } from "@/_lib/authSession/auth";
export const proxy = auth;

export const config = {
  matcher: ["/order/:path*"],
};
