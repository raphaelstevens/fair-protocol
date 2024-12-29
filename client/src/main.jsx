import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import PriceAnalysisDashboard from './components/PriceAnalysisDashboard';
import TestDashboard from './components/TestDashboard';


// Production debug helper
const isProd = import.meta.env.PROD;
const logMount = (msg) => isProd && console.log('[React Mount]:', msg);

// Function to mount a single component
function mountComponent(component, mountPoint) {
  logMount(`Mounting ${mountPoint.getAttribute('data-react-component')}`);
  const root = createRoot(mountPoint);
  root.render(
    <React.StrictMode>
      {component}
    </React.StrictMode>
  );
}

// Function to mount all components
function mountReactComponents() {
  const mountPoints = document.querySelectorAll('[data-react-component]');
  logMount(`Found ${mountPoints.length} component(s) to mount`);

  mountPoints.forEach(mountPoint => {
    const componentName = mountPoint.getAttribute('data-react-component');
    const propsString = mountPoint.getAttribute('data-props') || '{}';
    
    try {
      const props = JSON.parse(propsString);
      let component;
      
      switch (componentName) {
        case 'PriceAnalysisDashboard':
          component = <PriceAnalysisDashboard {...props} />;
          break;
        case 'TestDashboard':
          component = <TestDashboard {...props} />;
          break;
        default:
          console.warn(`Unknown component: ${componentName}`);
          return;
      }
      
      mountComponent(component, mountPoint);
    } catch (error) {
      console.error(`Failed to mount ${componentName}:`, error);
    }
  });
}

// Mount components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountReactComponents);
} else {
  mountReactComponents();
}

// Handle hot module replacement in development
if (import.meta.hot) {
  import.meta.hot.accept();
}