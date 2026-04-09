import { SignIn, SignUp } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);
