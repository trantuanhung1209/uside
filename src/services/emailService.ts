import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

class EmailService {
  private readonly serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_uside_contact';
  private readonly templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uside_contact';
  private readonly publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  constructor() {
    // Initialize EmailJS với public key nếu có
    if (this.publicKey && this.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      emailjs.init(this.publicKey);
    }
  }

  async sendContactMessage(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Kiểm tra xem EmailJS đã được cấu hình chưa
      if (!this.publicKey || this.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
        console.warn('EmailJS chưa được cấu hình. Sử dụng fallback method.');
        return await this.sendContactMessageToBackend(formData);
      }

      // Prepare template parameters
      const templateParams = {
        to_email: 'usider.tech@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      // Send email
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Tin nhắn đã được gửi thành công!'
        };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Fallback to backend method
      return await this.sendContactMessageToBackend(formData);
    }
  }

  // Alternative method using Fetch API to send to your backend
  async sendContactMessageToBackend(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
      
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'usider.tech@gmail.com'
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Tin nhắn đã được gửi thành công!'
        };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email to backend:', error);
      
      return {
        success: false,
        message: 'Chức năng gửi email đang được phát triển. Vui lòng liên hệ trực tiếp qua usider.tech@gmail.com'
      };
    }
  }
}

export const emailService = new EmailService();
