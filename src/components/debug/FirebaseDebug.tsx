import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface DebugInfo {
  authStatus: string;
  firestoreStatus: string;
  configStatus: string;
  error: Error | null;
}

const FirebaseDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    authStatus: 'checking...',
    firestoreStatus: 'checking...',
    configStatus: 'checking...',
    error: null
  });

  useEffect(() => {
    // Test Firebase config
    const testFirebaseConfig = () => {
      try {
        console.log('Firebase config:', {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing',
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Missing',
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Missing',
          appId: import.meta.env.VITE_FIREBASE_APP_ID ? 'Set' : 'Missing',
        });

        setDebugInfo(prev => ({
          ...prev,
          configStatus: 'Config loaded successfully'
        }));
      } catch (error) {
        console.error('Config error:', error);
        setDebugInfo(prev => ({
          ...prev,
          configStatus: `Config error: ${error}`,
          error: error instanceof Error ? error : new Error(String(error))
        }));
      }
    };

    // Test Auth
    const testAuth = () => {
      try {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setDebugInfo(prev => ({
            ...prev,
            authStatus: user ? `Authenticated: ${user.email}` : 'Not authenticated'
          }));
        }, (error) => {
          console.error('Auth error:', error);
          setDebugInfo(prev => ({
            ...prev,
            authStatus: `Auth error: ${error.message}`,
            error: error
          }));
        });

        return unsubscribe;
      } catch (error) {
        console.error('Auth setup error:', error);
        setDebugInfo(prev => ({
          ...prev,
          authStatus: `Auth setup error: ${error}`,
          error: error instanceof Error ? error : new Error(String(error))
        }));
      }
    };

    // Test Firestore
    const testFirestore = async () => {
      try {
        // Try to get a simple collection
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        
        setDebugInfo(prev => ({
          ...prev,
          firestoreStatus: 'Firestore connection successful'
        }));
      } catch (error) {
        console.error('Firestore error:', error);
        setDebugInfo(prev => ({
          ...prev,
          firestoreStatus: `Firestore error: ${error instanceof Error ? error.message : String(error)}`,
          error: error instanceof Error ? error : new Error(String(error))
        }));
      }
    };

    testFirebaseConfig();
    const unsubscribe = testAuth();
    testFirestore();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🔧 Firebase Debug Information</h1>
      
      <div className="space-y-4">
        {/* Config Status */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">📋 Configuration Status</h3>
          <p className={`${debugInfo.configStatus.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
            {debugInfo.configStatus}
          </p>
        </div>

        {/* Auth Status */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">🔐 Authentication Status</h3>
          <p className={`${debugInfo.authStatus.includes('error') ? 'text-red-600' : 'text-blue-600'}`}>
            {debugInfo.authStatus}
          </p>
        </div>

        {/* Firestore Status */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">🗄️ Firestore Status</h3>
          <p className={`${debugInfo.firestoreStatus.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
            {debugInfo.firestoreStatus}
          </p>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">🌍 Environment Variables</h3>
          <div className="space-y-1 text-sm">
            <p>VITE_FIREBASE_API_KEY: {import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</p>
            <p>VITE_FIREBASE_AUTH_DOMAIN: {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</p>
            <p>VITE_FIREBASE_PROJECT_ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</p>
            <p>VITE_FIREBASE_STORAGE_BUCKET: {import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing'}</p>
            <p>VITE_FIREBASE_MESSAGING_SENDER_ID: {import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing'}</p>
            <p>VITE_FIREBASE_APP_ID: {import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'}</p>
          </div>
        </div>

        {/* Error Details */}
        {debugInfo.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-red-800">❌ Error Details</h3>
            <pre className="text-sm text-red-700 whitespace-pre-wrap">
              {JSON.stringify(debugInfo.error, null, 2)}
            </pre>
          </div>
        )}

        {/* Troubleshooting */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-yellow-800">💡 Troubleshooting Tips</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Check if Firebase project exists and is active</li>
            <li>• Verify API key is correct and not expired</li>
            <li>• Ensure Authentication is enabled in Firebase Console</li>
            <li>• Check Firestore database is created and accessible</li>
            <li>• Verify domain is added to authorized domains</li>
            <li>• Check billing account if using paid Firebase features</li>
            <li>• Try clearing browser cache and cookies</li>
            <li>• Test in incognito/private window</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">🚀 Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Reload Page
            </button>
            <button 
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => registration.unregister());
                  });
                }
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              🧹 Clear Cache & Reload
            </button>
            <a 
              href="/dashboard"
              className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              📊 Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDebug;
