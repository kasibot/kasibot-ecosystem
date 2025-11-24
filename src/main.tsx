import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const rootElement = document.getElementById('root');

console.log('🚀 main.tsx: Starting app initialization');
console.log('🔑 Clerk key exists?', !!clerkPubKey);
console.log('📦 Root element exists?', !!rootElement);

if (rootElement) {
  if (!clerkPubKey || clerkPubKey === 'pk_test_your_key_here') {
      rootElement.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-center; background: #f3f4f6; font-family: system-ui, -apple-system, sans-serif;">
          <div style="max-width: 500px; background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="font-size: 1.5rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">
              Configuration Required
            </h1>
            <p style="color: #6b7280; margin-bottom: 1.5rem; line-height: 1.5;">
              The Clerk Publishable Key is missing or not configured. Please create a <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">.env</code> file in the root directory with:
            </p>
            <pre style="background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.25rem; overflow-x: auto; font-size: 0.875rem; margin-bottom: 1.5rem;"><code>VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here</code></pre>
            <p style="color: #6b7280; font-size: 0.875rem;">
              Get your key from <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">Clerk Dashboard</a>
            </p>
          </div>
        </div>
      `;
  } else {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ClerkProvider publishableKey={clerkPubKey}>
          <App />
        </ClerkProvider>
      </React.StrictMode>,
    );
  }
} else {
  console.error('❌ Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-size: 20px;">Error: Root element (#root) not found in HTML!</div>';
}
