import { Counter, Header } from '@repo/ui';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import typescriptLogo from '/typescript.svg';

const App = () => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3000'}/articles`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }, []);

  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img
          src={typescriptLogo}
          className="logo vanilla"
          alt="TypeScript logo"
        />
      </a>
      <Header title="Web" />
      <div className="card">
        <Counter />
      </div>
    </div>
  );
};

createRoot(document.getElementById('app')!).render(<App />);
