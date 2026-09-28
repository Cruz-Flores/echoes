import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { SessionPage } from './pages/Session/SessionPage';
import { SongsPage } from './pages/Songs/SongsPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <SessionPage />,
      },
      {
        path: '/session',
        element: <SessionPage />,
      },
      {
        path: '/songs',
        element: <SongsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
