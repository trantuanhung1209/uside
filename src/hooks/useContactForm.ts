import { useState } from 'react';
import { emailService, type ContactFormData } from '../services';

interface UseContactFormReturn {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  statusMessage: string;
  submitForm: (formData: ContactFormData) => Promise<void>;
  resetStatus: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const result = await emailService.sendContactMessage(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message);
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    setSubmitStatus('idle');
    setStatusMessage('');
  };

  return {
    isSubmitting,
    submitStatus,
    statusMessage,
    submitForm,
    resetStatus,
  };
};
