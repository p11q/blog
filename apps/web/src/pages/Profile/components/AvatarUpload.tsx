import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { apiUploadIcon } from '../api/apiUploadIcon';
import { queryFactory } from '../api/queryFactory';

interface Props {
  icon: null | string;
  name: string;
}

const getInitials = (name: string): string =>
  name.trim().slice(0, 1).toUpperCase() || '?';

export const AvatarUpload = ({ icon, name }: Props): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (file: File) => apiUploadIcon(file),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryFactory.profileOptions().queryKey,
      }),
  });

  const handleSelectFile = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];

    if (file) {
      uploadMutation.mutate(file);
    }

    event.target.value = '';
  };

  return (
    <div className="flex items-center gap-4">
      {icon ? (
        <img
          className="h-20 w-20 rounded-full object-cover ring-1 ring-foreground/10"
          alt="Аватар пользователя"
          src={icon}
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-2xl font-medium text-secondary-foreground ring-1 ring-foreground/10">
          {getInitials(name)}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <input
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          ref={inputRef}
          type="file"
          onChange={handleSelectFile}
        />
        <Button
          disabled={uploadMutation.isPending}
          size="sm"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          {uploadMutation.isPending ? 'Загрузка...' : 'Изменить аватар'}
        </Button>
        {uploadMutation.error && (
          <p className="text-sm text-destructive">
            Не удалось загрузить: {uploadMutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
};
