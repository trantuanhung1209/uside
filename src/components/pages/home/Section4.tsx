import { useState } from "react";
import Title from "../../ui/Title";
import { NavLink } from "react-router-dom";

const Section4 = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const newsImages = [
    "/images_uside/news.png",
    "/images_uside/mascot_robot.png",
    "/images_uside/uside_light.png",
    "/images_uside/pet_uside_light.png",
    "/images_uside/z6849925073363_1051025711bd5abd231e144acd5e7eee.jpg",
  ];

  const handlePaginationClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <>
      <div className="section-4 py-10 md:py-16 lg:py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            title="Tin tức mới nhất"
            desc="Cập nhật những thông tin mới nhất từ chúng tôi."
          />

          <div className="inner-content">
            <div
              className="bg-background rounded-2xl p-4 sm:p-6 md:p-8 mb-8"
              style={{
                boxShadow:
                  "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[60px]">
                <div className="relative order-2 lg:order-1">
                  <div className="h-48 sm:h-64 md:h-72 lg:h-[300px] w-full lg:w-[90%] overflow-hidden rounded-2xl hover:scale-105 transition-all duration-500 relative mx-auto lg:mx-0">
                    <img
                      src={newsImages[activeSlide]}
                      alt={`News Image ${activeSlide + 1}`}
                      className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                    />
                  </div>

                  <div className="pagination flex justify-center gap-3 mt-4 sm:mt-6">
                    {newsImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePaginationClick(index)}
                        className={`pagination-dot ${
                          activeSlide === index ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="inner-buttons flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4 mb-4 lg:mb-0">
                    <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base hover:font-bold text-text-primary transform hover:scale-105 transition-all duration-300 cursor-pointer neuphoric-button">
                      Mới nhất
                    </button>
                    <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base hover:font-bold text-text-primary transform hover:scale-105 transition-all duration-300 cursor-pointer">
                      Tin tức
                    </button>
                    <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base hover:font-bold text-text-primary transform hover:scale-105 transition-all duration-300 cursor-pointer">
                      Tuyển dụng
                    </button>
                    
                  </div>

                  <div className="inner-list-news">
                    <ul className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6">
                      <li className="mb-2 flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-2">
                        <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-[20px] items-start  w-full">
                          <NavLink 
                            to="/tin-tuc/1" 
                            className="neumorphic-button text-sm sm:text-base px-4 py-2 whitespace-nowrap"
                          >
                            Xem chi tiết
                          </NavLink>
                          <div className="flex-1 line-clamp-2 sm:line-clamp-1 text-sm sm:text-base">
                            Tin tức mới nhất về USide và các hoạt động của chúng
                            tôi.
                          </div>
                        </div>
                        <div className="inner-date mt-2 sm:mt-0">
                          <span className="text-gray-500 text-sm sm:text-base whitespace-nowrap">12/10/2023</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section4;
