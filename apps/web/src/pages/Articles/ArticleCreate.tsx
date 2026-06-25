import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiCreateArticle, type ArticleDTO } from './api/apiCreateArticle';
import { articlesQueryFactory } from './api/queryFactory';
import { ArticleForm } from './components/ArticleForm';

export const ArticleCreate = (): React.JSX.Element => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { error, isPending, mutate } = useMutation({
    mutationFn: (values: ArticleDTO) => apiCreateArticle(values),
    onSuccess: ({ id }) => {
      void queryClient.invalidateQueries({
        queryKey: articlesQueryFactory.listOptions().queryKey,
      });

      return navigate(`/articles/${id}`);
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
