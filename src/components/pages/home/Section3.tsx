import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

interface Step {
  id: number;
  title: string;
  description: string;
  content: string;
  icon: string;
  image: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Khám phá bản thân",
    description: "Tìm hiểu về sở thích, điểm mạnh và mục tiêu của bạn",
    content:
      "Một buổi sáng, bạn thức dậy và chợt nhận ra mình đang đi trên một con đường quen thuộc, nhưng lần này, xung quanh đầy những bảng chỉ dẫn mới lạ. Mỗi bảng ghi một câu hỏi: 'Bạn thật sự thích điều gì?', 'Điều gì khiến bạn hạnh phúc?', 'Bạn muốn trở thành ai trong 5 năm tới?'. Bạn mỉm cười, vì biết rằng hành trình quan trọng nhất không phải tìm một nơi chốn… mà là tìm ra chính mình.",
    icon: "🔍",
    image: "/images_uside/mascot_robot.png", // Placeholder image URL
  },
  {
    id: 2,
    title: "Trả lời câu hỏi",
    description: "Hoàn thành bộ câu hỏi đánh giá năng lực và sở thích",
    content:
      "Bạn bước vào một căn phòng ấm áp, nơi có một chiếc bàn gỗ với xấp giấy câu hỏi đang chờ. Mỗi câu hỏi như một cánh cửa mở ra góc khuất của chính bạn — từ sở thích thầm kín cho đến những kỹ năng bạn chưa từng nhận ra. Khi viết câu trả lời cuối cùng, bạn chợt mỉm cười… vì những mảnh ghép về con người thật của mình đang dần hiện rõ.",
    icon: "❓",
    image: "/images_uside/mascot_robot.png", // Placeholder image URL
  },
  {
    id: 3,
    title: "Định hướng tương lai",
    description: "Nhận được gợi ý về nghề nghiệp phù hợp với bạn",
    content:
      "Hãy tưởng tượng bạn đang đứng trước ngã ba đường, mỗi con đường dẫn đến một miền đất mới — nơi bạn có thể phát huy thế mạnh, sống đúng với đam mê và tạo ra giá trị cho người khác. Khi nhận được những gợi ý nghề nghiệp phù hợp, mọi thứ bỗng trở nên rõ ràng hơn: bạn biết mình cần bước đi đâu, và quan trọng nhất… bạn biết lý do vì sao.",
    icon: "🚀",
    image: "/images_uside/mascot_robot.png", // Placeholder image URL
  },
];

