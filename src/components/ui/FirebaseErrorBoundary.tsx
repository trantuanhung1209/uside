import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class FirebaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Firebase Error Boundary caught an error:', error, errorInfo);
    
    // Log specific Firebase errors
    if (error.message.includes('Firebase') || error.message.includes('auth') || error.message.includes('firestore')) {
      console.error('🔥 Firebase specific error detected:', {
        message: error.message,
        stack: error.stack,
        errorInfo
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">🚨</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Firebase Connection Error
              </h2>
              <p className="text-gray-600 mb-4">
                Có lỗi xảy ra khi kết nối với Firebase. Vui lòng thử lại.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>• Kiểm tra kết nối internet</p>
                <p>• Refresh trang hoặc clear cache</p>
                <p>• Thử lại sau vài phút</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tải lại trang
              </button>
              
              {/* Error details for development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-red-600 font-medium">
                    Chi tiết lỗi (Development)
                  </summary>
                  <pre className="mt-2 text-xs bg-red-50 p-3 rounded overflow-auto">
                    {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FirebaseErrorBoundary;
