import type { DehydratedState } from '@tanstack/react-query';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';
import './styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не найден корневой элемент #root');
}

// Получаем состояние TanStack Query из HTML.
const stateElement = document.getElementById('__REACT_QUERY_STATE__');

const dehydratedState: DehydratedState | undefined = stateElement?.textContent
  ? (JSON.parse(stateElement.textContent) as DehydratedState)
  : undefined;

const app = (
  <BrowserRouter>
    <App dehydratedState={dehydratedState} />
  </BrowserRouter>
);

hydrateRoot(rootElement, app);
