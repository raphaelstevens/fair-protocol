import React from 'react';
import ReactDOM from 'react-dom/client';
import PriceAnalysisDashboard from './components/PriceAnalysisDashboard';

// Map of available components
const components = {
  PriceAnalysisDashboard,
};

// Mount all React components
document.addEventListener('DOMContentLoaded', () => {
  const mountPoints = document.querySelectorAll('[data-react-component]');
  
  mountPoints.forEach((mount) => {
    const componentName = mount.dataset.reactComponent;
    const props = JSON.parse(mount.dataset.props || '{}');
    const Component = components[componentName];

    if (Component) {
      ReactDOM.createRoot(mount).render(
        <React.StrictMode>
          <Component {...props} />
        </React.StrictMode>
      );
    }
  });
});