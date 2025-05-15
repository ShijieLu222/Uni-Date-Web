import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';

function App() {
  const router = [
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path:'/home',
      element:<Home />,
    }
  ];

  return (
    <RouterProvider router={createBrowserRouter(router)} />
  );
}

export default App;
