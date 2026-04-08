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
    <div className="flex gap-2 items-center">
      <Button size="lg" variant="destructive">
        BUTTON LG
      </Button>
    </div>
  );
};
