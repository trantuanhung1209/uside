import { useState } from "react";

const Caculator = () => {
  // Calculator states
  const [display, setDisplay] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const correctPassword = "120905";

  // Calculator functions
  const handleNumberClick = (number: string) => {
    if (display.length < 6) {
      setDisplay((prev) => prev + number);
    }
  };

  const handleClear = () => {
    setDisplay("");
    setIsSuccess(false);
  };

  const handleSubmit = () => {
    if (display === correctPassword) {
      setIsSuccess(true);
    } else {
      // Shake animation for wrong password
      setDisplay("");
      setTimeout(() => {
        setIsSuccess(false);
      }, 100);
    }
  };
  return (
    <>
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
            <span className="text-accent">�</span> Mật Thư USide
          </h3>

          <div className="mb-4">
            <div
              className="p-4 rounded-2xl mb-3"
              style={{
                background: "var(--color-background)",
                boxShadow: `
                      inset -6px -6px 12px #FAFBFF,
                      inset 6px 6px 12px var(--color-shadow)
                    `,
              }}
            >
              <p className="text-sm text-text-secondary mb-2 text-center">
                {isSuccess
                  ? "✅ Nhập thành công!"
                  : "Nhập đáp án mật thư ở đây"}
              </p>
              <div className="text-center">
                {isSuccess ? (
                  <div className="text-green-500 font-bold animate-pulse">
                    Đến A6.1 báo mật khẩu cho trưởng trạm.
                  </div>
                ) : (
                  <div className="text-xl font-mono tracking-widest text-text-primary min-h-[28px]">
                    {display || "_ _ _ _ _ _"}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="w-full h-12 rounded-xl text-text-primary font-semibold
                        transition-all duration-200 transform hover:scale-95 active:scale-90"
                  style={{
                    background: "var(--color-background)",
                    boxShadow: `
                          -4px -4px 8px #FAFBFF,
                          4px 4px 8px var(--color-shadow)
                        `,
                  }}
                  disabled={isSuccess}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={handleClear}
                className="w-full h-12 rounded-xl text-red-500 font-semibold
                      transition-all duration-200 transform hover:scale-95 active:scale-90"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                        -4px -4px 8px #FAFBFF,
                        4px 4px 8px var(--color-shadow)
                      `,
                }}
              >
                C
              </button>

              <button
                onClick={() => handleNumberClick("0")}
                className="w-full h-12 rounded-xl text-text-primary font-semibold
                      transition-all duration-200 transform hover:scale-95 active:scale-90"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                        -4px -4px 8px #FAFBFF,
                        4px 4px 8px var(--color-shadow)
                      `,
                }}
                disabled={isSuccess}
              >
                0
              </button>

              <button
                onClick={handleSubmit}
                className="w-full h-12 rounded-xl text-accent font-semibold
                      transition-all duration-200 transform hover:scale-95 active:scale-90"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                        -4px -4px 8px #FAFBFF,
                        4px 4px 8px var(--color-shadow)
                      `,
                }}
                disabled={isSuccess}
              >
                ✓
              </button>
            </div>

            {isSuccess && (
              <div className="mt-4 text-center">
                <p className="text-xs text-green-500 animate-bounce">
                  🎉 Bạn đã khám phá được bí mật!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Caculator;
