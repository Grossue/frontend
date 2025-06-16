import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    {/*<React.StrictMode>*/}
    <GlobalStyle />
    <App />
    {/*</React.StrictMode>*/}
  </ThemeProvider>
);

reportWebVitals();
