import { Layout } from "../components/layout";
import { BannerBreadcrumb, Title } from "../components";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { BsRocketTakeoffFill } from "react-icons/bs";

// Contact Card Component
interface ContactCardProps {
  info: {
    icon: React.ReactNode | string;
    title: string;
    content: string;
  };
  index: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ info, index }) => {
  return (
    <div
      className="p-6 rounded-2xl transition-all duration-500 transform"
      style={{
        background: "var(--color-background)",
        boxShadow: `
          -4px -4px 8px #FAFBFF,
          4px 4px 8px var(--color-shadow)
        `,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl section-neumorphic text-accent"
        >
          {info.icon}
        </div>
        <div className="flex-1">
          <h3
            className="font-bold text-lg mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            {info.title}
          </h3>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {info.content}
          </p>
        </div>
      </div>
    </div>
  );
};

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
          background: "var(--color-background)",
          color: "var(--color-text-primary)",
          boxShadow: `
            inset -6px -6px 12px #FAFBFF,
            inset 6px 6px 12px var(--color-shadow)
          `,
        }}
      />
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
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

  const contactInfo = [
    {
      icon: <FaLocationDot />,
      title: "Địa chỉ",
      content: "123 Đường Công Nghệ, Quận 7, TP. Hồ Chí Minh",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "hello@uside.vn",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Điện thoại",
      content: "+84 (028) 123 4567",
    },
    {
      icon: <FaClock />,
      title: "Giờ làm việc",
      content: "T2 - T6: 8:00 - 18:00\nT7: 8:00 - 12:00",
    },
  ];

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
      <BannerBreadcrumb
        pageName="Liên hệ"
        image="/images_uside/banner_contact.png"
      />

      <section className="py-[40px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <Title
              title="Liên hệ với chúng tôi"
              desc="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin và chúng tôi sẽ phản hồi sớm nhất có thể."
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-[30px]">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <ContactCard key={index} info={info} index={index} />
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      label="📞 Số điện thoại"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+84 123 456 789"
                    />
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
                          background: "var(--color-background)",
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
                        background: "var(--color-background)",
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
