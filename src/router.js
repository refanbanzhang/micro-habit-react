import React, { Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';
import { Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';
import Auth from '@/shared/components/Auth';
const Index = React.lazy(() => import('@/pages/index'));
const Login = React.lazy(() => import('@/pages/login'));
const Register = React.lazy(() => import('@/pages/register'));
const Daily = React.lazy(() => import('@/pages/daily'));
const Insert = React.lazy(() => import('@/pages/insert'));

export default createHashRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Spin indicator={<IconLoading />} />}>
        <Auth>
          <Index />
        </Auth>
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Spin indicator={<IconLoading />} />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<Spin indicator={<IconLoading />} />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/daily',
    element: (
      <Suspense fallback={<Spin indicator={<IconLoading />} />}>
        <Auth>
          <Daily />
        </Auth>
      </Suspense>
    ),
  },
  {
    path: '/insert',
    element: (
      <Suspense fallback={<Spin indicator={<IconLoading />} />}>
        <Auth>
          <Insert />
        </Auth>
      </Suspense>
    ),
  },
]);
