import { fetchWithZod } from '@/lib/fetchWithZod';
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
  const mutation = useMutation({
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
  });

  const onSubmit = (data: SignUpDto) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
};
