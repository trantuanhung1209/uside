const Footer = () => {
  return (
    <footer className="bg-background py-16 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1),inset_0_8px_16px_rgba(0,0,0,0.05)]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-2xl p-6 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300">
              <div className="w-16 h-16 bg-background rounded-xl mb-4 flex items-center justify-center shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
                <img
                  src="/images_uside/pet_cloud_uside.png"
                  className="w-full h-full object-contain scale-120 transition-transform duration-300"
                  alt="USide Logo"
                />
              </div>
              <p className="text-text-primary text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                maximus
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 mt-4">
                {["f", "ig", "in", "yt"].map((icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-background rounded-xl flex items-center justify-center shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                  >
                    <span className="text-text-primary text-sm font-medium">
                      {icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="bg-background rounded-2xl p-6 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300">
            <h3 className="text-text-primary font-semibold text-lg mb-6">
              Solution
            </h3>
            <ul className="space-y-3">
              {["Marketing", "Analytics", "Commerce", "Insights"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-text-primary hover:text-text-secondary duration-200 block py-1 transition-all hover:-translate-y-1 hover:drop-shadow-md"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support Section */}
          <div className="bg-background rounded-2xl p-6 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300">
            <h3 className="text-text-primary font-semibold text-lg mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {["Pricing", "Documentation", "Guides", "API Status"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-text-primary hover:text-text-secondary duration-200 block py-1 transition-all hover:-translate-y-1 hover:drop-shadow-md"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company Section */}
          <div className="bg-background rounded-2xl p-6 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300">
            <h3 className="text-text-primary font-semibold text-lg mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {["About", "Blog", "Jobs", "Press"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-text-primary hover:text-text-secondary duration-200 block py-1 transition-all hover:-translate-y-1 hover:drop-shadow-md"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="bg-background rounded-2xl p-6 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300">
            <h3 className="text-text-primary font-semibold text-lg mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Claim", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-text-primary hover:text-text-secondary duration-200 block py-1 transition-all hover:-translate-y-1 hover:drop-shadow-md"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text-primary text-sm">
              Copyright © 2025{" "}
              <span className="font-semibold text-text-primary">Website</span>.
              All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-text-primary hover:text-text-secondary transition-colors duration-200 text-sm"
              >
                Terms & Conditions
              </a>
              <span className="text-text-primary">|</span>
              <a
                href="#"
                className="text-text-primary hover:text-text-secondary transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
