const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950/60 py-5">
      <div className="container mx-auto  max-w-7xl px-4 sm:px-6">
        <div className="text-center text-sm text-white/50">
          © {year} RVEEDOM. All rights reserved. Flex+ is subject to
          availability in select markets.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
