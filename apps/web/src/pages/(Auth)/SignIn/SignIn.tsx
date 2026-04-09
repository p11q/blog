import { fetchWithZod } from '@/lib/fetchWithZod';
import { useAuth } from '@/providers';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { SignInForm } from './SignInForm';

export interface SingInDto {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { onLogin } = useAuth();

  const { mutate, error, reset } = useMutation({
    mutationFn: (data: SingInDto) =>
      fetchWithZod(
        z.object({
          accessToken: z.string(),
          refreshToken: z.string(),
        }),
        {
          method: 'POST',
          url: 'auth/sign-in',
          data,
        },
      ),
    onSuccess: (data) => onLogin(data),
  });

  const onSubmit = (data: SingInDto) => {
    mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignInForm onSubmit={onSubmit} error={error} reset={reset} />
    </div>
  );
};
