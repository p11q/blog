import { fetchWithZod } from '@/lib/fetchWithZod';
import { useAuth } from '@/providers';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { SignInForm } from './SignInForm';

export interface SingInDto {
  email: string;
  password: string;
}

export const SignIn = (): React.JSX.Element => {
  const { onLogin } = useAuth();

  const { error, mutate, reset } = useMutation({
    mutationFn: (data: SingInDto) =>
      fetchWithZod(
        z.object({
          accessToken: z.string(),
          refreshToken: z.string(),
        }),
        {
          data,
          method: 'POST',
          url: 'auth/sign-in',
        },
      ),
    onSuccess: (data) => {
      onLogin(data);
    },
  });

  const onSubmit = (data: SingInDto): void => {
    mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignInForm error={error} reset={reset} onSubmit={onSubmit} />
    </div>
  );
};
