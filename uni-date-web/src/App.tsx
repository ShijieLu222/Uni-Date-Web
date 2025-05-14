import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';

function App() {
  const router = [
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
