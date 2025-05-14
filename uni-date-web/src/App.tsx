import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';import Login from './pages/LoginPage'; // 正确

function App() {
  const router = [
    {
      path: '/login',
      element: <Login />,
    },
  ];

  return (
    <RouterProvider router={createBrowserRouter(router)} />
  );
}

export default App;
