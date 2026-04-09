import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod';
import type { SingInDto } from './SignIn';

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'At least 6 characters'),
});

interface Props {
  error: Error | null;
  reset: () => void;
  onSubmit: (data: SingInDto) => void;
}

export const SignInForm = ({ error, reset, onSubmit }: Props) => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/sign-up">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="singin-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="off"
                    onInput={reset}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="At least 6 characters"
                    autoComplete="off"
                    onInput={reset}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </form>
        <FieldError errors={[error]} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="singin-form">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};
