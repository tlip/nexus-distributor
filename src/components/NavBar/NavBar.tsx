import React from 'react';
import styled from '@emotion/styled/macro';
import { Flex, FlexProps } from 'components/Flex/Flex';
import { PageContentWrapper } from 'components/PageContentWrapper';
import NexusLogo from 'assets/logos/nexus-mutual-logo.svg';

export interface NavBarProps extends FlexProps {}

const StyledNavBar = styled(Flex)((props: any) => ({
  justifyContent: 'center',
  alignItems: 'center',
  height: '2.75em',
  width: 'clamp(100vw, 100vw, 100vw)',
  background: props.theme.colors.black,
}));

export const NavBar: React.FC<NavBarProps> = (props) => (
  <StyledNavBar as="nav" {...props}>
    <PageContentWrapper>
      <img src={NexusLogo} alt="Nexus Mutual" />
    </PageContentWrapper>
  </StyledNavBar>
);
