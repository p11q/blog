import { queryFactory } from '@/pages/Profile/api';
import { useQuery } from '@tanstack/react-query';

export const Main = () => {
  const { data: profile } = useQuery(queryFactory.profileOptions());

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-foreground">
        Добро пожаловать{profile ? `, ${profile.name}` : ''}
      </h1>
      <p className="text-sm text-muted-foreground">
        Это главная страница блога.
      </p>
    </div>
  );
};
