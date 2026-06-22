import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const Layout = (): React.JSX.Element => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="mx-auto w-full max-w-5xl px-4 py-6">
      <Outlet />
    </main>
  </div>
);
