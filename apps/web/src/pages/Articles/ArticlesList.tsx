import { Button } from '@/components/ui/button';
import { queryFactory as profileQueryFactory } from '@/pages/Profile/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiDeleteArticle } from './api/apiDeleteArticle';
import { articlesQueryFactory } from './api/queryFactory';
import { ArticleCard } from './components/ArticleCard';

export const ArticlesList = (): React.JSX.Element => {
  const queryClient = useQueryClient();
  const articles = useQuery(articlesQueryFactory.listOptions());
  const profile = useQuery(profileQueryFactory.profileOptions());

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

      {articles.isLoading && (
        <p className="text-sm text-muted-foreground">Загрузка статей...</p>
      )}

      {articles.error && (
        <p className="text-sm text-destructive">
          Не удалось загрузить статьи: {articles.error.message}
        </p>
      )}

      {!articles.isLoading && articles.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Статей пока нет. Создайте первую!
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {articles.data?.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            canDelete={!!profile.data && article.author?.id === profile.data.id}
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
