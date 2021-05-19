import styled from '@emotion/styled/macro';
import { Box } from 'components/Box';

export const PageContentWrapper = styled(Box)(({ theme: { space } }: any) => ({
  width: `clamp(0em, ${space.contentWidth}, ${space.contentMaxWidth})`,
}));
