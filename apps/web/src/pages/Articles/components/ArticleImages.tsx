import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { apiUploadImage } from '../api/apiImages';
import { articlesQueryFactory } from '../api/queryFactory';

interface Props {
  articleId: number;
  canUpload: boolean;
}

export const ArticleImages = ({ articleId, canUpload }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: images } = useQuery(
    articlesQueryFactory.imagesOptions(articleId),
  );

  const uploadMutation = useMutation({
    mutationFn: (file: File) => apiUploadImage(articleId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles', articleId, 'images'],
      });
    },
  });

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      uploadMutation.mutate(file);
    }

    event.target.value = '';
  };

  const hasImages = !!images && images.length > 0;

  if (!canUpload && !hasImages) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Изображения</h2>
        {canUpload && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSelectFile}
            />
            <Button
              variant="outline"
              size="sm"
              disabled={uploadMutation.isPending}
              onClick={() => inputRef.current?.click()}
            >
              {uploadMutation.isPending ? 'Загрузка...' : 'Добавить изображение'}
            </Button>
          </>
        )}
      </div>

      {uploadMutation.error && (
        <p className="text-sm text-destructive">
          Не удалось загрузить файл: {uploadMutation.error.message}
        </p>
      )}

      {hasImages && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt="Изображение статьи"
              className="h-40 w-full rounded-lg object-cover ring-1 ring-foreground/10"
              loading="lazy"
            />
          ))}
        </div>
      )}
    </section>
  );
};
