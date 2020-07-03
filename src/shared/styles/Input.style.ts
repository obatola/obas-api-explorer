import styled from 'styled-components';
import { timesBasePx } from '../mixins';
import { colorConstant } from '../colorConstants';
import {
  isErrorInput,
  IsErrorProp,
} from '../../components/explorerComponent/ExplorerComponent.style';

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: ${timesBasePx(1)};
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

export const TextArea = styled.textarea<IsErrorProp>`
  ${isErrorInput}
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: ${timesBasePx(1)};
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
  background-color: ${colorConstant.colors.white};
`;
