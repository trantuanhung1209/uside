import { HiArrowSmUp } from "react-icons/hi";
import { NewsletterSubscription } from "../ui";
import { FaEnvelope } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { careerPaths as careerPathsList } from "../../data/careerPaths";
import GuildRandom from "../ui/GuildRandom";

const Footer = () => {
  const navigate = useNavigate();
  const [currentCareerIndex, setCurrentCareerIndex] = useState(0);

  const socialLinks = [
    {
      name: "Facebook",
      icon: "📘",
      url: "#",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "#",
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "#",
      color: "from-blue-600 to-blue-700",
    },
    { name: "YouTube", icon: "🎥", url: "#", color: "from-red-500 to-red-600" },
    {
      name: "GitHub",
      icon: "🔗",
      url: "#",
      color: "from-gray-700 to-gray-800",
    },
  ];

  return (
    <footer
      className="relative py-20 overflow-hidden"
      style={{
        background: "var(--color-background)",
        boxShadow: "inset 0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating shapes */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5 animate-pulse"
            style={{
              background: "var(--color-accent)",
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}

        {/* Small particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-ping"
            style={{
              background: "var(--color-accent)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-8 mb-16">
          <GuildRandom />

          {/* Career Paths */}
          <div className="lg:col-span-2">
            <div
              className="p-6 rounded-3xl h-full"
              style={{
                background: "var(--color-background)",
                boxShadow: `
                  -8px -8px 16px #FAFBFF,
                  8px 8px 16px var(--color-shadow)
                `,
              }}
            >
              <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                <span className="text-accent">🎯</span> Hướng nghiệp
              </h3>
              <div className="flex flex-col flex-wrap gap-3">
                {careerPathsList.map((career, index) => (
                  <div className="flex items-center gap-4" key={career.id}>
                    <div
                      key={career.id}
                      className={`w-[40px] h-[40px] section-neumorphic p-2 cursor-pointer transition-all duration-300 rounded-xl flex items-center gap-[30px] ${
                        index === currentCareerIndex
                          ? "ring-2 ring-offset-2"
                          : ""
                      }`}
                      style={{
                        background:
                          index === currentCareerIndex
                            ? "var(--color-accent)"
                            : "var(--color-background)",
                        boxShadow:
                          index === currentCareerIndex
                            ? `0 0 20px var(--color-accent), inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)`
                            : "inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)",
                      }}
                      onClick={() => {
                        setCurrentCareerIndex(index);
                        navigate(`/direction/${career.id}`);
                      }}
                      title={career.title}
                    >
                      <img
                        src={career.icon}
                        alt={career.title}
                        className={`w-full h-full object-contain transition-all duration-300 ${
                          index === currentCareerIndex
                            ? "brightness-0 invert"
                            : ""
                        }`}
                      />
                    </div>
                    <p className={"text-sm" + 
                      (index === currentCareerIndex ? " font-bold text-accent" : "")
                    }>
                      {career.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <div
              className="p-8 rounded-3xl h-full"
              style={{
                background: "var(--color-background)",
                boxShadow: `
                  -12px -12px 24px #FAFBFF,
                  12px 12px 24px var(--color-shadow)
                `,
              }}
            >
              {/* Logo with floating effect */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                        inset -8px -8px 16px #FAFBFF,
                        inset 8px 8px 16px var(--color-shadow)
                      `,
                    }}
                  >
                    <img
                      src="/images_uside/pet_cloud_uside.png"
                      className="w-12 h-12 object-contain transition-transform duration-500 hover:scale-110 hover:rotate-6"
                      alt="USide Logo"
                    />
                  </div>
                  {/* Floating rings around logo */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-accent opacity-20 animate-ping" />
                  <div
                    className="absolute inset-0 rounded-2xl border border-accent opacity-10 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    USide
                  </h3>
                  <p className="text-sm text-accent">Tech Career Platform</p>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                Nền tảng hướng nghiệp giúp bạn khám phá và phát triển sự nghiệp
                trong lĩnh vực công nghệ.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-secondary">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-accent"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                        inset -4px -4px 8px #FAFBFF,
                        inset 4px 4px 8px var(--color-shadow)
                      `,
                    }}
                  >
                    📍
                  </div>
                  <span className="text-sm">
                    Nguyễn Văn Bảo/12 Đ. Hạnh Thông, Phường, Gò Vấp, Hồ Chí Minh
                  </span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-accent"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                        inset -4px -4px 8px #FAFBFF,
                        inset 4px 4px 8px var(--color-shadow)
                      `,
                    }}
                  >
                    📧
                  </div>
                  <span className="text-sm">
                    <a href="mailto:usider.tech@gmail.com">
                      usider.tech@gmail.com
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-accent"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                        inset -4px -4px 8px #FAFBFF,
                        inset 4px 4px 8px var(--color-shadow)
                      `,
                    }}
                  >
                    📞
                  </div>
                  <span className="text-sm">+84 (035) 313 3235</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="lg:col-span-3">
            <div
              className="p-6 rounded-3xl h-full"
              style={{
                background: "var(--color-background)",
                boxShadow: `
                  -8px -8px 16px #FAFBFF,
                  8px 8px 16px var(--color-shadow)
                `,
              }}
            >
              <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                <span className="text-accent">🌐</span> Kết nối với chúng tôi
              </h3>

              {/* Social Icons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="relative group"
                    title={social.name}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center
                      transition-all duration-300 transform group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${
                          social.color.split(" ")[1]
                        }, ${social.color.split(" ")[3]})`,
                        boxShadow: `
                          -4px -4px 8px #FAFBFF,
                          4px 4px 8px var(--color-shadow)
                        `,
                      }}
                    >
                      <span className="text-white text-lg">{social.icon}</span>
                    </div>
                    <div
                      className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${
                          social.color.split(" ")[1]
                        }, ${social.color.split(" ")[3]})`,
                        filter: "blur(8px)",
                      }}
                    />
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-text-primary">
                  📬 Đăng ký nhận tin
                </h4>
                <NewsletterSubscription
                  placeholder="Email của bạn"
                  buttonText={<FaEnvelope />}
                  className="newsletter-compact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="relative">
          {/* Decorative line */}
          <div
            className="h-px mb-8 mx-8"
            style={{
              background: `linear-gradient(90deg, transparent, var(--color-accent), transparent)`,
              boxShadow: `0 0 20px var(--color-accent)`,
            }}
          />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-text-secondary text-sm text-center md:text-left">
              <p>
                © 2025 <span className="font-bold text-accent">USide</span> -
                Nền tảng hướng nghiệp IT
              </p>
              <p className="mt-1 text-xs opacity-75">
                Được phát triển với ❤️ bởi team USide
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-text-secondary hover:text-accent transition-colors duration-300
                hover:underline decoration-accent decoration-wavy"
              >
                Điều khoản sử dụng
              </a>
              <span className="text-accent">•</span>
              <a
                href="#"
                className="text-text-secondary hover:text-accent transition-colors duration-300
                hover:underline decoration-accent decoration-wavy"
              >
                Chính sách bảo mật
              </a>
              <span className="text-accent">•</span>
              <a
                href="#"
                className="text-text-secondary hover:text-accent transition-colors duration-300
                hover:underline decoration-accent decoration-wavy"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button - positioned to avoid conflict with FloatingMusicControl */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
          text-white font-bold transition-all duration-300 transform hover:scale-110 z-40"
        style={{
          background: "var(--color-accent)",
          boxShadow: `
            -6px -6px 12px #FAFBFF,
            6px 6px 12px var(--color-shadow),
            0 0 20px var(--color-accent)/20
          `,
        }}
      >
        <HiArrowSmUp />
      </button>
    </footer>
  );
};

export default Footer;
