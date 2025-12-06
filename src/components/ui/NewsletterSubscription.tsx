import React, { useState } from 'react';
import Button from '../ui/Button';
import { MdError, MdCheckCircle } from 'react-icons/md';
import { ImSpinner2 } from 'react-icons/im';

interface NewsletterSubscriptionProps {
  className?: string;
  placeholder?: string;
  buttonText?: string | React.ReactNode;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  className = '',
  placeholder = 'Nhập email của bạn...',
  buttonText = 'Đăng ký',
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Reset states when user types
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Giả lập thời gian xử lý
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Thông báo giả lập cho user biết tính năng đang phát triển
      setSuccess(true);
      setMessage('Tính năng đăng ký newsletter đang được phát triển. Cảm ơn bạn đã quan tâm!');
      setEmail(''); // Reset email sau khi "thành công"
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`newsletter-subscription ${className}`}>
      <form onSubmit={handleSubmit} className={`
        ${className.includes('newsletter-compact') 
          ? 'flex gap-2' 
          : 'flex flex-col sm:flex-row gap-3'
        }
      `}>
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={placeholder}
            disabled={isLoading}
            className={`
              w-full rounded-xl border text-gray-900 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className.includes('newsletter-compact') 
                ? 'px-3 py-2 text-sm bg-transparent text-text-primary placeholder-text-secondary border-0 outline-none'
                : 'px-4 py-3 border-gray-300 bg-white'
              }
              ${error ? 'border-red-500 bg-red-50' : ''}
              ${success ? 'border-green-500 bg-green-50' : ''}
            `}
            style={className.includes('newsletter-compact') ? {
              background: "var(--color-secondary)",
              boxShadow: `
                inset -4px -4px 8px #FAFBFF,
                inset 4px 4px 8px var(--color-shadow)
              `
            } : {}}
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !email.trim()}
          className={`
            font-medium rounded-xl transition-all duration-300 transform hover:scale-105
            ${className.includes('newsletter-compact') 
              ? 'w-10 h-10 text-white'
              : 'px-6 py-3 min-w-[120px] text-white'
            }
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'text-white disabled:opacity-50'
            }
          `}
          style={className.includes('newsletter-compact') ? {
            background: "var(--color-accent)",
            boxShadow: `
              -4px -4px 8px #FAFBFF,
              4px 4px 8px var(--color-shadow)
            `,
            padding: '10px 12px',
          } : {
            backgroundColor: isLoading ? '#9CA3AF' : '#2563EB',
          }}
        >
          {isLoading ? (
            className.includes('newsletter-compact') ? (
              <ImSpinner2 className="w-4 h-4 animate-spin" />
            ) : (
              <div className="flex items-center justify-center">
                <ImSpinner2 className="w-4 h-4 animate-spin mr-2" />
                Đang gửi...
              </div>
            )
          ) : (
            buttonText
          )}
        </Button>
      </form>

      {/* Status Messages */}
      {(error || success) && (
        <div className="mt-3">
          {error && (
            <div className="flex items-center p-3 text-red-700 bg-red-100 rounded-lg">
              <MdError className="w-5 h-5 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center p-3 text-green-700 bg-green-100 rounded-lg">
              <MdCheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscription;
