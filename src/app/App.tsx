import React, { useEffect } from 'react';
import { ThemeProvider } from 'theme-ui';
import { Flex } from 'components/Flex';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { theme } from 'theme';
import { useAsyncRates } from 'state/hooks';

export const App: React.FC = () => {
  const [rates, fetchRates] = useAsyncRates();

  useEffect(() => {
    fetchRates();
  }, []);
  console.log({ rates });

  return (
    <ThemeProvider theme={theme}>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        bg="background"
      >
        <Card width="100%" maxWidth="20em">
          <Text variant="h4">Hello, welcome to Nexus Mutual</Text>
          <Text as="p" mt="2em">
            I think i'm just text. That's pretty cool, right?
          </Text>
          <Text as="div" mt="1em" mb="2em">
            Test my buttons!
          </Text>
          <Button width="100%" my="0.5em">
            Primary Button
          </Button>
          <Button variant="outline" width="100%">
            Outline Button
          </Button>
        </Card>
      </Flex>
    </ThemeProvider>
  );
};
