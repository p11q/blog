import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiUpdateProfile, queryFactory } from './api';
import { AvatarUpload } from './components/AvatarUpload';
import { ProfileForm, type ProfileFormValues } from './components/ProfileForm';

export const Profile = (): React.JSX.Element => {
  const queryClient = useQueryClient();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery(queryFactory.profileOptions());

  const updateMutation = useMutation({
    mutationFn: (values: ProfileFormValues) => apiUpdateProfile(values),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryFactory.profileOptions().queryKey,
      }),
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Загрузка профиля...</p>;
  }

  if (error || !profile) {
    return (
      <p className="text-sm text-destructive">
        Не удалось загрузить профиль{error ? `: ${error.message}` : ''}
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Аватар</CardTitle>
          <CardDescription>Фотография вашего профиля</CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarUpload icon={profile.icon} name={profile.name} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>Информация о вашем аккаунте</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            defaultValues={{ email: profile.email, name: profile.name }}
            error={updateMutation.error}
            isPending={updateMutation.isPending}
            submitLabel="Сохранить"
            onSubmit={updateMutation.mutate}
          />
        </CardContent>
      </Card>
    </div>
  );
};
