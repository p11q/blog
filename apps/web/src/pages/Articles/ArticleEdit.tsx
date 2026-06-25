import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { queryFactory as profileQueryFactory } from '@/pages/Profile/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { apiUpdateArticle } from './api/apiUpdateArticle';
import { articlesQueryFactory } from './api/queryFactory';
import { ArticleForm, type ArticleFormValues } from './components/ArticleForm';

export const ArticleEdit = (): React.JSX.Element => {
  const { id } = useParams();
  const articleId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: article, isLoading } = useQuery(
    articlesQueryFactory.detailOptions(articleId),
  );
  const { data: profile } = useQuery(profileQueryFactory.profileOptions());

  const { error, isPending, mutate } = useMutation({
    mutationFn: (values: ArticleFormValues) =>
      apiUpdateArticle(articleId, values),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: articlesQueryFactory.listOptions().queryKey,
      });

      return navigate(`/articles/${articleId}`);
    },
  });

  if (isLoading || !article || !profile) {
    return <p className="text-sm text-muted-foreground">Загрузка...</p>;
  }

  if (article.author?.id !== profile.id) {
    return <Navigate to={`/articles/${articleId}`} replace />;
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Редактирование статьи</CardTitle>
        <CardDescription>Измените поля и сохраните статью</CardDescription>
      </CardHeader>
      <CardContent>
        <ArticleForm
          defaultValues={{
            description: article.description ?? '',
            tags: article.tags ?? '',
            text: article.text,
            title: article.title,
          }}
          error={error}
          isPending={isPending}
          submitLabel="Сохранить"
          onSubmit={mutate}
        />
      </CardContent>
    </Card>
  );
};
