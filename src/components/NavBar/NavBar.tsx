import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { Button } from 'rebass';
import { Flex, FlexProps } from 'components/Flex/Flex';
import { PageContentWrapper } from 'components/PageContentWrapper';
import NexusLogo from 'assets/images/nexus-mutual-logo.svg';
import { useWeb3React } from '@web3-react/core';

export interface NavBarProps extends FlexProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const TestLink = styled(NavLink)`
  &&& {
    color: white;
    padding: 0 1em;
    text-decoration: none;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;

    &:hover {
      color: #dfdfdf;
    }
  }
`;

export const NavBar: React.FC<NavBarProps> = ({ setModalOpen, ...props }) => {
  const [y, setY] = React.useState<number>(0);
  const [lastScrollTop, setlastScrollTop] = React.useState<number>(
    document.documentElement.scrollTop
  );
  const { active, account } = useWeb3React();

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
      <PageContentWrapper sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={NexusLogo} alt="Nexus Mutual" />
        <TestLink to="/">
          {/* <Text variant="caption" sx={{ color: 'white' }}> */}
          Protected Yields
          {/* </Text> */}
        </TestLink>
        <TestLink to="/cover">
          {/* <Text variant="caption" sx={{ color: 'white' }}> */}
          All Protocols
          {/* </Text> */}
        </TestLink>
      </PageContentWrapper>
      <Button onClick={() => setModalOpen(true)}>
        {active && account ? 'Connected' : 'Connect'}
      </Button>
    </StyledNavBar>
  );
};
