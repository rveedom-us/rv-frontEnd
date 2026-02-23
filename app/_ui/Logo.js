import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex flex-col">
      <Link
        href="/"
        className="flex items-center"
        aria-label="RVEEDOM Flex+ Home"
      >
        <Image
          src="/rveedomflexlogo.webp"
          alt="RVEEDOM Flex+"
          width={180}
          height={40}
          priority
          className="h-auto w-auto max-w-[150px] sm:max-w-[180px]"
        />
      </Link>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/80 sm:text-[11px]">
        Save more. Upgrade smarter.
      </p>
    </div>
  );
}
