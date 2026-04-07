import { Button } from '@/components/ui/button';
import { fetchWithZod } from '@/lib/fetchWithZod';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

export const Test = () => {
  const query = useQuery({
    queryKey: ['articles'],
    queryFn: () =>
      fetchWithZod(z.any(), {
        method: 'GET',
        url: 'articles',
      }),
  });

  console.log(query.data);

  return (
    <Button size="lg" variant="destructive">
      BUTTON
    </Button>
  );
};
