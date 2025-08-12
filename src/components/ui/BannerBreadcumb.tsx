import { NavLink } from 'react-router-dom';

const BannerBreadcrumb= ({ pageName, image } : { pageName: string; image: string; }) => {
  return (
    <>
      <section
        className="section-bg w-full h-[450px] bg-border flex items-end justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-transparent to-transparent"></div>

        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-2 h-2 bg-accent/20 rounded-full animate-bounce"
            style={{
              top: "20%",
              left: "10%",
              animationDelay: "0s",
              animationDuration: "3s",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-bounce"
            style={{
              top: "60%",
              left: "80%",
              animationDelay: "1s",
              animationDuration: "2s",
            }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-secondary/20 rounded-full animate-bounce"
            style={{
              top: "30%",
              left: "70%",
              animationDelay: "2s",
              animationDuration: "4s",
            }}
          ></div>
        </div>

        <div className="breadcrumb-container relative z-10 mb-8 px-6 py-4 bg-background/10 backdrop-blur-md rounded-2xl border border-border shadow-2xl transform hover:scale-105 transition-all duration-300">
          <nav className="breadcrumb flex items-center gap-4 text-lg">
            <NavLink
              to="/"
              className="group flex items-center gap-2 text-text-secondary hover:text-text-primary transition-all duration-300 relative"
            >
              <svg
                className="w-5 h-5 group-hover:animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="relative">
                Trang chủ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-300"></span>
              </span>
            </NavLink>

            <div className="breadcrumb-separator flex items-center">
              <svg
                className="w-4 h-4 text-text-placeholder animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <NavLink
              to="/gioi-thieu"
              className="group flex items-center gap-2 text-text-primary font-semibold relative"
            >
              <svg
                className="w-5 h-5 group-hover:animate-spin"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="relative">
                {pageName}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-primary to-accent animate-gradient-x"></span>
              </span>
            </NavLink>
          </nav>

          {/* Floating dots decoration */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
        </div>
      </section>
    </>
  );
};

export default BannerBreadcrumb;