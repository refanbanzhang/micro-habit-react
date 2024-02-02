import { createHashRouter } from 'react-router-dom';
import Auth from '@/shared/components/Auth';
import Index from '@/pages/index';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Daily from '@/pages/daily';

export default createHashRouter([
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