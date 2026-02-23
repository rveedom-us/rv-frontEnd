import { auth } from "@/_lib/authSession/auth";
import Logo from "./Logo";
import SignInWithGoogle from "@/_components/Auth/SigninWithGoogleButton";
import UserProfile from "@/_components/Auth/UserProfile";
import CallButton from "./CallButton";
import BookFlexButton from "./BookFlexButton";
import HeaderMobile from "./HeaderMobile";
import NavLinks from "./NavLinks";

const links = [
  { href: "/rvSelector", label: "RV Selector" },
  { href: "/#why", label: "Why Flex+", sectionId: "why" },
  { href: "/#how", label: "How it Works", sectionId: "how" },
];

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur supports-backdrop-filter:bg-slate-900/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        {/* nav links */}
        <NavLinks links={links} />

        <div className="hidden items-center gap-2 md:flex">
          <CallButton />
          <BookFlexButton />
          {session ? <UserProfile session={session} /> : <SignInWithGoogle />}
        </div>

        <HeaderMobile links={links} session={session} />
      </div>
    </header>
  );
}
