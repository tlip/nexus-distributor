import React from 'react';
import styled from '@emotion/styled/macro';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';

import { Flex } from 'components/Flex';
import { NavBar } from 'components/NavBar';
import { PageContentWrapper } from 'components/PageContentWrapper';
import { OpportunityListView } from 'views/OpportunityListView';

import { theme } from 'theme';
import { env } from 'config/env';

const AppContainer = styled(Flex)((props: any) => ({
  justifyContent: 'center',
  width: 'clamp(100vw, 100%, 100vw)',
  minHeight: 'calc(100vh - 2.75em)',
  background: props.theme.colors.background,
  transform: 'translateY(2.75em)',
  padding: '2.75em 0',
}));

const Router = env.GITHUB_PAGES
  ? (props: any) => <HashRouter {...props} />
  : (props: any) => <BrowserRouter {...props} />;

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <NavBar />
      <AppContainer>
        <PageContentWrapper>
          <Switch>
            <Route path="/" component={OpportunityListView} />
          </Switch>
        </PageContentWrapper>
      </AppContainer>
    </Router>
  </ThemeProvider>
);
