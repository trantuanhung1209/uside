import { useState } from "react";
import Title from "../../ui/Title";
import { useNavigate } from "react-router-dom";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "USide là gì vậy, nghe lạ thế?",
    answer: "USide là nền tảng giúp sinh viên khám phá bản thân và định hướng nghề nghiệp thông qua những bài quiz vui – mà có ích."
  },
  {
    id: 2,
    question: "Làm quiz xong thì có gì hay ho?",
    answer: "Sau khi hoàn thành, bạn sẽ nhận được gợi ý ngành nghề phù hợp với tính cách, sở thích và thế mạnh của mình. Có khi còn phát hiện ra 'thiên hướng tiềm ẩn' mà bạn chưa từng nghĩ tới!"
  },
  {
    id: 3,
    question: "Quiz có khó như đề thi cuối kỳ không?",
    answer: "Không đâu 😆. Quiz ở USide nhẹ nhàng, mang tính khám phá bản thân, không phải để 'làm khó'. Bạn cứ thoải mái làm như chơi game."
  },
  {
    id: 4,
    question: "Mình có cần trả phí để làm quiz không?",
    answer: "Hoàn toàn miễn phí! Bạn chỉ cần khởi động và bắt đầu hành trình khám phá nghề nghiệp thôi."
  },
  {
    id: 5,
    question: "Nếu kết quả quiz không giống mình nghĩ thì sao?",
    answer: "Đừng lo, quiz chỉ là một gợi ý để bạn tham khảo. Định hướng nghề nghiệp còn đến từ trải nghiệm thực tế, đam mê và mục tiêu cá nhân của bạn nữa."
  }
];



const Section5 = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="section-5 overflow-hidden bg-background py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title 
          title="Câu hỏi & Liên hệ"
          desc="Những câu hỏi thường gặp từ người dùng về chương trình và dịch vụ của chúng tôi."
          link="contact"
        />
        
        <div className="max-w-4xl mx-auto mt-16">
          <div className="faq-grid">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className={`faq-item bg-background rounded-3xl overflow-hidden transition-all duration-500 ease-out self-start ${
                  openItems.includes(item.id) ? 'open' : ''
                }`}
                style={{
                  boxShadow: openItems.includes(item.id)
                    ? 'inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px rgba(22, 17, 29, 0.15)'
                    : '-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.2)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left focus:outline-none group transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-primary pr-4 group-hover:text-accent">
                      {item.question}
                    </h3>
                    <div 
                      className={`faq-plus-icon flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
                        openItems.includes(item.id) ? 'rotate-45 scale-110' : ''
                      }`}
                      style={{
                        boxShadow: '-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)',
                        background: openItems.includes(item.id) 
                          ? 'linear-gradient(135deg, #00d2ff, #3aefc4)'
                          : 'var(--color-secondary)'
                      }}
                    >
                      <svg
                        className={`w-4 h-4 transition-colors duration-300 ${
                          openItems.includes(item.id) ? 'text-white' : 'text-text-secondary group-hover:text-accent'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div 
                  className={`faq-answer-container ${
                    openItems.includes(item.id) ? 'open' : 'closed'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div 
                      className="faq-answer faq-content-glow bg-primary rounded-2xl p-5 relative"
                      style={{
                        boxShadow: 'inset -6px -6px 12px rgba(255, 255, 255, 0.5), inset 6px 6px 12px rgba(22, 17, 29, 0.1)'
                      }}
                    >
                      <p className="text-text-secondary leading-relaxed relative z-10">
                        {item.answer}
                      </p>
                      
                      {/* Decorative gradient accent */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-transparent rounded-full opacity-60"></div>
                      
                      {/* Animated dot decoration */}
                      <div className="absolute bottom-3 right-3">
                        <div 
                          className="w-2 h-2 rounded-full bg-accent opacity-40"
                          style={{
                            boxShadow: '0 0 6px rgba(0, 210, 255, 0.6)',
                            animation: 'pulse 2s infinite'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom decoration */}
          <div className="text-center mt-12">
            <div 
              className="faq-bottom-decoration cursor-pointer group section-neumorphic inline-block"
            >
              <button className="neumorphic-button"
                onClick={() => navigate('/contact')}
              >
                Liên hệ với chúng tôi
              </button>
              
              {/* Floating particles decoration */}
              <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-gradient-to-br from-accent to-primary opacity-30 animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="absolute -top-1 -left-3 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-2 left-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-accent to-primary opacity-25 animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
