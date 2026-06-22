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
    element: (
      <RequireNotAuth>
        <SignUp />
      </RequireNotAuth>
    ),
    path: '/sign-up',
  },
  {
    element: (
      <RequireNotAuth>
        <SignIn />
      </RequireNotAuth>
    ),
    path: '/sign-in',
  },
  {
    children: [
      {
        element: <Main />,
        path: '/',
      },
      {
        element: <ArticlesList />,
        path: '/articles',
      },
      {
        element: <ArticleCreate />,
        path: '/articles/create',
      },
      {
        element: <ArticleDetail />,
        path: '/articles/:id',
      },
      {
        element: <ArticleEdit />,
        path: '/articles/:id/edit',
      },
      {
        element: <Profile />,
        path: '/profile',
      },
    ],
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
  },
]);
