import React from 'react';
import styled from '@emotion/styled/macro';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import { store } from '../state/store';
import { Provider } from 'react-redux';

import { Flex } from 'components/Flex';
import { NavBar } from 'components/NavBar';
import { PageContentWrapper } from 'components/PageContentWrapper';
import { OpportunityListView } from 'views/OpportunityListView';

import { theme } from 'theme';
import { env } from 'config/env';
import { Contexts } from 'contexts';

// React Router only works with a HashRouter on GitHub Pages...
const Router = env.GITHUB_PAGES
  ? (props: any) => <HashRouter {...props} />
  : (props: any) => <BrowserRouter {...props} />;

const AppContainer = styled(Flex)((props: any) => ({
  justifyContent: 'center',
  width: 'clamp(100vw, 100%, 100vw)',
  minHeight: 'calc(100vh - 2.75em)',
  background: props.theme.colors.background,
  transform: 'translateY(2.75em)',
  padding: '2.75em 0',
}));

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Contexts>
        <Router>
          <NavBar />
          <AppContainer id="page-content">
            <PageContentWrapper>
              <Switch>
                <Route path="/" component={OpportunityListView} />
              </Switch>
            </PageContentWrapper>
          </AppContainer>
        </Router>
      </Contexts>
    </Provider>
  </ThemeProvider>
);
