import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";
import { PiShootingStarBold } from "react-icons/pi";
import { 
  careerPaths, 
  quizQuestionsByCareer 
} from "../data";

const DirectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [hasStartedQuiz, setHasStartedQuiz] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Record<number, string>>({});
  const [hover, setHover] = useState(false);

  const career = careerPaths.find((item) => item.id === id);
  const quizQuestions = quizQuestionsByCareer[id || ""] || [];
  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    if (!career || quizQuestions.length === 0) {
      navigate("/direction");
    }
  }, [career, quizQuestions.length, navigate]);

  // Load saved answer when changing questions
  useEffect(() => {
    const savedAnswer = answersHistory[currentQuestionIndex];
    if (savedAnswer) {
      setSelectedOption(savedAnswer);
      setShowResult(true);
    } else {
      setSelectedOption("");
      setShowResult(false);
    }
  }, [currentQuestionIndex, answersHistory]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowResult(true);
    // Save answer to history
    setAnswersHistory(prev => ({
      ...prev,
      [currentQuestionIndex]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      // selectedOption và showResult sẽ được set trong useEffect
    } else {
      // Đã hoàn thành tất cả câu hỏi
      setIsQuizCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      // selectedOption và showResult sẽ được set trong useEffect
    }
  };

  const handleStartQuiz = () => {
    setHasStartedQuiz(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setShowResult(false);
    setIsQuizCompleted(false);
    setHasStartedQuiz(true);
    setAnswersHistory({});
  };

  if (!career || !currentQuestion) {
    return null;
  }

  return (
    <Layout>
      <BannerBreadcrumb
        pageName={`Định hướng: ${career.title}`}
        image="/images_uside/banner_direction.png"
      />

      <section
        className="py-16 sm:py-20 lg:py-24 min-h-screen"
        style={{
          background: "var(--color-background)",
        }}
      >
        {/* Custom CSS Animations */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes slideInLeft {
              from { 
                opacity: 0;
                transform: translateX(-50px);
              }
              to { 
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes slideInRight {
              from { 
                opacity: 0;
                transform: translateX(50px);
              }
              to { 
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes fadeInUp {
              from { 
                opacity: 0;
                transform: translateY(30px);
              }
              to { 
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes scaleIn {
              from { 
                transform: scale(0.9);
              }
              to { 
                transform: scale(1);
              }
            }
            
            .animate-fade-in {
              animation: fadeIn 0.6s ease-out;
            }
            
            .animate-fade-in-up {
              animation: fadeInUp 0.8s ease-out;
            }
            
            .animate-slide-in-left {
              animation: slideInLeft 0.8s ease-out;
            }
            
            .animate-slide-in-right {
              animation: slideInRight 0.8s ease-out;
            }
          `,
          }}
        />
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className={`
              inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl
              text-sm font-medium transition-all duration-300
              transform hover:scale-105 active:scale-95 cursor-pointer text-accent
            `}
            style={{
              background: "var(--color-background)",
              boxShadow: `
                6px 6px 12px var(--color-shadow),
                -6px -6px 12px #FAFBFF
              `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                8px 8px 16px var(--color-shadow),
                -8px -8px 16px #FAFBFF,
                0 0 15px rgba(0, 210, 255, 0.1)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                6px 6px 12px var(--color-shadow),
                -6px -6px 12px #FAFBFF
              `;
            }}
          >
            <span>←</span>
            Quay lại trang chủ
          </button>

          <div className="starter mb-8">
            <div
              className="p-4 lg:p-8 rounded-3xl text-center transform transition-all duration-700 ease-in-out animate-fade-in-up"
              style={{
                background: "var(--color-background)",
                boxShadow: `
                  4px 4px 8px var(--color-shadow),
                  -4px -4px 8px #FAFBFF
                `,
                animation: "fadeInUp 0.6s ease-out",
              }}
            >
              <div
                className="text-6xl mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                🎯
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                Bắt đầu khám phá
              </h2>
              <p
                className="text-base sm:text-lg mb-6 max-w-2xl mx-auto"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Hãy trả lời một số câu hỏi để khám phá khả năng và sở thích của
                bạn trong lĩnh vực <strong>{career.title}</strong>. Điều này sẽ
                giúp bạn hiểu rõ hơn về con đường nghề nghiệp này.
              </p>

              {!hasStartedQuiz ? (
                <div className="flex justify-center">
                  <button
                    onClick={handleStartQuiz}
                    className={`
                    neumorphic-button
                  `}
                  >
                    🚀 Bắt đầu ngay
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <span
                    className="text-lg font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Đã bắt đầu quiz
                  </span>
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ background: "var(--color-accent)" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quiz Section */}
          {hasStartedQuiz && !isQuizCompleted && (
            <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
              {/* Question */}
              <div
                className="p-4 lg:p-8 rounded-3xl transform transition-all duration-700 ease-in-out animate-slide-in-left"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                  4px 4px 8px var(--color-shadow),
                -4px -4px 8px #FAFBFF
                `,
                  animation: "slideInLeft 0.8s ease-out, fadeIn 0.8s ease-out",
                }}
              >
                {/* Question Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Câu hỏi {currentQuestionIndex + 1} /{" "}
                      {quizQuestions.length}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {Math.round(
                        ((currentQuestionIndex + 1) / quizQuestions.length) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                      inset 4px 4px 8px var(--color-shadow),
                      inset -4px -4px 8px #FAFBFF
                    `,
                    }}
                  >
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${
                          ((currentQuestionIndex + 1) / quizQuestions.length) *
                          100
                        }%`,
                        background: "var(--color-accent)",
                      }}
                    />
                  </div>
                </div>

                <h2
                  className="lg:text-2xl xs:text-xl font-bold mb-6"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={showResult}
                      className={`
                      w-full lg:p-4 p-3 rounded-2xl text-left transition-all duration-500
                      transform hover:scale-[1.02] active:scale-98 animate-fade-in-up
                      ${selectedOption === option.id ? "ring-2" : ""}
                      ${
                        showResult && option.isCorrect ? "border-green-400" : ""
                      }
                      ${
                        showResult &&
                        selectedOption === option.id &&
                        !option.isCorrect
                          ? "border-red-400"
                          : ""
                      }
                    `}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        color: "var(--color-text-primary)",
                        background: "var(--color-background)",
                        boxShadow: `
                        4px 4px 8px var(--color-shadow),
                -4px -4px 8px #FAFBFF
                      `,
                        ...(selectedOption === option.id && {
                          outline: `2px solid var(--color-accent)`,
                          outlineOffset: "2px",
                        }),
                      }}
                      onMouseEnter={(e) => {
                        if (!showResult) {
                          e.currentTarget.style.boxShadow = `
                          4px 4px 8px var(--color-shadow),
                          -4px -4px 8px #FAFBFF,
                          0 0 20px rgba(0, 210, 255, 0.1)
                        `;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!showResult) {
                          e.currentTarget.style.boxShadow = `
                          4px 4px 8px var(--color-shadow),
                -4px -4px 8px #FAFBFF
                        `;
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                          w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                          ${
                            showResult && option.isCorrect
                              ? "bg-green-400 text-white"
                              : ""
                          }
                          ${
                            showResult &&
                            selectedOption === option.id &&
                            !option.isCorrect
                              ? "bg-red-400 text-white"
                              : ""
                          }
                        `}
                          style={{
                            background: showResult
                              ? undefined
                              : "var(--color-accent)",
                            color: showResult ? undefined : "white",
                          }}
                        >
                          {option.id.toUpperCase()}
                        </div>
                        <span className="flex-1">{option.text}</span>
                        {showResult && (
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--color-accent)" }}
                          >
                            {option.percentage}%
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`
                    neumorphic-button
                    ${
                      currentQuestionIndex === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  `}
                    style={{
                      color: "white",
                      background: "var(--color-background)",
                      textShadow:
                        "0 0 2px var(--color-accent)," +
                        "0 0 4px var(--color-accent)," +
                        "0 0 8px var(--color-accent)",
                    }}
                  >
                    ← Trước
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                    className={`neumorphic-button
                    ${
                      !selectedOption
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  `}
                  >
                    {currentQuestionIndex === quizQuestions.length - 1
                      ? "🏁 Hoàn thành"
                      : "Tiếp →"}
                  </button>
                </div>
              </div>

              {/* Results/Analysis */}
              {showResult && (
                <div
                  className="p-6 sm:p-8 rounded-3xl transform transition-all duration-700 ease-in-out animate-slide-in-right"
                  style={{
                    background: "var(--color-background)",
                    boxShadow: `
                    4px 4px 8px var(--color-shadow),
                  -4px -4px 8px #FAFBFF
                  `,
                    animation:
                      "slideInRight 0.8s ease-out, fadeIn 0.8s ease-out",
                  }}
                >
                  <>
                    <h3
                      className="text-xl font-bold mb-6"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      📊 Phân tích kết quả
                    </h3>

                    {/* Results Chart */}
                    <div className="space-y-4 mb-6">
                      {currentQuestion.options.map((option) => (
                        <div key={option.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {option.id.toUpperCase()}. {option.text}
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{ color: "var(--color-accent)" }}
                            >
                              {option.percentage}%
                            </span>
                          </div>
                          <div
                            className="h-3 rounded-full overflow-hidden"
                            style={{
                              background: "var(--color-background)",
                              boxShadow: `
                              inset 3px 3px 6px var(--color-shadow),
                              inset -3px -3px 6px #FAFBFF
                            `,
                            }}
                          >
                            <div
                              className="h-full transition-all duration-1000 rounded-full"
                              style={{
                                width: `${option.percentage}%`,
                                background: option.isCorrect
                                  ? "#22c55e"
                                  : selectedOption === option.id
                                  ? "#ef4444"
                                  : "var(--color-accent)",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: "var(--color-background)",
                        boxShadow: `
                        inset 6px 6px 12px var(--color-shadow),
                        inset -6px -6px 12px #FAFBFF
                      `,
                      }}
                    >
                      <h4
                        className="font-semibold mb-2 flex items-center gap-2"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        💡 Giải thích
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </>
                </div>
              )}
            </div>
          )}

          {/* Quiz Completed Section */}
          {isQuizCompleted && (
            <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
              <div
                className="p-6 sm:p-8 rounded-3xl transform transition-all duration-1000 ease-in-out"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                    4px 4px 8px var(--color-shadow),
                    -4px -4px 8px #FAFBFF
                  `,
                  animation: "fadeInUp 1.2s ease-out, scaleIn 1.2s ease-out",
                }}
              >
                {/* Quiz Completion Message */}
                <div className="text-center py-8 relative overflow-hidden">
                  {/* Simple Fireworks flying up */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${15 + i * 15}%`,
                          bottom: "10%",
                          animation: `firework-${i} 3s ease-out infinite`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      >
                        <div
                          className="text-2xl"
                          style={{
                            color: [
                              "#ff6b6b",
                              "#feca57",
                              "#48dbfb",
                              "#ff9ff3",
                              "#1dd1a1",
                              "#ff7675",
                            ][i],
                          }}
                        >
                          <span>
                            <PiShootingStarBold />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CSS Animation Styles */}
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                      @keyframes firework-0 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-200px) scale(1); opacity: 1; }
                        100% { transform: translateY(-400px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-1 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-180px) scale(1); opacity: 1; }
                        100% { transform: translateY(-360px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-2 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-220px) scale(1); opacity: 1; }
                        100% { transform: translateY(-420px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-3 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-190px) scale(1); opacity: 1; }
                        100% { transform: translateY(-380px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-4 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-210px) scale(1); opacity: 1; }
                        100% { transform: translateY(-410px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-5 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-170px) scale(1); opacity: 1; }
                        100% { transform: translateY(-340px) scale(1.5); opacity: 0; }
                      }
                    `,
                    }}
                  />
                  <div
                    className="lg:text-8xl xs:text-4xl mb-6 animate-bounce relative z-10"
                    style={{ color: "var(--color-accent)" }}
                  >
                    🎉
                  </div>
                  <h3
                    className="text-xl lg:text-3xl font-bold mb-4"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Chúc mừng! Bạn đã hoàn thành quiz
                  </h3>
                  <div
                    className="lg:p-6 xs:p-4 rounded-2xl mb-6"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                        inset 6px 6px 12px var(--color-shadow),
                        inset -6px -6px 12px #FAFBFF
                      `,
                    }}
                  >
                    <p
                      className="lg:text-lg xs:text-base leading-relaxed mb-4"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Cảm ơn bạn đã dành thời gian khám phá lĩnh vực{" "}
                      <strong>{career.title}</strong>! Hy vọng những câu hỏi này
                      đã giúp bạn hiểu rõ hơn về con đường nghề nghiệp này.
                    </p>
                    <div
                      className="flex items-center justify-center gap-2 text-lg font-semibold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <span>
                        <PiShootingStarBold />
                      </span>
                      <span>Chúc bạn thành công trên con đường sự nghiệp!</span>
                      <span>
                        <PiShootingStarBold />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 justify-center">
                    <button
                      onClick={handleRestartQuiz}
                      className={`
                        neumorphic-button
                      `}
                    >
                      Làm lại quiz
                    </button>

                    <button
                      onClick={() => navigate("/")}
                      className={`
                        neumorphic-button 
                      `}
                      style={{
                        color: hover ? "white" : "var(--color-text-primary)",
                        background: "var(--color-background)",
                      }}

                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      Về trang chủ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DirectionDetailPage;
