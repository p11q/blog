import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import type { UpdateProfileDTO } from '../api';

const formSchema = z.object({
  email: z.email('Некорректный email'),
  name: z.string().min(1, 'Обязательное поле'),
});

interface Props {
  defaultValues: UpdateProfileDTO;
  error?: Error | null;
  isPending?: boolean;
  onSubmit: (values: UpdateProfileDTO) => void;
}

export const ProfileForm = ({
  defaultValues,
  error,
  isPending,
  onSubmit,
}: Props): React.JSX.Element => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    values: defaultValues,
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

      <Button
        disabled={
          !!isPending || !form.formState.isDirty || !form.formState.isValid
        }
        type="submit"
      >
        Сохранить
      </Button>
    </form>
  );
};
