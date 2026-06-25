import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiUpdateProfile, queryFactory, type UpdateProfileDTO } from './api';
import { AvatarUpload } from './components/AvatarUpload';
import { ProfileForm } from './components/ProfileForm';

export const Profile = (): React.JSX.Element => {
  const queryClient = useQueryClient();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery(queryFactory.profileOptions());

  const updateMutation = useMutation({
    mutationFn: (values: UpdateProfileDTO) => apiUpdateProfile(values),
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
    <div className="flex w-full gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Аватар</CardTitle>
          <CardDescription>Фотография вашего профиля</CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarUpload icon={profile.icon} name={profile.name} />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>Информация о вашем аккаунте</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            defaultValues={{ email: profile.email, name: profile.name }}
            error={updateMutation.error}
            isPending={updateMutation.isPending}
            onSubmit={updateMutation.mutate}
          />
        </CardContent>
      </Card>
    </div>
  );
};
