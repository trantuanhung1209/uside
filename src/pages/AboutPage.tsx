import { BannerBreadcrumb } from '../components';
import { Layout } from '../components/layout';
import Title from '../components/ui/Title';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Giới thiệu"
        image="/images_uside/banner_about.png"
      />

      <section className="inner-about pt-[80px]">
        <Title
          title="Giới thiệu về USide"
          desc="Chúng tôi là một nền tảng trực tuyến cung cấp không gian cá nhân hóa cho người dùng."
        />

        <div className="inner-content">
          <div className="container max-w-7xl mx-auto">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Feature 1 */}
              <div className="feature-card group relative p-8 rounded-3xl bg-background transition-all duration-500 hover:transform hover:translateY(-8px) hover:scale-105">
                {/* Neumorphic shadow */}
                <div className="absolute inset-0 rounded-3xl bg-background shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25)] group-hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.3),0_0_30px_rgba(0,210,255,0.15)] transition-all duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center group-hover:shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.3)] transition-all duration-300">
                    <svg className="w-8 h-8 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                      <polyline points="2,17 12,22 22,17"/>
                      <polyline points="2,12 12,17 22,12"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 1
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed mb-6 group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  {/* Learn More Link */}
                  <div className="inline-flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Learn more</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="feature-card group relative p-8 rounded-3xl bg-background transition-all duration-500 hover:transform hover:translateY(-8px) hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-background shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25)] group-hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.3),0_0_30px_rgba(0,210,255,0.15)] transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center group-hover:shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.3)] transition-all duration-300">
                    <svg className="w-8 h-8 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 3
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed mb-6 group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  <div className="inline-flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Learn more</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-card group relative p-8 rounded-3xl bg-background transition-all duration-500 hover:transform hover:translateY(-8px) hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-background shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25)] group-hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.3),0_0_30px_rgba(0,210,255,0.15)] transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center group-hover:shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.3)] transition-all duration-300">
                    <svg className="w-8 h-8 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 2
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed mb-6 group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  <div className="inline-flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Learn more</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="feature-card group relative p-8 rounded-3xl bg-background transition-all duration-500 hover:transform hover:translateY(-8px) hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-background shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25)] group-hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.3),0_0_30px_rgba(0,210,255,0.15)] transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center group-hover:shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.3)] transition-all duration-300">
                    <svg className="w-8 h-8 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="7.5,4.21 12,6.81 16.5,4.21"/>
                      <polyline points="7.5,19.79 7.5,14.6 3,12"/>
                      <polyline points="21,12 16.5,14.6 16.5,19.79"/>
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 4
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed mb-6 group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  <div className="inline-flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Learn more</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bridge Connection - Flowing transition to next section */}
            <div className="relative mt-16 mb-0">
              {/* Flow path container */}
              <div className="relative h-96 overflow-visible">
                {/* Curved flow path SVG */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 800 400" 
                  fill="none" 
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Main flow curve */}
                  <path
                    d="M50 100 Q400 50 400 200 Q400 350 750 300"
                    stroke="url(#flowGradient)"
                    strokeWidth="6"
                    fill="none"
                    className="opacity-30"
                  />
                  
                  {/* Secondary flow curve */}
                  <path
                    d="M100 120 Q400 80 400 200 Q400 320 700 280"
                    stroke="url(#flowGradient2)"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-20"
                  />
                  
                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#3aefc4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3aefc4" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3aefc4" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  
                  {/* Animated flow particles */}
                  <circle r="3" fill="#00d2ff" opacity="0.8">
                    <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#flowPath"/>
                    </animateMotion>
                  </circle>
                  
                  <circle r="2" fill="#3aefc4" opacity="0.6">
                    <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" begin="1s">
                      <mpath href="#flowPath"/>
                    </animateMotion>
                  </circle>
                  
                  {/* Hidden path for animation */}
                  <path id="flowPath" d="M50 100 Q400 50 400 200 Q400 350 750 300" opacity="0"/>
                </svg>

                {/* Central Bridge Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative group cursor-pointer">
                    {/* Main bridge circle with neumorphic design */}
                    <div className="w-32 h-32 rounded-full bg-background relative overflow-hidden transition-all duration-700 hover:scale-110 hover:rotate-12">
                      {/* Neumorphic shadow layers */}
                      <div className="absolute inset-0 rounded-full shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25)] group-hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.3),0_0_30px_rgba(0,210,255,0.2)] transition-all duration-700"></div>
                      
                      {/* Inner pressed effect */}
                      <div className="absolute inset-3 rounded-full bg-background shadow-[inset_-8px_-8px_16px_#FAFBFF,inset_8px_8px_16px_rgba(22,17,29,0.15)] group-hover:shadow-[inset_-12px_-12px_24px_#FAFBFF,inset_12px_12px_24px_rgba(22,17,29,0.2)] transition-all duration-700"></div>
                      
                      {/* Mountain illustration */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-accent group-hover:scale-110 group-hover:text-[#3aefc4] transition-all duration-500" viewBox="0 0 120 120" fill="currentColor">
                          <polygon points="60,25 85,75 35,75" opacity="0.9"/>
                          <polygon points="50,40 75,75 25,75" opacity="0.7"/>
                          <circle cx="75" cy="40" r="6" opacity="0.8"/>
                          <circle cx="30" cy="35" r="1.5" opacity="0.6"/>
                          <circle cx="85" cy="30" r="1" opacity="0.6"/>
                        </svg>
                      </div>
                      
                      {/* Ripple effect on hover */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-[#3aefc4] opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-all duration-300"></div>
                      
                      {/* Floating particles around bridge */}
                      <div className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-accent rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="absolute -bottom-3 -left-3 w-1 h-1 bg-[#3aefc4] rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute -top-3 -left-2 w-1 h-1 bg-accent rounded-full opacity-60 animate-bounce" style={{ animationDelay: '2s' }}></div>
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent/40 rounded-full"></div>
                      <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#3aefc4]/40 rounded-full"></div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Flow connection points */}
                <div className="absolute top-20 left-12 w-3 h-3 bg-accent/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-12 w-3 h-3 bg-[#3aefc4]/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Connecting flow elements */}
                <div className="absolute top-16 left-1/4 w-4 h-1 bg-gradient-to-r from-accent to-transparent rounded-full opacity-40"></div>
                <div className="absolute bottom-16 right-1/4 w-4 h-1 bg-gradient-to-l from-[#3aefc4] to-transparent rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-2 pb-[80px] bg-gradient-to-br from-background to-primary/5 -mt-48 pt-48 relative z-10">
        <div className="container max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Title and Description */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                  Tại sao <span className="bg-gradient-to-r from-accent to-[#3aefc4] bg-clip-text text-transparent">USIDE</span>
                  <br />Xuất hiện?
                </h2>
                
                <p className="text-lg text-text-secondary leading-relaxed max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
                </p>
              </div>

              {/* Wireframe Illustration */}
              <div className="relative">
                <div className="w-80 h-64 relative">
                  {/* Neumorphic container */}
                  <div className="absolute inset-0 rounded-3xl bg-background shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.2)] transition-all duration-500 hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.25)]"></div>
                  
                  {/* Wireframe geometric shape */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <svg className="w-full h-full text-text-secondary/40 hover:text-accent/60 transition-colors duration-500" viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {/* Outer rectangle */}
                      <rect x="20" y="20" width="160" height="110" rx="8"/>
                      
                      {/* Diagonal lines */}
                      <line x1="20" y1="20" x2="180" y2="130"/>
                      <line x1="180" y1="20" x2="20" y2="130"/>
                      
                      {/* Center cross */}
                      <line x1="100" y1="20" x2="100" y2="130"/>
                      <line x1="20" y1="75" x2="180" y2="75"/>
                      
                      {/* Corner decorative elements */}
                      <circle cx="20" cy="20" r="3" fill="currentColor"/>
                      <circle cx="180" cy="20" r="3" fill="currentColor"/>
                      <circle cx="20" cy="130" r="3" fill="currentColor"/>
                      <circle cx="180" cy="130" r="3" fill="currentColor"/>
                      <circle cx="100" cy="75" r="4" fill="currentColor"/>
                    </svg>
                  </div>

                  {/* Floating dots animation */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-60 animate-ping"></div>
                  <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-[#3aefc4] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>

            {/* Right Side - Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Feature 1 */}
              <div className="group relative p-6 rounded-2xl bg-background transition-all duration-500 hover:transform hover:translateY(-4px) hover:scale-105">
                {/* Neumorphic shadow */}
                <div className="absolute inset-0 rounded-2xl bg-background shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.2)] group-hover:shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25),0_0_25px_rgba(0,210,255,0.1)] transition-all duration-500"></div>
                
                <div className="relative z-10 text-center space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 mx-auto rounded-xl bg-background shadow-[-6px_-6px_12px_#FAFBFF,6px_6px_12px_rgba(22,17,29,0.15)] flex items-center justify-center group-hover:shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] transition-all duration-300">
                    <svg className="w-6 h-6 text-accent transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                      <polyline points="2,17 12,22 22,17" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <polyline points="2,12 12,17 22,12" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-text-primary group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 1
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  {/* Learn More Link */}
                  <div className="inline-flex items-center text-accent text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className="mr-1">Learn more</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative p-6 rounded-2xl bg-background transition-all duration-500 hover:transform hover:translateY(-4px) hover:scale-105">
                <div className="absolute inset-0 rounded-2xl bg-background shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.2)] group-hover:shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25),0_0_25px_rgba(0,210,255,0.1)] transition-all duration-500"></div>
                
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-background shadow-[-6px_-6px_12px_#FAFBFF,6px_6px_12px_rgba(22,17,29,0.15)] flex items-center justify-center group-hover:shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] transition-all duration-300">
                    <svg className="w-6 h-6 text-accent transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                    </svg>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 2
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  <div className="inline-flex items-center text-accent text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className="mr-1">Learn more</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative p-6 rounded-2xl bg-background transition-all duration-500 hover:transform hover:translateY(-4px) hover:scale-105">
                <div className="absolute inset-0 rounded-2xl bg-background shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.2)] group-hover:shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25),0_0_25px_rgba(0,210,255,0.1)] transition-all duration-500"></div>
                
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-background shadow-[-6px_-6px_12px_#FAFBFF,6px_6px_12px_rgba(22,17,29,0.15)] flex items-center justify-center group-hover:shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] transition-all duration-300">
                    <svg className="w-6 h-6 text-accent transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 3
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  <div className="inline-flex items-center text-accent text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className="mr-1">Learn more</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative p-6 rounded-2xl bg-background transition-all duration-500 hover:transform hover:translateY(-4px) hover:scale-105">
                <div className="absolute inset-0 rounded-2xl bg-background shadow-[-12px_-12px_24px_#FAFBFF,12px_12px_24px_rgba(22,17,29,0.2)] group-hover:shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25),0_0_25px_rgba(0,210,255,0.1)] transition-all duration-500"></div>
                
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-background shadow-[-6px_-6px_12px_#FAFBFF,6px_6px_12px_rgba(22,17,29,0.15)] flex items-center justify-center group-hover:shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] transition-all duration-300">
                    <svg className="w-6 h-6 text-accent transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-[#3aefc4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Feature 4
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                    Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nec ut commodo
                  </p>

                  <div className="inline-flex items-center text-accent text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className="mr-1">Learn more</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
