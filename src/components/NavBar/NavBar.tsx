import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { Button } from 'rebass';
import { Flex, FlexProps } from 'components/Flex/Flex';
import { PageContentWrapper } from 'components/PageContentWrapper';
import NexusLogo from 'assets/images/nexus-mutual-logo.svg';
import { injected } from '../../connectors';
import { useWeb3React } from '@web3-react/core';

export interface NavBarProps extends FlexProps {}

const StyledNavBar = styled(Flex)((props: any) => ({
  position: 'fixed',
  top: 0,
  justifyContent: 'center',
  alignItems: 'center',
  height: '2.75em',
  width: 'clamp(100vw, 100vw, 100vw)',
  background: props.theme.colors.black,
  transform: props.sx.transform,
  transition: 'transform 200ms ease-in-out',
  zIndex: 1000,
}));

export const NavBar: React.FC<NavBarProps> = (props) => {
  const [y, setY] = React.useState<number>(0);
  const [lastScrollTop, setlastScrollTop] = React.useState<number>(
    document.documentElement.scrollTop
  );
  const { activate, active, account } = useWeb3React();

  const hideNavBar = () => {
    const documentScrolled = document.documentElement.scrollTop;
    if (documentScrolled - lastScrollTop < 0) setY(0);
    else if (documentScrolled > 150) setY(-100);
    setlastScrollTop(documentScrolled);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', hideNavBar);
    return () => window.removeEventListener('scroll', hideNavBar);
  }, [hideNavBar]);

  return (
    <StyledNavBar as="nav" sx={{ transform: `translateY(${y}%)` }} {...props}>
      <PageContentWrapper>
        <img src={NexusLogo} alt="Nexus Mutual" />
        <Link to="/">Protected Yields</Link>
        <Link to="/cover">All Protocols</Link>
      </PageContentWrapper>
      <Button onClick={() => activate(injected)}>
        {active && account ? 'Connected' : 'Connect'}
      </Button>
    </StyledNavBar>
  );
};
