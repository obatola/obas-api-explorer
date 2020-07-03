import styled from 'styled-components';
import { timesBasePx } from '../mixins';
import { colorConstant } from '../colorConstants';
import { defaultFontSize } from './constants';

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: ${defaultFontSize};
  height: ${timesBasePx(3)};
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
`;

export const Button = styled.button`
  font-weight: 400;
  border: transparent;
  cursor: pointer;
  border-radius: ${timesBasePx(1 / 3)};
  background-color: ${colorConstant.button.primary};
  color: ${colorConstant.button.text};
  height: ${timesBasePx(3)};
  line-height: 1;
  padding: ${timesBasePx(1 / 2)};
`;
