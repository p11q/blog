import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiToggleDislike, apiToggleLike } from '../api/apiReactions';
import { articlesQueryFactory } from '../api/queryFactory';

interface Props {
  articleId: number;
}

export const Reactions = ({ articleId }: Props): React.JSX.Element => {
  const queryClient = useQueryClient();
  const likes = useQuery(articlesQueryFactory.likesOptions(articleId));
  const dislikes = useQuery(articlesQueryFactory.dislikesOptions(articleId));

  const likeMutation = useMutation({
    mutationFn: () => apiToggleLike(articleId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: articlesQueryFactory.detailOptions(articleId).queryKey,
      }),
  });
  const dislikeMutation = useMutation({
    mutationFn: () => apiToggleDislike(articleId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: articlesQueryFactory.detailOptions(articleId).queryKey,
      }),
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
        Нравится · {likes.data ?? 0}
      </Button>
      <Button
        disabled={dislikeMutation.isPending}
        size="sm"
        variant="outline"
        onClick={() => {
          dislikeMutation.mutate();
        }}
      >
        Не нравится · {dislikes.data ?? 0}
      </Button>
    </div>
  );
};
