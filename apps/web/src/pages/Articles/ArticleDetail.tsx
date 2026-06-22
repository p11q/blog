import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import { queryFactory as profileQueryFactory } from '@/pages/Profile/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiDeleteArticle } from './api/apiDeleteArticle';
import { articlesQueryFactory } from './api/queryFactory';
import { ArticleImages } from './components/ArticleImages';
import { Comments } from './components/Comments';
import { Reactions } from './components/Reactions';

export const ArticleDetail = (): React.JSX.Element => {
  const { id } = useParams();
  const articleId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: article,
    error,
    isLoading,
  } = useQuery(articlesQueryFactory.detailOptions(articleId));
  const { data: profile } = useQuery(profileQueryFactory.profileOptions());

  const deleteMutation = useMutation({
    mutationFn: () => apiDeleteArticle(articleId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['articles'] });
      void navigate('/articles');
    },
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Загрузка статьи...</p>;
  }

  if (error || !article) {
    return (
      <p className="text-sm text-destructive">
        Не удалось загрузить статью{error ? `: ${error.message}` : ''}
      </p>
    );
  }

  const authorName = article.author?.name ?? null;

  const isAuthor = !!profile && article.author?.id === profile.id;

  return (
    <article className="flex flex-col gap-6">
      <Link className="text-sm text-muted-foreground" to="/articles">
        ← Ко всем статьям
      </Link>

      <header className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold">{article.title}</h1>
          {isAuthor && (
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/articles/${article.id}/edit`}>Редактировать</Link>
              </Button>
              <Button
                disabled={deleteMutation.isPending}
                size="sm"
                variant="destructive"
                onClick={() => {
                  deleteMutation.mutate();
                }}
              >
                Удалить
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {authorName && <span>Автор: {authorName}</span>}
          <span>{formatDate(article.createAt)}</span>
          {article.tags && <Badge variant="secondary">{article.tags}</Badge>}
        </div>
      </header>

      <p className="text-base whitespace-pre-line text-foreground">
        {article.text}
      </p>

      <ArticleImages articleId={articleId} canUpload={isAuthor} />

      <Reactions articleId={articleId} />

      <Separator />

      <Comments articleId={articleId} />
    </article>
  );
};
