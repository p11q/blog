import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  canDelete?: boolean;
  isDeleting?: boolean;
  onDelete?: () => void;
}

export const ArticleCard = ({
  article,
  canDelete = false,
  isDeleting = false,
  onDelete,
}: Props): React.JSX.Element => (
  <div className="relative">
    <Link className="block" to={`/articles/${article.id}`}>
      <Card className="h-full transition-shadow hover:ring-foreground/20">
        <CardHeader>
          <CardTitle className="pr-20">{article.title}</CardTitle>
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
    {canDelete && (
      <Button
        className="absolute top-3 right-3"
        disabled={isDeleting}
        size="sm"
        variant="destructive"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDelete?.();
        }}
      >
        Удалить
      </Button>
    )}
  </div>
);
