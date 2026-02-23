import { signInWithGoogle } from "@/_lib/authSession/authAction";

/* eslint-disable @next/next/no-img-element */
export default function SignInWithGoogle() {
  return (
    <form action={signInWithGoogle}>
      <button className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
            alt="google ico"
            className="w-5"
          />
          {/* text */}
          <h1 className="text-white capitalize">sign in with google</h1>
        </div>
      </button>
    </form>
  );
}
