import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';

import { Flex } from 'components/Flex';
import { NavBar } from 'components/NavBar';
import { PageContentWrapper } from 'components/PageContentWrapper';
import { OpportunityListView } from 'views/OpportunityListView';
import { CoverListView } from 'views/CoverListView';

import { theme } from 'theme';
import { env } from 'config/env';
import { Contexts } from 'contexts';
import '../index.css';
import { Web3Modal } from 'components/Web3Modal';
import { useEagerConnect } from 'hooks/web3';
import { useWeb3React } from '@web3-react/core';

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

export const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  // useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <ThemeProvider theme={theme}>
      <Contexts>
        <Router>
          {isModalOpen && <Web3Modal setOpen={setModalOpen} />}
          <NavBar setModalOpen={setModalOpen} />
          <AppContainer id="page-content">
            <PageContentWrapper>
              <Switch>
                <Route path="/" exact component={OpportunityListView} />
                <Route path="/cover" exact component={CoverListView} />
              </Switch>
            </PageContentWrapper>
          </AppContainer>
        </Router>
      </Contexts>
    </ThemeProvider>
  );
};
