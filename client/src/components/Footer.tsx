const Footer = () => {
  const navLinks = [
    { name: "HOME", path: "/" },
    // { name: "FILMS", path: "/films" },
    // { name: "ABOUT", path: "/about" },
    // { name: "EVENTS", path: "/events" },
    // { name: "CONTACT", path: "/contact" },
    { name: "SERVICE", path: "/service" },
  ];

  const policyLinks = [
    { name: "TERMS OF USE", path: "/terms" },
    { name: "PRIVACY POLICY", path: "/privacy" },
    { name: "DO NOT SELL OR SHARE MY PERSONAL INFORMATION", path: "/privacy-policy" },
  ];

  const socials = [
    { name: "FACEBOOK", path: "https://facebook.com" },
    { name: "TWITTER", path: "https://twitter.com" },
    { name: "INSTAGRAM", path: "https://instagram.com" },
    { name: "YOUTUBE", path: "https://youtube.com" },
  ];

  return (
    <footer className="bg-[#101010] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Kolom Kiri */}
        <div className="space-y-3 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="block hover:underline"
            >
              {link.name}
            </a>
          ))}

          <div className="mt-6 space-y-2">
            {policyLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block text-gray-400 hover:underline"
              >
                {link.name}
              </a>
            ))}
          </div>

          <p className="mt-6 text-xs text-gray-500 leading-relaxed">
            THIS WEBSITE IS NOT ENDORSED OR APPROVED BY, AND IS NOT IN ANY WAY
            AFFILIATED WITH, THE AMERICAN AUTOMOBILE ASSOCIATION, INC. (“AAA”).
          </p>
        </div>

        {/* Kolom Tengah */}
        <div>
          <h3 className="uppercase text-xs tracking-wider mb-4">MORE</h3>
          <div className="space-y-2 text-sm font-medium">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:underline"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom Kanan */}
        <div>
          <h3 className="uppercase text-xs tracking-wider mb-4">STAY UPDATED</h3>
          <p className="text-gray-300 text-sm mb-4">
            Get our emails. Letters from our filmmakers, new trailers, podcasts,
            merch, and more. Not too often — just enough.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="EMAIL"
              className="w-full px-4 py-3 text-sm bg-black border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black text-sm font-semibold"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
