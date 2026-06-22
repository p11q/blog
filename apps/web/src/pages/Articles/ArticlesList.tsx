import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { articlesQueryFactory } from './api/queryFactory';
import { ArticleCard } from './components/ArticleCard';

export const ArticlesList = () => {
  const { data: articles, isLoading, error } = useQuery(
    articlesQueryFactory.listOptions(),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Статьи</h1>
        <Link to="/articles/create">
          <Button>Создать статью</Button>
        </Link>
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
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
