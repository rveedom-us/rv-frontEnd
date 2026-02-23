import { auth } from "@/_lib/authSession/auth";
import Header from "@/_ui/Header";
import FooterCart from "@/_components/Cart/FooterCart";

export default async function publicLayout({ children }) {
  const session = await auth();
  return (
    <>
      <Header />
      {children}
      <FooterCart session={session} />
    </>
  );
}
