import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Dashboard } from '../pages/Dashboard';
import { Categories } from '../pages/Categories/index';
import { Vendors } from '../pages/Vendors/index';
import { Budget } from '../pages/Budget';
import { Calendar } from '../pages/Calendar';
import { Gallery } from '../pages/Gallery';
import { Admin } from '../pages/Admin';
import { Login } from '../pages/Login';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: '/categories',
        element: <ProtectedRoute><Categories /></ProtectedRoute>,
      },
      {
        path: '/vendors',
        element: <ProtectedRoute><Vendors /></ProtectedRoute>,
      },
      {
        path: '/budget',
        element: <ProtectedRoute><Budget /></ProtectedRoute>,
      },
      {
        path: '/calendar',
        element: <ProtectedRoute><Calendar /></ProtectedRoute>,
      },
      {
        path: '/gallery',
        element: <ProtectedRoute><Gallery /></ProtectedRoute>,
      },
      {
        path: '/admin',
        element: <ProtectedRoute adminOnly><Admin /></ProtectedRoute>,
      },
    ],
  },
]);
