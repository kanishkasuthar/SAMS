import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

// Mock matchMedia for Recharts
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {}
  };
};

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import App from './src/App.jsx';

try {
  const html = renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>
  );
  console.log("App rendered successfully for /");
} catch (e) {
  console.error("Error rendering App for /:", e);
}

const routes = ['/studio', '/sync', '/projects', '/insights', '/audit', '/people', '/departments', '/analytics', '/settings', '/history', '/decision-flow', '/matrix', '/roles', '/users', '/sessions', '/notifications', '/reports'];

for (const route of routes) {
  try {
    const html = renderToString(
      <StaticRouter location={route}>
        <App />
      </StaticRouter>
    );
    console.log(`App rendered successfully for ${route}`);
  } catch (e) {
    console.error(`Error rendering App for ${route}:`, e);
  }
}
