import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1, 'Обязательное поле'),
  text: z.string().min(1, 'Обязательное поле'),
  tags: z.string().min(1, 'Обязательное поле'),
});

export type ArticleFormValues = z.infer<typeof formSchema>;

interface Props {
  submitLabel: string;
  defaultValues?: ArticleFormValues;
  isPending?: boolean;
  error?: Error | null;
  onSubmit: (values: ArticleFormValues) => void;
}

export const ArticleForm = ({
  submitLabel,
  defaultValues,
  isPending,
  error,
  onSubmit,
}: Props) => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      text: '',
      tags: '',
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title">Заголовок</FieldLabel>
            <Input
              {...field}
              id="title"
              aria-invalid={fieldState.invalid}
              placeholder="Заголовок статьи"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">Краткое описание</FieldLabel>
            <Textarea
              {...field}
              id="description"
              aria-invalid={fieldState.invalid}
              placeholder="Короткое описание для списка статей"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="text"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="text">Содержание</FieldLabel>
            <Textarea
              {...field}
              id="text"
              aria-invalid={fieldState.invalid}
              placeholder="Полный текст статьи"
              className="min-h-48"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="tags"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="tags">Теги</FieldLabel>
            <Input
              {...field}
              id="tags"
              aria-invalid={fieldState.invalid}
              placeholder="#life#style"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {error && <FieldError errors={[error]} />}

      <Button type="submit" disabled={isPending}>
        {submitLabel}
      </Button>
    </form>
  );
};
