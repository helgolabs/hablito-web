import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App'; // Import your App component
import './index.css';
import './styles/fonts.css'
import reportWebVitals from './reportWebVitals';
import { handleUserIdCookies } from './cookies/handleUserIdCookies';

const root = createRoot(document.getElementById('root'));

// Use an async function to wait for asynchronous operations
const initializeApp = async () => {
  // Wait for handleUserIdCookies to complete
  const userId = await handleUserIdCookies();

  // Use root.render to render your app
  root.render(
    <React.StrictMode>
      <App userId={userId} />
      <Analytics />
    </React.StrictMode>,
  );

  reportWebVitals();
};

// Call the async function to initialize the app
initializeApp();
