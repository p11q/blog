import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers';

export const Main = () => {
  const { onLogout } = useAuth();

  return <Button onClick={onLogout}>LOG OUT</Button>;
};
