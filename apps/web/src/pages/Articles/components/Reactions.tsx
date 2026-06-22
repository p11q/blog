import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiToggleDislike, apiToggleLike } from '../api/apiReactions';
import { articlesQueryFactory } from '../api/queryFactory';

interface Props {
  articleId: number;
}

export const Reactions = ({ articleId }: Props): React.JSX.Element => {
  const queryClient = useQueryClient();
  const { data: likes } = useQuery(
    articlesQueryFactory.likesOptions(articleId),
  );
  const { data: dislikes } = useQuery(
    articlesQueryFactory.dislikesOptions(articleId),
  );

  const refreshReactions = (): void => {
    void queryClient.invalidateQueries({
      queryKey: ['articles', articleId, 'likes'],
    });
    void queryClient.invalidateQueries({
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
        disabled={likeMutation.isPending}
        size="sm"
        variant="outline"
        onClick={() => {
          likeMutation.mutate();
        }}
      >
        Нравится · {likes ?? 0}
      </Button>
      <Button
        disabled={dislikeMutation.isPending}
        size="sm"
        variant="outline"
        onClick={() => {
          dislikeMutation.mutate();
        }}
      >
        Не нравится · {dislikes ?? 0}
      </Button>
    </div>
  );
};
