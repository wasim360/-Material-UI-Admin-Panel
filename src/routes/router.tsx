import SignIn from 'components/Login/login';
import CurrentLayout from 'layout/Layout';
import PublicLayout from 'layout/PublicLayout';

import Dashboard from 'Modules/Dahsboards';
import { Navigate, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <CurrentLayout />,
    children: [
      {
        path: 'overview',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />,
          },
          {
            path: '404',
            element: <div>404</div>,
          },
          {
            path: '500',
            element: <div>500</div>,
          },
          {
            path: 'maintenance',
            element: <div>main</div>,
          },
          {
            path: 'coming-soon',
            element: <div>element</div>,
          },
        ],
      },
    ],
  },
  {
    path: 'app',
    element: <CurrentLayout />,
    children: [
      {
        path: 'dashboard/default',
        element: <Dashboard />,
      },
      {
        path: 'crypto',
        element: <div>wasssssssss</div>,
      },
      {
        path: 'wasim',
        element: <div>wass</div>,
      },
    ],
  },
  {
    path: 'auth',
    element: <PublicLayout />,
    children: [
      { path: 'login', element: <SignIn /> },
      {
        path: 'login/abc',
        element: <div>This is Login</div>,
      },
    ],
  },
];

export default routes;
