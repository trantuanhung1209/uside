import { OptimizedImage } from "../../ui";

const Section1 = () => {
  // Tạo danh sách hình ảnh đa dạng cho infinite scroll
  const images = [
    "/images_uside/pet_cloud_uside.png",
    "/images_uside/pet_cloud_uside.png",
    "/images_uside/pet_cloud_uside.png",
    "/images_uside/pet_cloud_uside.png",
    "/images_uside/pet_cloud_uside.png",
    "/images_uside/pet_cloud_uside.png",
    "/images_uside/pet_cloud_uside.png",
    "/images_uside/pet_cloud_uside.png",
  ];

  return (
    <section className="section-1 overflow-x-hidden bg-background ml-[-100px]">
      <div
        className="bg-background px-3 mb-8"
        style={{
          boxShadow:
            "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
        }}
      >
        <div className="inf-scroll-hozizon">
          {/* First set of logos for seamless loop */}
          <div className="logos">
            {images.map((src, index) => (
              <OptimizedImage
                key={`first-${index}`}
                src={src}
                alt={`USide mascot ${index + 1}`}
                loading="lazy"
                className="w-[125px] h-[100px] mx-[40px] inline-block object-contain"
                width={125}
                height={100}
              />
            ))}
          </div>
          {/* Duplicate set for seamless infinite effect */}
          <div className="logos">
            {images.map((src, index) => (
              <OptimizedImage
                key={`second-${index}`}
                src={src}
                alt={`USide mascot duplicate ${index + 1}`}
                loading="lazy"
                className="w-[125px] h-[100px] mx-[40px] inline-block object-contain"
                width={125}
                height={100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
