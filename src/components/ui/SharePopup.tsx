import React, { useState } from 'react';

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const SharePopup: React.FC<SharePopupProps> = ({
  isOpen,
  onClose,
  url,
  title,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Function to show notification
  const showNotify = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (!isOpen) return null;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: '📘',
      color: 'linear-gradient(135deg, #1877f2, #42a5f5)',
      action: () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'Messenger',
      icon: '💬',
      color: 'linear-gradient(135deg, #0084ff, #44bef7)',
      action: () => {
        // Copy link to clipboard và thông báo cho user
        navigator.clipboard.writeText(`${title}\n${url}`).then(() => {
          showNotify('💬 Link đã sao chép! Dán vào Messenger để chia sẻ');
        }).catch(() => {
          // Fallback nếu clipboard API không hoạt động
          prompt('Copy link này để gửi qua Messenger:', `${title}\n${url}`);
        });
      },
    },
    {
      name: 'Zalo',
      icon: '🔵',
      color: 'linear-gradient(135deg, #0068ff, #4285f4)',
      action: () => {
        // Copy link to clipboard và thông báo cho user
        navigator.clipboard.writeText(`${title}\n${url}`).then(() => {
          showNotify('🔵 Link đã sao chép! Dán vào Zalo để chia sẻ');
        }).catch(() => {
          // Fallback nếu clipboard API không hoạt động
          prompt('Copy link này để gửi qua Zalo:', `${title}\n${url}`);
        });
      },
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'linear-gradient(135deg, #1da1f2, #1976d2)',
      action: () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: 'linear-gradient(135deg, #0088cc, #29b6f6)',
      action: () => {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'WhatsApp',
      icon: '💚',
      color: 'linear-gradient(135deg, #25d366, #4caf50)',
      action: () => {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: 'linear-gradient(135deg, #0077b5, #1976d2)',
      action: () => {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'Copy Link',
      icon: '🔗',
      color: 'linear-gradient(135deg, #6b7280, #9ca3af)',
      action: () => {
        navigator.clipboard.writeText(url).then(() => {
          showNotify('🔗 Link bài viết đã được sao chép!');
        }).catch(() => {
          // Fallback nếu clipboard API không hoạt động
          prompt('Copy link này:', url);
        });
      },
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 flex items-start justify-center z-50 p-4 pt-16">
        <div
          className="bg-background rounded-2xl p-6 max-w-md w-full animate-popup-in relative"
          style={{
            boxShadow:
              '-15px -15px 30px #FAFBFF, 15px 15px 30px rgba(22, 17, 29, 0.15)',
          }}
        >
          {/* Success Notification - Inside Popup */}
          {showNotification && (
            <div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg transition-all duration-300 z-10"
              style={{
                background: "var(--color-background)",
                boxShadow: "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.2)",
                border: `1px solid var(--color-accent, #3b82f6)40`,
                animation: "popupSlideIn 0.3s ease-out",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--color-accent, #3b82f6)" }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {notificationMessage}
                </span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text-primary">Chia sẻ bài viết</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-gray-500 hover:text-accent transition-all duration-300 cursor-pointer"
              style={{
                boxShadow:
                  '-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)',
              }}
            >
              ✕
            </button>
          </div>

          {/* Share Options Grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {shareOptions.map((option, index) => (
              <button
                key={option.name}
                onClick={option.action}
                className="flex flex-col items-center p-3 rounded-xl bg-background transition-all duration-300 hover:scale-105 group cursor-pointer"
                style={{
                  boxShadow:
                    '-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.1)',
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: option.color,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {option.icon}
                </div>
                <span className="text-xs text-gray-600 text-center leading-tight">
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          {/* Share URL Display */}
          <div
            className="bg-background rounded-xl p-3 mb-4"
            style={{
              boxShadow:
                'inset -6px -6px 12px #FAFBFF, inset 6px 6px 12px rgba(22, 17, 29, 0.1)',
            }}
          >
            <p className="text-sm text-gray-600 mb-1">Link bài viết:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url).then(() => {
                    showNotify('📋 Link đã sao chép vào clipboard!');
                  }).catch(() => {
                    prompt('Copy link này:', url);
                  });
                }}
                className="text-accent hover:text-accent-dark transition-colors cursor-pointer"
              >
                📋
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-background text-gray-600 hover:text-accent transition-all duration-300 cursor-pointer"
            style={{
              boxShadow:
                '-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.1)',
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </>
  );
};

export default SharePopup;
