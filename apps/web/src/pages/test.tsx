import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

export const Test = () => {
  const query = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await fetch('http://127.0.0.1:3000/articles');
      return await response.json();
    },
  });

  console.log(query.data);

  return (
    <Button size="lg" variant="destructive">
      BUTTON
    </Button>
  );
};
