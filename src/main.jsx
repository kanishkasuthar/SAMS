import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

window.addEventListener('error', (event) => {
  fetch('http://localhost:5173/__api__/log', { method: 'POST', body: JSON.stringify({ message: event.error?.message, stack: event.error?.stack }) }).catch(() => {});
});
window.addEventListener('unhandledrejection', (event) => {
  fetch('http://localhost:5173/__api__/log', { method: 'POST', body: JSON.stringify({ message: event.reason?.message, stack: event.reason?.stack }) }).catch(() => {});
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
