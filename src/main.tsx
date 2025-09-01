import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/robot-loading.css'
import App from './App.tsx'
import { webVitalsOptimizer } from './utils/lcpOptimizer'

// Initialize Web Vitals monitoring and optimizations
webVitalsOptimizer.measureWebVitals();
webVitalsOptimizer.preventLayoutShift();
webVitalsOptimizer.optimizeFID();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
