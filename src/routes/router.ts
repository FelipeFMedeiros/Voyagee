import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Home),
  },
]);

export default router;