import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiCreateArticle } from './api/apiCreateArticle';
import { ArticleForm, type ArticleFormValues } from './components/ArticleForm';

export const ArticleCreate = (): React.JSX.Element => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (values: ArticleFormValues) => apiCreateArticle(values),
    onSuccess: (article) => {
      void queryClient.invalidateQueries({ queryKey: ['articles'] });
      void navigate(`/articles/${article.id}`);
    },
  });

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Новая статья</CardTitle>
        <CardDescription>Заполните поля и опубликуйте статью</CardDescription>
      </CardHeader>
      <CardContent>
        <ArticleForm
          error={error}
          isPending={isPending}
          submitLabel="Создать"
          onSubmit={mutate}
        />
      </CardContent>
    </Card>
  );
};
