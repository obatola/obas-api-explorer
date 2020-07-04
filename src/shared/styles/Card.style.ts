import styled from 'styled-components';
import { colorConstant } from '../colorConstants';
import { timesBasePx } from '../mixins';
import { styleConstants } from '../styleConstants';

export const Card = styled.div`
  background-color: ${colorConstant.card.background};
  padding: ${timesBasePx(2)};
  border-radius: ${styleConstants.borderRadius};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;
