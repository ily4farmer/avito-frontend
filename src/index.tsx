import { createRoot } from 'react-dom/client';
import { App } from './app/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не найден элемент #root');
}

createRoot(rootElement).render(<App />);
