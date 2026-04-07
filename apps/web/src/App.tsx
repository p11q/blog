import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Test } from './test';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
}

export default App;
