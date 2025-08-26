import React, { useState } from 'react';
import Button from '../ui/Button';

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
              ? 'w-10 h-10 text-white min-w-0 p-0'
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
            `
          } : {
            backgroundColor: isLoading ? '#9CA3AF' : '#2563EB',
          }}
        >
          {isLoading ? (
            className.includes('newsletter-compact') ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center p-3 text-green-700 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscription;
