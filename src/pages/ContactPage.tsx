import { Layout } from "../components/layout";
import { Title } from "../components";
import { useState, useEffect } from "react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { useContactForm, useScrollToTop } from "../hooks";
import { useNavigate } from "react-router-dom";
import type { ContactFormData } from "../services";

// Form Field Component
interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label
        className="block text-sm font-semibold mb-3"
        style={{ color: "var(--color-text-primary)" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-transparent border-0 outline-none rounded-xl text-sm font-medium"
        style={{
          background: "var(--color-secondary)",
          color: "var(--color-text-primary)",
          boxShadow: `
            inset -4px -4px 8px #FAFBFF,
            inset 4px 4px 8px var(--color-shadow)
          `,
        }}
      />
    </div>
  );
};

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  useScrollToTop();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const { isSubmitting, submitStatus, statusMessage, submitForm, resetStatus } = useContactForm();

  // Reset form when submission is successful
  useEffect(() => {
    if (submitStatus === 'success') {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  }, [submitStatus]);

  const handleGoBack = () => {
    navigate("/"); // Quay lại trang trước đó
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // Submit form using the service
    await submitForm(formData);

    // Auto hide status message after 5 seconds
    setTimeout(() => {
      resetStatus();
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subjects = [
    "Tư vấn dự án",
    "Hỗ trợ kỹ thuật",
    "Hợp tác kinh doanh",
    "Tuyển dụng",
    "Khiếu nại/Góp ý",
    "Khác",
  ];

  return (
    <Layout>
      <section className="py-[40px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleGoBack}
              className="neumorphic-button-secondary"
              style={{ 
              padding: "10px 20px",
              fontWeight: "500",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              letterSpacing: "0",
             }}
            >
              <FaArrowLeft />
              Quay lại
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-16">
            <Title
              title="Liên hệ với chúng tôi"
              desc="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin và chúng tôi sẽ phản hồi sớm nhất có thể."
            />
          </div>

          <div className="">

            {/* Contact Form */}
            <div className="">
              <div
                className="p-8 rounded-3xl"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                    -4px -4px 8px #FAFBFF,
                    4px 4px 8px var(--color-shadow)
                  `,
                }}
              >
                <h2
                  className="text-2xl font-bold mb-6 flex items-center gap-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <div className="text-text-accent">
                    <FaEnvelope />
                  </div>{" "}
                  Gửi tin nhắn cho chúng tôi
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      label="👤 Họ và tên"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                    <FormField
                      label="📧 Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        className="block text-sm font-semibold mb-3"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        🏷️ Chủ đề
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border-0 outline-none rounded-xl text-sm font-medium"
                        style={{
                          background: "var(--color-secondary)",
                          color: "var(--color-text-primary)",
                          boxShadow: `
                            inset -6px -6px 12px #FAFBFF,
                            inset 6px 6px 12px var(--color-shadow)
                          `,
                        }}
                      >
                        <option value="">Chọn chủ đề</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-3"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      💬 Tin nhắn
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      required
                      className="w-full px-4 py-3 bg-transparent border-0 outline-none rounded-xl text-sm font-medium resize-none"
                      style={{
                        background: "var(--color-secondary)",
                        color: "var(--color-text-primary)",
                        boxShadow: `
                          inset -6px -6px 12px #FAFBFF,
                          inset 6px 6px 12px var(--color-shadow)
                        `,
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`neumorphic-button cursor-pointer flex items-center gap-2
                        ${isSubmitting ? "animate-pulse" : ""}
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Đang gửi...
                        </>
                      ) : submitStatus === "success" ? (
                        <>✅ Đã gửi thành công!</>
                      ) : submitStatus === "error" ? (
                        <>❌ Có lỗi xảy ra</>
                      ) : (
                        <>
                          <BsRocketTakeoffFill /> Gửi tin nhắn
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status Message */}
                  {statusMessage && (
                    <div className="flex justify-center">
                      <div
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          submitStatus === "success"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {statusMessage}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
