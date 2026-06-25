import { Button } from '@/components/ui/button';
import { queryFactory as profileQueryFactory } from '@/pages/Profile/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiDeleteArticle } from './api/apiDeleteArticle';
import { articlesQueryFactory } from './api/queryFactory';
import { ArticleCard } from './components/ArticleCard';

export const ArticlesList = (): React.JSX.Element => {
  const queryClient = useQueryClient();
  const {
    data: articles,
    error,
    isLoading,
  } = useQuery(articlesQueryFactory.listOptions());
  const { data: profile } = useQuery(profileQueryFactory.profileOptions());

  const deleteMutation = useMutation({
    mutationFn: (articleId: number) => apiDeleteArticle(articleId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: articlesQueryFactory.listOptions().queryKey,
      }),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Статьи</h1>
        <Button asChild>
          <Link to="/articles/create">Создать статью</Link>
        </Button>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Загрузка статей...</p>
      )}

      {error && (
        <p className="text-sm text-destructive">
          Не удалось загрузить статьи: {error.message}
        </p>
      )}

      {!isLoading && articles?.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Статей пока нет. Создайте первую!
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            canDelete={!!profile && article.author?.id === profile.id}
            isDeleting={
              deleteMutation.isPending &&
              deleteMutation.variables === article.id
            }
            onDelete={() => {
              deleteMutation.mutate(article.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};
