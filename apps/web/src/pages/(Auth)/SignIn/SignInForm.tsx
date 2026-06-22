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
  onSubmit: (data: SingInDto) => void;
  reset: () => void;
}

export const SignInForm = ({
  error,
  onSubmit,
  reset,
}: Props): React.JSX.Element => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="singin-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="email"
                    placeholder="m@example.com"
                    type="email"
                    onInput={reset}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="password"
                    placeholder="At least 6 characters"
                    type="password"
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
        <FieldError errors={error ? [error] : []} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="singin-form" type="submit">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};
