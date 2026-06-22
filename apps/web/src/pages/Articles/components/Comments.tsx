import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatRelativeTime, getInitials } from '@/lib/utils';
import { queryFactory as profileQueryFactory } from '@/pages/Profile/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiCreateComment } from '../api/apiCreateComment';
import { apiUpdateComment } from '../api/apiUpdateComment';
import { articlesQueryFactory } from '../api/queryFactory';

interface Props {
  articleId: number;
}

const Avatar = ({ name }: { name: string }) => (
  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
    {getInitials(name)}
  </div>
);

export const Comments = ({ articleId }: Props) => {
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery(
    articlesQueryFactory.commentsOptions(articleId),
  );
  const { data: profile } = useQuery(profileQueryFactory.profileOptions());

  const invalidateComments = () =>
    queryClient.invalidateQueries({
      queryKey: ['articles', articleId, 'comments'],
    });

  const createMutation = useMutation({
    mutationFn: () => apiCreateComment(articleId, text.trim()),
    onSuccess: () => {
      setText('');
      invalidateComments();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (commentId: number) =>
      apiUpdateComment(articleId, commentId, editingText.trim()),
    onSuccess: () => {
      setEditingId(null);
      setEditingText('');
      invalidateComments();
    },
  });

  const startEdit = (commentId: number, currentText: string) => {
    setEditingId(commentId);
    setEditingText(currentText);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Комментарии</h2>

      <div className="flex gap-3">
        <Avatar name={profile?.name ?? '?'} />
        <div className="flex flex-1 flex-col gap-2">
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Напишите комментарий..."
            className="rounded-2xl"
          />
          <Button
            className="self-end"
            size="sm"
            disabled={!text.trim() || createMutation.isPending}
            onClick={() => createMutation.mutate()}
          >
            Отправить
          </Button>
        </div>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Загрузка комментариев...</p>
      )}

      {!isLoading && comments?.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Пока нет комментариев. Будьте первым!
        </p>
      )}

      <ul className="flex flex-col gap-4">
        {comments?.map((comment) => {
          const authorName = comment.author?.name ?? 'Аноним';
          const isOwn = !!profile && comment.author?.id === profile.id;
          const isEdited = comment.updateAt !== comment.createAt;
          const isEditing = editingId === comment.id;

          return (
            <li key={comment.id} className="flex gap-3">
              <Avatar name={authorName} />

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {isEditing ? (
                  <div className="flex flex-col gap-2">
                    <Textarea
                      value={editingText}
                      onChange={(event) => setEditingText(event.target.value)}
                      className="rounded-2xl"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        disabled={
                          !editingText.trim() || updateMutation.isPending
                        }
                        onClick={() => updateMutation.mutate(comment.id)}
                      >
                        Сохранить
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-fit max-w-full rounded-2xl bg-muted px-3 py-2">
                      <p className="text-sm font-semibold text-foreground">
                        {authorName}
                      </p>
                      <p className="text-sm whitespace-pre-line break-words text-foreground">
                        {comment.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-3 text-xs text-muted-foreground">
                      <span>{formatRelativeTime(comment.createAt)}</span>
                      {isEdited && <span>изменено</span>}
                      {isOwn && (
                        <button
                          type="button"
                          className="font-medium transition-colors hover:text-foreground"
                          onClick={() => startEdit(comment.id, comment.text)}
                        >
                          Редактировать
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
