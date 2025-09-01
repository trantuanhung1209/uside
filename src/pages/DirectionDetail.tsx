import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";
import { PiShootingStarBold } from "react-icons/pi";
import { 
  careerPaths, 
  quizQuestionsByCareer,
  type QuizOption
} from "../data";
import { shuffleQuizOptionsWithSeed } from "../utils";

const DirectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shouldScrollToTop, setShouldScrollToTop] = useState(true);
  
  // Only scroll to top on initial load, not on career switches
  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShouldScrollToTop(false);
    }
  }, [shouldScrollToTop]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [hasStartedQuiz, setHasStartedQuiz] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Record<number, string>>(
    {}
  );
  const [hover, setHover] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now()); // Timestamp for consistent shuffling during quiz session
  const [shuffledQuestions, setShuffledQuestions] = useState<
    Record<number, QuizOption[]>
  >({}); // Cache shuffled options

  const handleCareerSwitch = (newCareerId: string) => {
    if (newCareerId !== career?.id) {
      // Reset quiz states
      setCurrentQuestionIndex(0);
      setSelectedOption("");
      setShowResult(false);
      setHasStartedQuiz(false);
      setIsQuizCompleted(false);
      setAnswersHistory({});
      setShuffledQuestions({});
      setQuizStartTime(Date.now());
      
      // Navigate using React Router and allow scroll to top
      navigate(`/direction/${newCareerId}`, { replace: true });
      setShouldScrollToTop(true);
    }
  };

  const career = careerPaths.find((item) => item.id === id);
  const quizQuestions = useMemo(
    () => quizQuestionsByCareer[id || ""] || [],
    [id]
  );
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Initialize shuffled questions when quiz starts
  useEffect(() => {
    if (
      hasStartedQuiz &&
      quizQuestions.length > 0 &&
      Object.keys(shuffledQuestions).length === 0
    ) {
      const newShuffledQuestions: Record<number, QuizOption[]> = {};

      quizQuestions.forEach((question) => {
        newShuffledQuestions[question.id] = shuffleQuizOptionsWithSeed(
          question.options,
          question.id,
          question.question,
          quizStartTime
        );
      });

      setShuffledQuestions(newShuffledQuestions);
    }
  }, [hasStartedQuiz, quizQuestions, shuffledQuestions, quizStartTime]);

  // Get or create shuffled options for current question
  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];

    const questionId = currentQuestion.id;

    // Return cached shuffled options if available
    if (shuffledQuestions[questionId]) {
      return shuffledQuestions[questionId];
    }

    // Fallback: return original options if not shuffled yet
    return currentQuestion.options;
  }, [currentQuestion, shuffledQuestions]);

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
    setAnswersHistory((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
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
    setShuffledQuestions({}); // Clear cached shuffled options
    // Generate new timestamp to reshuffle options for a fresh quiz experience
    setQuizStartTime(Date.now());
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

            /* Floating particles animations */
            @keyframes float-0 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            @keyframes float-1 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-15px) rotate(-180deg); }
            }
            @keyframes float-2 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-25px) rotate(90deg); }
            }
            @keyframes float-3 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-18px) rotate(-90deg); }
            }
            @keyframes float-4 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-22px) rotate(270deg); }
            }
            @keyframes float-5 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-16px) rotate(-270deg); }
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

          {/* Starter Section - Only show when quiz hasn't started */}
          {!hasStartedQuiz && (
            <div className="starter mb-8">
              {/* Career Selection Icons */}
              <div className="mb-8">
                <h3
                  className="text-lg font-semibold text-center mb-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Chọn lĩnh vực khám phá
                </h3>

                <div className="inner-list-icon flex justify-center items-center xl:gap-[40px] gap-[20px]">
                  {careerPaths.map((path) => (
                    <div
                      key={path.id}
                      className={`w-[40px] h-[40px] section-neumorphic p-2 py-2 cursor-pointer transition-all duration-300 ${
                        path.id === career.id
                          ? "ring-2 ring-offset-2"
                          : ""
                      }`}
                      style={{
                        background:
                          path.id === career.id
                            ? "var(--color-accent)"
                            : "var(--color-background)",
                        boxShadow:
                          path.id === career.id
                            ? `0 0 20px var(--color-accent), inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)`
                            : "inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)",
                      }}
                      onClick={() => handleCareerSwitch(path.id)}
                    >
                      <img
                        src={path.icon}
                        alt={path.title}
                        className={`w-full h-full object-contain transition-all duration-300 ${
                          path.id === career.id
                            ? "brightness-0 invert"
                            : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Subtle divider */}
                <div className="flex items-center justify-center mt-6 mb-4">
                  <div
                    className="w-16 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, var(--color-accent), transparent)`,
                      opacity: 0.3,
                    }}
                  />
                </div>
              </div>

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
                  Khám phá nghề nghiệp: {career.title}
                </h2>
                <p
                  className="text-base sm:text-lg mb-6 max-w-2xl mx-auto"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Hãy trả lời một số câu hỏi để khám phá khả năng và sở thích
                  của bạn trong lĩnh vực <strong>{career.title}</strong>. Điều
                  này sẽ giúp bạn hiểu rõ hơn về con đường nghề nghiệp này và
                  khả năng phù hợp của bạn.
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={handleStartQuiz}
                    className="neumorphic-button"
                  >
                    🚀 Bắt đầu khám phá ngay
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Section */}
          {hasStartedQuiz && !isQuizCompleted && (
            <div>
              {/* Quiz Header */}
              <div className="text-center mb-8 animate-fade-in-up">
                <h2
                  className="text-2xl lg:text-3xl font-bold mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Quiz: {career.title}
                </h2>
                <p
                  className="text-sm lg:text-base"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Khám phá khả năng và sở thích của bạn trong lĩnh vực này
                </p>
              </div>

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
                    animation:
                      "slideInLeft 0.8s ease-out, fadeIn 0.8s ease-out",
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
                            ((currentQuestionIndex + 1) /
                              quizQuestions.length) *
                            100
                          }%`,
                          background: "var(--color-accent)",
                        }}
                      />
                    </div>
                  </div>

                  <h2
                    className="lg:text-[22px] xs:text-xl font-bold mb-6"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {currentQuestion.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-4">
                    {shuffledOptions.map((option, index) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        disabled={showResult}
                        className={`
                      w-full lg:p-4 p-3 rounded-2xl text-left transition-all duration-500
                      transform hover:scale-[1.02] active:scale-98 animate-fade-in-up
                      ${!showResult ? "cursor-pointer" : "cursor-default"}
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
                          {showResult && (
                            <div
                              className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                            ${
                              option.isCorrect
                                ? "bg-green-400 text-white"
                                : selectedOption === option.id
                                ? "bg-red-400 text-white"
                                : "bg-gray-300 text-gray-600"
                            }
                          `}
                            >
                              {option.isCorrect
                                ? "✓"
                                : selectedOption === option.id
                                ? "✗"
                                : "○"}
                            </div>
                          )}
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
                    ${!selectedOption ? "opacity-50 cursor-not-allowed" : ""}
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
                    <h3
                      className="text-xl font-bold mb-6"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      📊 Phân tích kết quả
                    </h3>

                    {/* Results Chart */}
                    <div className="space-y-4 mb-6">
                      {shuffledOptions.map((option) => (
                        <div key={option.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {option.text}
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
                        className="text-sm leading-relaxed font-medium"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
                      🔄 Làm lại quiz
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
                      🏠 Về trang chủ
                    </button>
                  </div>
                </div>

                {/* Other Career Paths Section */}
                <div className="pt-8">
                  {/* Decorative divider */}
                  <div className="flex items-center justify-center mb-8">
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: `linear-gradient(to right, transparent, var(--color-accent), transparent)`,
                      }}
                    />
                    <div
                      className="px-6 py-2 rounded-full mx-4"
                      style={{
                        background: "var(--color-background)",
                        boxShadow: `
                          4px 4px 8px var(--color-shadow),
                          -4px -4px 8px #FAFBFF
                        `,
                      }}
                    >
                      <span
                        className="text-2xl"
                        style={{ color: "var(--color-accent)" }}
                      >
                        ✨
                      </span>
                    </div>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: `linear-gradient(to left, transparent, var(--color-accent), transparent)`,
                      }}
                    />
                  </div>

                  <div className="text-center mb-12">
                    <h3
                      className="text-xl xl:text-3xl font-bold mb-4 animate-fade-in-up"
                      style={{
                        color: "var(--color-text-primary)",
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      🚀 Khám phá nghề nghiệp khác
                    </h3>
                    <p
                      className="text-base xl:text-lg max-w-2xl mx-auto animate-fade-in-up"
                      style={{
                        color: "var(--color-text-secondary)",
                        animationDelay: "0.2s",
                      }}
                    >
                      Tiếp tục hành trình khám phá và tìm hiểu thêm về các lĩnh
                      vực nghề nghiệp khác trong ngành IT
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                    {careerPaths
                      .filter((path) => path.id !== career.id) // Exclude current career
                      .map((path, index) => (
                        <div
                          key={path.id}
                          className="group cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 animate-fade-in-up h-full"
                          style={{
                            animationDelay: `${index * 0.15}s`,
                          }}
                          onClick={() => handleCareerSwitch(path.id)}
                        >
                          <div className="relative p-8 rounded-3xl transition-all duration-500 overflow-hidden h-full flex flex-col section-neumorphic">
                            {/* Gradient background overlay */}
                            <div
                              className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${path.gradient}`}
                            />

                            {/* Floating particles effect */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              {[...Array(6)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-2 h-2 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-1000"
                                  style={{
                                    background: "var(--color-accent)",
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 3) * 20}%`,
                                    animation: `float-${i} 3s ease-in-out infinite`,
                                    animationDelay: `${i * 0.5}s`,
                                    boxShadow: "0 0 10px var(--color-accent)",
                                  }}
                                />
                              ))}
                            </div>

                            {/* Career Icon with enhanced styling */}
                            <div className="text-center mb-6 relative z-10">
                              <div
                                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                                style={{
                                  background: "var(--color-background)",
                                  boxShadow: `
                                    inset 4px 4px 8px var(--color-shadow),
                                    inset -4px -4px 8px #FAFBFF
                                  `,
                                }}
                              >
                                <img
                                  src={path.icon}
                                  alt={path.title}
                                  className="w-12 h-12 object-contain transition-all duration-500 group-hover:brightness-110"
                                />
                              </div>
                            </div>

                            {/* Career Title with glow effect */}
                            <h4
                              className="text-xl font-bold text-center mb-4 transition-all duration-300 group-hover:scale-105 relative z-10"
                              style={{
                                color: "var(--color-text-primary)",
                                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            >
                              {path.title}
                            </h4>

                            {/* Career Description - flex-1 để chiếm không gian còn lại */}
                            <div className="flex-1 flex flex-col justify-between relative z-10">
                              <p
                                className="text-sm text-center mb-6 leading-relaxed"
                                style={{
                                  color: "var(--color-text-secondary)",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  minHeight: "4.5rem", // Đảm bảo chiều cao tối thiểu
                                }}
                              >
                                {path.description}
                              </p>

                              {/* Skills Preview with enhanced styling */}
                              <div className="flex flex-wrap gap-2 justify-center mb-6">
                                {path.skills
                                  .slice(0, 3)
                                  .map((skill, skillIndex) => (
                                    <span
                                      key={skill}
                                      className="px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105"
                                      style={{
                                        background: "var(--color-background)",
                                        color: "var(--color-accent)",
                                        boxShadow: `
                                        inset 3px 3px 6px var(--color-shadow),
                                        inset -3px -3px 6px #FAFBFF
                                      `,
                                        animationDelay: `${skillIndex * 0.1}s`,
                                      }}
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                {path.skills.length > 3 && (
                                  <span
                                    className="px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105"
                                    style={{
                                      background: "var(--color-background)",
                                      color: "var(--color-text-secondary)",
                                      boxShadow: `
                                        inset 3px 3px 6px var(--color-shadow),
                                        inset -3px -3px 6px #FAFBFF
                                      `,
                                    }}
                                  >
                                    +{path.skills.length - 3} more
                                  </span>
                                )}
                              </div>

                              {/* Call to Action with animated arrow - luôn ở bottom */}
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                                  <span
                                    className="text-sm font-semibold transition-all duration-300"
                                    style={{ color: "var(--color-accent)" }}
                                  >
                                    📝 Bắt đầu quiz
                                  </span>
                                  <span
                                    className="text-sm transform group-hover:translate-x-2 transition-transform duration-300"
                                    style={{ color: "var(--color-accent)" }}
                                  >
                                    →
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                style={{ width: "50%" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Enhanced Quick Navigation */}
                  <div className="text-center mt-12">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <button
                        onClick={() => navigate("/direction")}
                        className="group neumorphic-button"
                      >
                        <span className="flex items-center gap-3">
                          <span>Xem tất cả nghề nghiệp</span>
                          <span
                            className="transform group-hover:translate-x-1 transition-transform duration-300"
                            style={{ color: "white" }}
                          >
                            →
                          </span>
                        </span>
                      </button>
                    </div>
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
