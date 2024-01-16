import { createBrowserRouter } from 'react-router-dom';

import Index from '@/pages/index';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Daily from '@/pages/daily';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
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
    element: <Daily />,
  },
]);

export default router;
