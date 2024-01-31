import { createBrowserRouter } from 'react-router-dom';

import Index from '@/pages/index';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Daily from '@/pages/daily';
import Auth from '@/shared/components/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth><Index /></Auth>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/daily',
    element: <Auth><Daily /></Auth>,
  },
]);

export default router;
