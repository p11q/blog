import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  description: z.string().min(1, 'Обязательное поле'),
  tags: z.string().min(1, 'Обязательное поле'),
  text: z.string().min(1, 'Обязательное поле'),
  title: z.string().min(1, 'Обязательное поле'),
});

export type ArticleFormValues = z.infer<typeof formSchema>;

interface Props {
  defaultValues?: ArticleFormValues;
  error?: Error | null;
  isPending?: boolean;
  onSubmit: (values: ArticleFormValues) => void;
  submitLabel: string;
}

export const ArticleForm = ({
  defaultValues,
  error,
  isPending,
  onSubmit,
  submitLabel,
}: Props): React.JSX.Element => {
  const form = useForm({
    defaultValues: defaultValues ?? {
      description: '',
      tags: '',
      text: '',
      title: '',
    },
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
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title">Заголовок</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="title"
              placeholder="Заголовок статьи"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">Краткое описание</FieldLabel>
            <Textarea
              {...field}
              aria-invalid={fieldState.invalid}
              id="description"
              placeholder="Короткое описание для списка статей"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="text"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="text">Содержание</FieldLabel>
            <Textarea
              {...field}
              className="min-h-48"
              aria-invalid={fieldState.invalid}
              id="text"
              placeholder="Полный текст статьи"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="tags"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="tags">Теги</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="tags"
              placeholder="#life#style"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {error && <FieldError errors={[error]} />}

      <Button disabled={isPending} type="submit">
        {submitLabel}
      </Button>
    </form>
  );
};
