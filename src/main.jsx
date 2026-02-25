import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>
);
