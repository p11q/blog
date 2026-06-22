import { fetchWithZod } from '@/lib/fetchWithZod';
import { useAuth } from '@/providers';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { SignUpForm } from './SignUpForm';

export interface SignUpDto {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
}

export const SignUp = (): React.JSX.Element => {
  const { onLogin } = useAuth();

  const { error, mutate, reset } = useMutation({
    mutationFn: (data: SignUpDto) =>
      fetchWithZod(
        z.object({
          accessToken: z.jwt(),
          refreshToken: z.string(),
        }),
        {
          data,
          method: 'POST',
          url: 'auth/sign-up',
        },
      ),

    onSuccess: (data) => {
      onLogin(data);
    },
  });

  const onSubmit = (data: SignUpDto): void => {
    mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignUpForm error={error} reset={reset} onSubmit={onSubmit} />
    </div>
  );
};
