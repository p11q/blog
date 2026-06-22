import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { queryFactory } from './api';

const FIELD_LABELS: Record<string, string> = {
  id: 'ID',
  name: 'Имя',
  email: 'Email',
  role: 'Роль',
};

export const Profile = () => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery(queryFactory.profileOptions());

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Профиль</CardTitle>
        <CardDescription>Информация о вашем аккаунте</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-3">
          {Object.entries(FIELD_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="text-sm font-medium text-foreground">
                {String(profile[key as keyof typeof profile])}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};
