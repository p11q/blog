import { fetchWithZod } from '@/lib/fetchWithZod';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { AuthForm } from './AuthForm';

export interface LoginDto {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export const Auth = () => {
  const mutation = useMutation({
    mutationFn: (data: LoginDto) =>
      fetchWithZod(
        z.object({
          accessToken: z.jwt(),
          refreshToken: z.jwt(),
        }),
        {
          method: 'POST',
          url: 'auth/sign-up',
          data,
        },
      ),
  });

  const onSubmit = (data: LoginDto) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};
