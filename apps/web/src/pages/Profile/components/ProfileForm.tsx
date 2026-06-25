import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.email('Некорректный email'),
  name: z.string().min(1, 'Обязательное поле'),
});

export type ProfileFormValues = z.infer<typeof formSchema>;

interface Props {
  defaultValues: ProfileFormValues;
  error?: Error | null;
  isPending?: boolean;
  onSubmit: (values: ProfileFormValues) => void;
  submitLabel: string;
}

export const ProfileForm = ({
  defaultValues,
  error,
  isPending,
  onSubmit,
  submitLabel,
}: Props): React.JSX.Element => {
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Имя</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="name"
              placeholder="Ваше имя"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="email"
              placeholder="you@example.com"
              type="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {error && <FieldError errors={[error]} />}

      <Button disabled={!!isPending || !form.formState.isDirty} type="submit">
        {submitLabel}
      </Button>
    </form>
  );
};
