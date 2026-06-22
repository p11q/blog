import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleString('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function formatRelativeTime(value: string): string {
  const diffSeconds = Math.round(
    (Date.now() - new Date(value).getTime()) / 1000,
  );

  if (diffSeconds < 60) {
    return 'только что';
  }

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} мин назад`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} ч назад`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} дн назад`;
  }

  return formatDate(value);
}

export function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return initials || '?';
}
