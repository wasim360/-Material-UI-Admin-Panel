import router from './routes/router';

import Layout from './layout';
import { ErrorBoundary } from './components';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeSettings } from './theme';

/**
 * Root Application Component
 */
const App = () => {
  const mode = useSelector((state: any) => state?.auth?.mode);
  const theme = useMemo(() => createTheme(ThemeSettings(mode)), [mode]);

  const content = useRoutes(router);
  return (
    <ErrorBoundary name="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {content}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
