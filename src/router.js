import React, { Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';
import Auth from '@/shared/components/Auth';
import FallbackLoading from './shared/components/FallbackLoading';

const Index = React.lazy(() => import('@/pages/index'));
const Login = React.lazy(() => import('@/pages/login'));
const Register = React.lazy(() => import('@/pages/register'));
const Daily = React.lazy(() => import('@/pages/daily'));
const Insert = React.lazy(() => import('@/pages/insert'));

export default createHashRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<FallbackLoading />}>
        <Auth>
          <Index />
        </Auth>
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<FallbackLoading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<FallbackLoading />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/daily',
    element: (
      <Suspense fallback={<FallbackLoading />}>
        <Auth>
          <Daily />
        </Auth>
      </Suspense>
    ),
  },
  {
    path: '/insert',
    element: (
      <Suspense fallback={<FallbackLoading />}>
        <Auth>
          <Insert />
        </Auth>
      </Suspense>
    ),
  },
]);
