import styled from 'styled-components';
import { FormTitle } from '@app/components/layouts/AuthLayout/AuthLayout.styles';

import { DropdownMenu } from '@app/components/header/Header.styles';
import { media } from '@app/styles/themes/constants';
export const Title = styled(FormTitle)`
  margin-bottom: 1.875rem;
`;

export const DatePicker = styled(FormTitle)`
 width : 100%;
`;



export const Menu = styled(DropdownMenu)`
  padding: 1rem;
  max-height: 50vh;
  overflow-y: auto;

  @media only screen and ${media.md} {
    padding: 1rem 2rem;
  }
`;
