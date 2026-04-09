import { RequireAuth, RequireNotAuth } from '@/components/Routes';
import { Main, SignIn, SignUp } from '@/pages';
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
    path: '/',
    element: (
      <RequireAuth>
        <Main />
      </RequireAuth>
    ),
  },
]);
