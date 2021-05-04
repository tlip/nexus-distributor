import React from 'react';
import styled from '@emotion/styled/macro';

import { Card, CardProps } from 'components/Card/Card';
import { Box } from 'components/Box';
import { Flex } from 'components/Flex';
import { Text } from 'components/Text';

// Type definitions

export interface AccordionCardProps extends CardProps {
  isExpanded?: boolean;
}

// Styled components

const AccordionSection = styled(Box)((props: any) => ({
  background: props.theme.colors.secondary,
  width: '100%',
  padding: `${+!!props.expanded * 1.5}em 2.625em`,
  margin: '1.25em 0 0',
  overflow: 'hidden',
  maxHeight: props.expanded ? '1000px' : '0px',
  borderTop: `${+!!props.expanded}px solid`,
  borderColor: props.theme.colors.border,
  transition: '200ms linear',
}));

// Main component

export const AccordionCard: React.FC<AccordionCardProps> = ({
  isExpanded,
  children,
  ...props
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(!!isExpanded);
  return (
    <Card px="0px" pb="0px" width="100%" {...props}>
      <Box mx="1.25em">Sup</Box>
      <AccordionSection {...{ expanded }}>{children}</AccordionSection>
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="center"
        height="1.625em"
        sx={{ borderTop: '1px solid', borderColor: 'border' }}
        style={{ userSelect: 'none', cursor: 'pointer' }}
      >
        <Text
          variant="caption1"
          color="primary"
          fontWeight="bold"
          style={{ textDecoration: 'underline' }}
          onClick={() => setExpanded((prev: boolean) => !prev)}
        >
          {expanded ? 'HIDE' : 'DETAILS'}
        </Text>
      </Flex>
    </Card>
  );
};
