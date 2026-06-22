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

export const ArticleCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (values: ArticleFormValues) => apiCreateArticle(values),
    onSuccess: (article) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      navigate(`/articles/${article.id}`);
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
          submitLabel="Создать"
          isPending={isPending}
          error={error}
          onSubmit={mutate}
        />
      </CardContent>
    </Card>
  );
};
