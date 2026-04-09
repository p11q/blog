import { fetchWithZod } from '@/lib/fetchWithZod';
import { useAuth } from '@/providers';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { SignUpForm } from './SignUpForm';

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export const SignUp = () => {
  const { onLogin } = useAuth();

  const { mutate, error, reset } = useMutation({
    mutationFn: (data: SignUpDto) =>
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

    onSuccess: (data) => onLogin(data),
  });

  const onSubmit = (data: SignUpDto) => {
    mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignUpForm onSubmit={onSubmit} error={error} reset={reset} />
    </div>
  );
};
