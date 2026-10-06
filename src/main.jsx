import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { APIProvider } from '@vis.gl/react-google-maps';
import './index.css';
import App from './App.jsx';
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
      >
        <App />
      </APIProvider>
    </Provider>
  </StrictMode>,
);