import React from 'react';

interface SkeletonLoaderProps {
  type?: 'hero' | 'section' | 'news' | 'about' | 'faq';
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'section', 
  className = '' 
}) => {
  const getSkeletonByType = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="min-h-screen animate-pulse">
            <div className="container mx-auto px-4 py-16">
              <div className="h-16 bg-gray-200 rounded-lg mb-8 w-3/4 mx-auto"></div>
              <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
              <div className="flex justify-center gap-4">
                <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
                <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        );
      
      case 'news':
        return (
          <div className="py-16 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border rounded-lg p-4">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="py-16 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        );
      
      case 'faq':
        return (
          <div className="py-16 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="space-y-4 max-w-2xl mx-auto">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border rounded-lg p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="py-16 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`bg-background ${className}`}>
      {getSkeletonByType()}
    </div>
  );
};

export default SkeletonLoader;
