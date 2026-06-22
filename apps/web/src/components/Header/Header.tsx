import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { queryFactory } from '@/pages/Profile/api';
import { useAuth } from '@/providers';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Главная', end: true },
  { to: '/articles', label: 'Статьи', end: false },
  { to: '/profile', label: 'Профиль', end: false },
];

export const Header = () => {
  const { onLogout } = useAuth();
  const { data: profile } = useQuery(queryFactory.profileOptions());

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {({ isActive }) => (
                <Button variant={isActive ? 'secondary' : 'ghost'} size="sm">
                  {link.label}
                </Button>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              'max-w-48 truncate text-sm font-medium text-foreground',
              !profile && 'text-muted-foreground',
            )}
          >
            {profile?.name ?? '...'}
          </span>
          <Button variant="outline" size="sm" onClick={onLogout}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};
