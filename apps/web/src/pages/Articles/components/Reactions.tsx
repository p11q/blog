import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiToggleDislike, apiToggleLike } from '../api/apiReactions';
import { articlesQueryFactory } from '../api/queryFactory';

interface Props {
  articleId: number;
}

export const Reactions = ({ articleId }: Props) => {
  const queryClient = useQueryClient();
  const { data: likes } = useQuery(articlesQueryFactory.likesOptions(articleId));
  const { data: dislikes } = useQuery(
    articlesQueryFactory.dislikesOptions(articleId),
  );

  const refreshReactions = () => {
    queryClient.invalidateQueries({
      queryKey: ['articles', articleId, 'likes'],
    });
    queryClient.invalidateQueries({
      queryKey: ['articles', articleId, 'dislikes'],
    });
  };

  const likeMutation = useMutation({
    mutationFn: () => apiToggleLike(articleId),
    onSuccess: refreshReactions,
  });
  const dislikeMutation = useMutation({
    mutationFn: () => apiToggleDislike(articleId),
    onSuccess: refreshReactions,
  });

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => likeMutation.mutate()}
        disabled={likeMutation.isPending}
      >
        Нравится · {likes ?? 0}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => dislikeMutation.mutate()}
        disabled={dislikeMutation.isPending}
      >
        Не нравится · {dislikes ?? 0}
      </Button>
    </div>
  );
};
