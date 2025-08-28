import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useRealtimeNews } from '../../hooks';

interface FirebaseItem {
  docId: string;
  id: string;
  title: string;
  timestamp: number;
  date: string;
  exists: boolean;
}

export const NewsDebug: React.FC = () => {
  const [firebaseCount, setFirebaseCount] = useState(0);
  const [firebaseItems, setFirebaseItems] = useState<FirebaseItem[]>([]);
  const [rawData, setRawData] = useState<unknown[]>([]);
  const { news: hookNews, loading, error } = useRealtimeNews();

  useEffect(() => {
    console.log('🔍 NewsDebug: Setting up debug listeners...');
    
    // Test 1: Query WITHOUT orderBy để lấy tất cả documents
    const allNewsQuery = query(collection(db, 'news'));
    
    // Test 2: Query WITH orderBy như hook
    const sortedNewsQuery = query(
      collection(db, 'news'),
      orderBy('timestamp', 'desc')
    );

    // Listener cho query không sort
    const unsubscribeAll = onSnapshot(allNewsQuery, (snapshot) => {
      console.log('🔍 ALL NEWS (no orderBy):', snapshot.docs.length, 'items');
      
      snapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        console.log(`� All[${index + 1}]:`, {
          id: doc.id,
          title: data.title?.substring(0, 20) + '...',
          hasTimestamp: !!data.timestamp,
          timestamp: data.timestamp,
          timestampType: typeof data.timestamp
        });
      });
    });

    // Listener cho query có sort (giống hook)
    const unsubscribeSorted = onSnapshot(sortedNewsQuery, (snapshot) => {
      console.log('🔍 SORTED NEWS (with orderBy):', snapshot.docs.length, 'items');
      setFirebaseCount(snapshot.docs.length);
      
      const items = snapshot.docs.map((doc, index) => {
        const data = doc.data();
        console.log(`📄 Sorted[${index + 1}]:`, {
          id: doc.id,
          title: data.title?.substring(0, 20) + '...',
          timestamp: data.timestamp
        });
        
        return {
          docId: doc.id,
          id: data.originalId || data.id || doc.id,
          title: data.title || 'No title',
          timestamp: data.timestamp || 0,
          date: data.date || '',
          exists: doc.exists()
        };
      });
      
      setFirebaseItems(items);
      setRawData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error('🔍 Sorted query error:', error);
    });

    return () => {
      console.log('🔍 NewsDebug: Cleaning up debug listeners');
      unsubscribeAll();
      unsubscribeSorted();
    };
  }, []);

  if (!window.location.search.includes('debug=true')) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      fontSize: '12px',
      maxWidth: '400px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#00ff00' }}>🔍 News Debug Panel</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>📊 Counts:</strong><br/>
        • Hook news: {hookNews.length}<br/>
        • Direct Firebase: {firebaseCount}<br/>
        • Loading: {loading ? 'Yes' : 'No'}<br/>
        • Error: {error || 'None'}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>📋 Hook Items (first 3):</strong><br/>
        {hookNews.slice(0, 3).map((item, i) => (
          <div key={i} style={{ fontSize: '10px', margin: '2px 0' }}>
            {i+1}. {item.id} - {item.title?.substring(0, 30)}...
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>🔥 Firebase Items (first 3):</strong><br/>
        {firebaseItems.slice(0, 3).map((item, i) => (
          <div key={i} style={{ fontSize: '10px', margin: '2px 0' }}>
            {i+1}. {item.id} - {item.title?.substring(0, 30)}...
          </div>
        ))}
      </div>

      <div>
        <strong>🗂️ All IDs:</strong><br/>
        <div style={{ fontSize: '10px' }}>
          Hook: [{hookNews.map(n => n.id).join(', ')}]<br/>
          Firebase: [{firebaseItems.map(n => n.id).join(', ')}]
        </div>
      </div>

      <button 
        onClick={() => {
          console.log('🔍 Full Raw Data:', rawData);
          console.log('🔍 Full Hook News:', hookNews);
        }}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          background: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Log Full Data
      </button>
    </div>
  );
};