const Section3: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Khi hoàn thành (currentStep = 3), chuyển đến trang định hướng
      navigate("/dinh-huong");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      {/* Progress indicator */}
      <div className="mb-8 sm:mb-12">
        {/* Mobile view - Vertical progress */}
        <div className="sm:hidden">
          <div className="flex flex-col items-center space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center w-full max-w-xs">
                {/* Step circle */}
                <div
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 flex-shrink-0
                    ${
                      currentStep === step.id
                        ? "bg-gradient-to-r from-accent to-[#3aefc4] text-white shadow-lg transform scale-110"
                        : currentStep > step.id
                        ? "bg-gradient-to-r from-accent to-[#3aefc4] text-white"
                        : "bg-[#EFF2F9] text-text-secondary shadow-neumorphic"
                    }
                  `}
                  style={{
                    boxShadow:
                      currentStep === step.id
                        ? "0 0 20px rgba(0, 210, 255, 0.4), -6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.2)"
                        : currentStep > step.id
                        ? "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.2)"
                        : "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.2)",
                  }}
                >
                  {currentStep > step.id ? "✓" : step.icon}
                  {currentStep === step.id && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-[#3aefc4] opacity-30 animate-ping" />
                  )}
                </div>
                
                {/* Step info */}
                <div className="ml-4 flex-1">
                  <p className={`text-xs font-semibold transition-colors duration-300 ${
                    currentStep === step.id ? "text-accent" : "text-text-secondary"
                  }`}>
                    Bước {step.id}
                  </p>
                  <h4 className={`text-sm font-medium mt-1 ${
                    currentStep === step.id ? "text-text-primary" : "text-text-secondary"
                  }`}>
                    {step.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view - Horizontal progress */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-center space-x-4 lg:space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step circle */}
                <div
                  className={`
                    relative w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-lg lg:text-2xl font-bold transition-all duration-500
                    ${
                      currentStep === step.id
                        ? "bg-gradient-to-r from-accent to-[#3aefc4] text-white shadow-lg transform scale-110"
                        : currentStep > step.id
                        ? "bg-gradient-to-r from-accent to-[#3aefc4] text-white"
                        : "bg-[#EFF2F9] text-text-secondary shadow-neumorphic"
                    }
                  `}
                  style={{
                    boxShadow:
                      currentStep === step.id
                        ? "0 0 30px rgba(0, 210, 255, 0.4), -8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.2)"
                        : currentStep > step.id
                        ? "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.2)"
                        : "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.2)",
                  }}
                >
                  {currentStep > step.id ? "✓" : step.icon}

                  {/* Pulse animation for current step */}
                  {currentStep === step.id && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-[#3aefc4] opacity-30 animate-ping" />
                  )}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-16 lg:w-24 h-1 mx-2 lg:mx-4 rounded-full transition-all duration-500
                      ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-accent to-[#3aefc4]"
                          : "bg-border"
                      }
                    `}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step labels */}
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 mt-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="text-center w-12 lg:w-16">
                  <p
                    className={`text-xs lg:text-sm font-semibold transition-colors duration-300 ${
                      currentStep === step.id
                        ? "text-accent"
                        : "text-text-secondary"
                    }`}
                  >
                    Bước {step.id}
                  </p>
                </div>
                {index < steps.length - 1 && <div className="w-16 lg:w-24 mx-2 lg:mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content card */}
      {currentStepData && (
        <div
          className="bg-background rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-500 transform"
          style={{
            boxShadow:
              "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.15)",
          }}
        >
          {/* Step header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 lg:mb-4">{currentStepData.icon}</div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-3 lg:mb-4">
              {currentStepData.title}
            </h3>
            <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto px-4">
              {currentStepData.description}
            </p>
          </div>

          {/* Step content */}
          <div
            className="bg-background rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8"
            style={{
              boxShadow:
                "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
            }}
          >
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">
              {/* Text content */}
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div
                  className="w-2 h-2 rounded-full bg-accent mt-3 flex-shrink-0"
                  style={{
                    boxShadow: "0 0 10px rgba(0, 210, 255, 0.5)",
                  }}
                />
                <p className="text-text-primary leading-relaxed text-base lg:text-xl">
                  {currentStepData.content}
                </p>
              </div>
              
              {/* Image */}
              <div className="h-48 sm:h-56 lg:h-[300px] order-first lg:order-last">
                <img
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  className="w-full h-full object-cover rounded-xl lg:rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`
                flex items-center space-x-2 transition-all duration-300 w-full sm:w-auto
                ${
                  currentStep === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:transform hover:translateX(-2px)"
                }
              `}
            >
              <span>←</span>
              <span>Quay lại</span>
            </Button>

            <div className="flex-1 sm:mx-6 lg:mx-8 w-full sm:max-w-md">
              <div
                className="h-2 bg-border rounded-full overflow-hidden"
                style={{
                  boxShadow:
                    "inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px rgba(22, 17, 29, 0.1)",
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-accent to-[#3aefc4] transition-all duration-500 rounded-full"
                  style={{
                    width: `${(currentStep / 3) * 100}%`,
                    boxShadow: "0 0 10px rgba(0, 210, 255, 0.3)",
                  }}
                />
              </div>
              <p className="text-center text-sm text-text-secondary mt-2">
                {currentStep}/3 hoàn thành
              </p>
            </div>

            <Button
              onClick={handleNextStep}
              disabled={false}
              className={`
                flex items-center space-x-2 transition-all duration-300 hover:transform hover:translateX(2px) w-full sm:w-auto
                ${
                  currentStep === 3
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    : ""
                }
              `}
            >
              <span>
                {currentStep === 3 ? "Bắt đầu định hướng" : "Tiếp theo"}
              </span>
              <span>→</span>
            </Button>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-tl from-[#3aefc4]/10 to-transparent rounded-full blur-xl" />

      {/* Background particles */}
      <div className="absolute inset-0 z-[-1] hidden lg:block">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              background: "var(--color-accent)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Mobile background particles - fewer for performance */}
      <div className="absolute inset-0 z-[-1] lg:hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              background: "var(--color-accent)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Section3;
