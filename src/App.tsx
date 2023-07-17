import React from 'react';
import { useRoutes } from 'react-router-dom';

import { StyledEngineProvider } from '@mui/material';

import { Theme } from 'components';
import routes from './routes';
import { SettingsContextProvider } from 'core/contexts/theme-context';
import PagesProvider from './pages/PageProvider';

function App(): React.ReactElement {
  const content = useRoutes(routes);

  return (
    <StyledEngineProvider>
      <SettingsContextProvider>
        <Theme>
          <PagesProvider>{content}</PagesProvider>
        </Theme>
      </SettingsContextProvider>
    </StyledEngineProvider>
  );
}

export default App;
