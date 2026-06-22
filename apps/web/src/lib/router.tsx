import { Layout } from '@/components/Layout';
import { RequireAuth, RequireNotAuth } from '@/components/Routes';
import {
  ArticleCreate,
  ArticleDetail,
  ArticleEdit,
  ArticlesList,
  Main,
  Profile,
  SignIn,
  SignUp,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/sign-up',
    element: (
      <RequireNotAuth>
        <SignUp />
      </RequireNotAuth>
    ),
  },
  {
    path: '/sign-in',
    element: (
      <RequireNotAuth>
        <SignIn />
      </RequireNotAuth>
    ),
  },
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/articles',
        element: <ArticlesList />,
      },
      {
        path: '/articles/create',
        element: <ArticleCreate />,
      },
      {
        path: '/articles/:id',
        element: <ArticleDetail />,
      },
      {
        path: '/articles/:id/edit',
        element: <ArticleEdit />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);
