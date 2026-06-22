import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import type { Article } from '../api/article.schema';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <Link to={`/articles/${article.id}`} className="block">
      <Card className="h-full transition-shadow hover:ring-foreground/20">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          {article.description && (
            <CardDescription className="line-clamp-2">
              {article.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2">
          {article.tags && <Badge variant="secondary">{article.tags}</Badge>}
          <span className="text-xs text-muted-foreground">
            {formatDate(article.createAt)}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};
